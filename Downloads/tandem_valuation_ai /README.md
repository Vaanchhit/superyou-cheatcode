# Valuation AI for Private Equity

A production-quality private equity valuation workspace built for IB/PE analysts. Upload financial documents, extract data, build deterministic valuations (DCF, trading comps, precedent transactions), run hygiene checks, and export to editable Excel workbooks with full formula preservation.

## Design Principles

1. **Deterministic calculations**: All financial logic lives in code, not LLMs.
2. **Explainability**: Every number is traceable to a formula, input, or assumption.
3. **Enterprise UI**: Clean, minimal, professional design for serious financial work.
4. **Audit trail**: All overrides, changes, and judgments are logged.
5. **No black boxes**: AI is used for qualitative reasoning and context, not core calculations.

## Architecture

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui-inspired components
- **State**: Zustand for company/valuation state
- **Data**: React Query for server sync
- **Spreadsheet**: Custom editable workbook UI with formula support

### Backend
- **Framework**: Python FastAPI
- **Database**: SQLAlchemy + SQLite (local dev) / PostgreSQL (production)
- **PDF parsing**: PyMuPDF with fallback manual entry
- **Excel export**: OpenPyXL with preserved formulas
- **Qualitative**: Gemini API integration with fallback mock
- **Services**: Modular layer for parsing, valuation, checks, export

### Database Schema
- **Companies**: metadata, industry, ticker
- **Documents**: uploaded PDFs with parsing status
- **Valuations**: JSON payload storing full model state

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── db.py                    # Database config
│   │   ├── models.py                # SQLAlchemy models
│   │   ├── schemas.py               # Pydantic schemas
│   │   └── services/
│   │       ├── storage_service.py   # File upload
│   │       ├── parse_service.py     # PDF extraction
│   │       ├── valuation_service.py # DCF, comps, precedents
│   │       ├── checks_service.py    # Hygiene checks
│   │       ├── export_service.py    # Excel generation
│   │       └── qualitative_service.py # AI reasoning
│   ├── main.py                      # FastAPI app + routes
│   ├── requirements.txt             # Python deps
│   ├── seed.py                      # Sample data
│   └── tests/                       # Unit tests
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Main workspace
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Tailwind CSS
│   ├── components/
│   │   ├── UploadPanel.tsx
│   │   ├── DataReviewPanel.tsx
│   │   ├── WorkbookPanel.tsx
│   │   ├── AssumptionsPanel.tsx
│   │   ├── AuditPanel.tsx
│   │   ├── QualitativeReasoningPanel.tsx
│   │   ├── StatusBadge.tsx
│   │   └── Sidebar.tsx
│   ├── store/
│   │   └── useAppStore.ts           # Zustand state
│   ├── lib/
│   │   └── api.ts                   # API helpers
│   └── styles/
│       └── globals.css
├── Dockerfile
├── Dockerfile.backend
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── .env.example
└── README.md
```

## Installation

### Local Development

**Frontend + Backend (separate terminals)**

```bash
# Terminal 1: Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

```bash
# Terminal 2: Frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

### Using Docker

```bash
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

### Seeding Sample Data

```bash
cd backend
source .venv/bin/activate
python seed.py
```

This creates a sample company "Sample Corp Inc" with pre-populated valuation.

## Configuration

Copy `.env.example` to `.env` and set:

```
DATABASE_URL=sqlite:///./backend/dev.db
UPLOAD_DIR=./backend/uploads
GEMINI_API_KEY=your_gemini_key_here
GEMINI_API_URL=https://api.gemini.example.com/v1/reasoning
NEWS_API_KEY=optional_news_api_key
```

For production, use a PostgreSQL URL in `DATABASE_URL` and real Gemini credentials.

## API Endpoints

### Upload & Parse
- `POST /upload` – upload PDF, create company
- `POST /parse/{document_id}` – extract financials from PDF

### Company & Valuation
- `GET /company/{id}` – fetch company profile + valuation
- `GET /valuation/{id}` – fetch full valuation payload
- `POST /valuation/{id}/recalculate` – regenerate outputs

### Assumptions & Overrides
- `POST /assumptions/{id}/override` – override single assumption
- `PUT /workbook/{id}/cell` – update workbook cell

### Checks & Audit
- `GET /checks/{id}` – fetch hygiene checks
- `GET /audit/{id}` – fetch audit log

### Export & Qualitative
- `GET /export/{id}/xlsx` – download Excel workbook
- `POST /qualitative/analyze` – AI reasoning on assumption
- `GET /workbook/{id}` – fetch workbook structure

## Valuation Engine

### DCF
- 5-year forecast with revenue CAGR, margin assumptions, capex, working capital
- Terminal value by perpetuity growth (default) or exit multiple
- WACC discounting with risk-adjusted cost of capital
- Equity value bridge: EV + cash – debt

### Trading Comparables
- 3 peer companies with EV/EBITDA multiples
- Average multiple applied to target EBITDA
- Sensitivity to multiple selection

### Precedent Transactions
- Historical M&A deals with EV/EBITDA paid
- Average precedent multiple as valuation floor

### Scenario Analysis
- Bear / Base / Bull cases with assumption ranges
- Sensitivity tables on key drivers

## Hygiene Checks

Automatic validation against:
- Terminal growth > 4% (flag warn)
- WACC ≤ 0 (fail)
- EBITDA margin > 45% (warn for most industries)
- Implied EV/EBITDA > 25x (warn)
- Enterprise value ≤ 0 (fail)
- Missing financials (fail)

All checks are configurable in [backend/app/services/checks_service.py](backend/app/services/checks_service.py).

## Workbook UI

Inside the web app, users interact with a spreadsheet-like interface supporting:
- Multiple sheets (Inputs, Assumptions, DCF, Comps, Precedents, Audit, etc.)
- Editable input cells (highlighted in light yellow)
- Formula cells (light blue, read-only from UI but exported with formulas)
- Frozen headers
- Cell copying and editing

All changes propagate downstream immediately; recalculation is deterministic.

## Excel Export

Generates a `.xlsx` file with:
- All workbook sheets mapped 1:1
- Input cells styled in yellow
- Formula cells styled in blue
- Warning cells highlighted
- Preserved Excel formulas so file remains editable
- Downloadable in-browser

## Testing

### Backend Unit Tests

```bash
cd backend
pytest tests/
```

Includes:
- `test_valuation.py` – DCF, comps, precedent logic
- `test_checks.py` – hygiene rule validation
- `test_export.py` – Excel generation

Add more tests in `backend/tests/` following the same pattern.

## Development Notes

### Adding a New Assumption
1. Add to [backend/app/services/valuation_service.py](backend/app/services/valuation_service.py) in `build_assumptions()`
2. Update workbook schema in `build_workbook()`
3. Wire slider in frontend `AssumptionsPanel.tsx`

### Adding a New Hygiene Check
1. Add check logic to [backend/app/services/checks_service.py](backend/app/services/checks_service.py) in `evaluate_checks()`
2. Return `HygieneCheck` with severity, message, suggested fix
3. Display in frontend `AuditPanel.tsx`

### Integrating External Data
1. Add a new service file under `backend/app/services/` (e.g., `market_data_service.py`)
2. Expose via new API endpoint
3. Call from qualitative reasoning or workbook refresh

## Deployment

### Docker
```bash
docker-compose -f docker-compose.yml up -d
```

### Manual (Linux/Mac)
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn backend.main:app --host 0.0.0.0 --port 8000 &

# Frontend (requires built Next.js)
npm run build
npm run start
```

### Environment Variables (Production)
```
DATABASE_URL=postgresql://user:pass@host/dbname
UPLOAD_DIR=/var/data/uploads
GEMINI_API_KEY=sk-...
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
```

## Troubleshooting

**PDFs not parsing:**
- Check `backend/uploads/` for saved files
- Verify PyMuPDF is installed: `pip install PyMuPDF`
- Falls back to manual entry if parsing fails

**Excel export fails:**
- Ensure OpenPyXL is installed: `pip install openpyxl`
- Check `backend/exports/` directory permissions

**Qualitative analysis returns null:**
- If Gemini API key is missing, uses mock data (functional but not real)
- Check `GEMINI_API_KEY` in `.env`

## License

MIT

## Support

For questions or issues, refer to the inline documentation in service modules and API docstrings.
