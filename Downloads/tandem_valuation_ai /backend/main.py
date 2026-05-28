import os
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from sqlalchemy.orm import Session
from datetime import datetime
import json

from backend.app.db import SessionLocal, init_db
from backend.app.models import Company, Document, Valuation
from backend.app.schemas import OverrideRequest, WorkbookCellUpdate, QualitativeInput
from backend.app.services import storage_service, parse_service, valuation_service, checks_service, export_service, qualitative_service

init_db()

app = FastAPI(title='Valuation AI for Private Equity', version='1.0')

cors_origins = [
    origin.strip()
    for origin in os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins or ['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/upload')
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail='Invalid file type. Only PDF accepted.')
    path = storage_service.save_upload(file)
    company_name = os.path.splitext(os.path.basename(file.filename))[0]
    company = Company(company_name=company_name)
    db.add(company)
    db.commit()
    db.refresh(company)

    document = Document(filename=file.filename, filepath=path, company_id=company.id)
    db.add(document)
    db.commit()
    db.refresh(document)

    valuation = Valuation(company_id=company.id, payload={
        'version': '1.0',
        'company': {'id': company.id, 'company_name': company.company_name},
        'documents': [{'id': document.id, 'filename': document.filename, 'filepath': document.filepath}],
        'financials': {},
        'assumptions': [],
        'valuation': {},
        'comps': [],
        'precedents': [],
        'scenarios': {},
        'checks': [],
        'workbook': [],
        'audit_log': []
    })
    db.add(valuation)
    db.commit()
    db.refresh(valuation)
    return {'company_id': company.id, 'document_id': document.id}


@app.post('/parse/{document_id}')
def parse_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail='Document not found')
    extracted = parse_service.extract_financials(document.filepath)
    company = document.company
    valuation = db.query(Valuation).filter(Valuation.company_id == company.id).first()
    payload = valuation.payload if valuation.payload else {}
    new_payload = valuation_service.create_valuation_payload(
        {'id': company.id, 'company_name': company.company_name},
        [{'id': document.id, 'filename': document.filename, 'filepath': document.filepath}],
        extracted
    )
    checks = checks_service.evaluate_checks(new_payload)
    new_payload['checks'] = [check.model_dump() for check in checks]
    new_payload['audit_log'].append({
        'timestamp': datetime.utcnow().isoformat(),
        'action': 'parsed_document',
        'user': 'system',
        'detail': f'Parsed {document.filename} and built initial valuation payload.'
    })
    valuation.payload = new_payload
    db.add(valuation)
    db.commit()
    return JSONResponse(new_payload)


@app.get('/company/{company_id}')
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail='Company not found')
    valuation = db.query(Valuation).filter(Valuation.company_id == company.id).first()
    return {'company': {'id': company.id, 'company_name': company.company_name, 'industry': company.industry}, 'valuation': valuation.payload if valuation else {}}


@app.get('/valuation/{company_id}')
def get_valuation(company_id: int, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    return valuation.payload


@app.post('/valuation/{company_id}/recalculate')
def recalculate_valuation(company_id: int, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    payload = valuation.payload
    if not payload.get('financials'):
        raise HTTPException(status_code=400, detail='No extracted financials to recalculate')
    extracted = payload['financials']
    assumptions = payload['assumptions']
    valuation_output = valuation_service.generate_valuation(extracted, [type('A', (), item)() for item in assumptions])
    payload['valuation'] = valuation_output.model_dump()
    payload['checks'] = [check.model_dump() for check in checks_service.evaluate_checks(payload)]
    payload['audit_log'].append({
        'timestamp': datetime.utcnow().isoformat(),
        'action': 'recalculated',
        'user': 'system',
        'detail': 'Recalculated valuation using current assumptions and extracted financials.'
    })
    valuation.payload = payload
    db.add(valuation)
    db.commit()
    return payload


@app.post('/assumptions/{company_id}/override')
def override_assumption(company_id: int, override: OverrideRequest, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    payload = valuation.payload
    found = False
    for item in payload.get('assumptions', []):
        if item['name'] == override.assumption_key:
            item['value'] = override.value
            item['locked'] = True
            found = True
    if not found:
        payload.setdefault('assumptions', []).append({
            'name': override.assumption_key,
            'value': override.value,
            'low': override.value,
            'high': override.value,
            'rationale': 'Overridden by user',
            'locked': True
        })
    payload['valuation'] = valuation_service.generate_valuation(payload['financials'], [type('A', (), item)() for item in payload['assumptions']]).model_dump()
    payload['checks'] = [check.model_dump() for check in checks_service.evaluate_checks(payload)]
    payload['audit_log'].append({
        'timestamp': datetime.utcnow().isoformat(),
        'action': 'override',
        'user': override.user or 'analyst',
        'detail': f'{override.assumption_key} overridden to {override.value} ({override.reason})'
    })
    valuation.payload = payload
    db.add(valuation)
    db.commit()
    return payload


@app.get('/checks/{company_id}')
def get_checks(company_id: int, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    return valuation.payload.get('checks', [])


@app.get('/export/{company_id}/xlsx')
def export_xlsx(company_id: int, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    filename = f'valuation_{company_id}.xlsx'
    binary_path = export_service.save_excel(valuation.payload, filename)
    handle = open(binary_path, 'rb')
    return StreamingResponse(handle, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', headers={'Content-Disposition': f'attachment; filename="{filename}"'})


@app.get('/workbook/{company_id}')
def get_workbook(company_id: int, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    return {'workbook': valuation.payload.get('workbook', [])}


@app.put('/workbook/{company_id}/cell')
def update_workbook_cell(company_id: int, update: WorkbookCellUpdate, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    payload = valuation.payload
    for sheet in payload.get('workbook', []):
        if sheet['name'] == update.sheet:
            for cell in sheet.get('cells', []):
                if cell['row'] == update.row and cell['col'] == update.col:
                    if update.value is not None:
                        cell['value'] = update.value
                    if update.formula is not None:
                        cell['formula'] = update.formula
    valuation.payload = payload
    db.add(valuation)
    db.commit()
    return payload


@app.post('/qualitative/analyze')
def qualitative_analyze(payload: QualitativeInput):
    result = qualitative_service.qualitative_analysis(payload.company_id, payload.assumption_key, payload.current_value, payload.context or '')
    return result


@app.get('/audit/{company_id}')
def get_audit(company_id: int, db: Session = Depends(get_db)):
    valuation = db.query(Valuation).filter(Valuation.company_id == company_id).first()
    if not valuation:
        raise HTTPException(status_code=404, detail='Valuation not found')
    return valuation.payload.get('audit_log', [])
