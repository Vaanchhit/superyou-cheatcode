import json
import os
from backend.app.db import SessionLocal, init_db
from backend.app.models import Company, Document, Valuation
from backend.app.services.valuation_service import create_valuation_payload

init_db()
db = SessionLocal()

sample_extracted = {
    'revenue': {'value': 150.0, 'unit': 'USD', 'confidence': 0.92, 'source': 'document parsing'},
    'ebitda': {'value': 33.0, 'unit': 'USD', 'confidence': 0.88, 'source': 'document parsing'},
    'ebit': {'value': 25.0, 'unit': 'USD', 'confidence': 0.85, 'source': 'document parsing'},
    'net_income': {'value': 18.0, 'unit': 'USD', 'confidence': 0.82, 'source': 'document parsing'},
    'depreciation_amortization': {'value': 4.5, 'unit': 'USD', 'confidence': 0.90, 'source': 'document parsing'},
    'capex': {'value': 10.0, 'unit': 'USD', 'confidence': 0.80, 'source': 'document parsing'},
    'working_capital': {'value': 8.0, 'unit': 'USD', 'confidence': 0.75, 'source': 'document parsing'},
    'debt': {'value': 45.0, 'unit': 'USD', 'confidence': 0.95, 'source': 'document parsing'},
    'cash': {'value': 20.0, 'unit': 'USD', 'confidence': 0.95, 'source': 'document parsing'},
    'share_count': {'value': 100.0, 'unit': 'shares', 'confidence': 0.98, 'source': 'document parsing'},
    'segment_kpis': []
}

company = Company(company_name='Sample Corp Inc', industry='Technology', ticker='SMPL')
db.add(company)
db.commit()
db.refresh(company)

document = Document(
    filename='sample_annual_report.pdf',
    filepath='./backend/uploads/sample_annual_report.pdf',
    source_type='Annual Report',
    company_id=company.id
)
db.add(document)
db.commit()
db.refresh(document)

payload = create_valuation_payload(
    {'id': company.id, 'company_name': company.company_name},
    [{'id': document.id, 'filename': document.filename, 'filepath': document.filepath}],
    sample_extracted
)

valuation = Valuation(company_id=company.id, payload=payload)
db.add(valuation)
db.commit()

print(f"Seeded: Company ID {company.id} with sample valuation")
print(f"Enterprise value: ${payload['valuation']['enterprise_value']:.2f}M")
print(f"Per-share value: ${payload['valuation']['per_share_value']:.2f}")

db.close()
