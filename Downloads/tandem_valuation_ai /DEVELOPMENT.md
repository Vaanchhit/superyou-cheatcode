# Development Guide

## Architecture Decisions

### 1. FastAPI + SQLAlchemy (Backend)
- **Why**: FastAPI is modern, fast, and has excellent async support. SQLAlchemy provides ORM flexibility for migration to PostgreSQL.
- **Trade-off**: Could use Pydantic for validation only, but full ORM is more maintainable for a financial system.

### 2. Zustand for State (Frontend)
- **Why**: Lightweight, minimal boilerplate, perfect for shared company/valuation state.
- **Alternative**: Redux would add unnecessary complexity for this scale.

### 3. React Query for Server Sync
- **Why**: Handles caching, polling, and invalidation out of the box. Essential for real-time valuation updates.

### 4. PyMuPDF + Regex-Based Parsing
- **Why**: Fast, no server dependencies, works offline. Handles scanned PDFs with simple text extraction.
- **Fallback**: Manual entry UI if parsing confidence < 0.5.
- **Future**: Can add Camelot for table extraction or OCR via Tesseract if needed.

### 5. Deterministic Valuation Engine
- **Why**: Financial models must be reproducible and auditable. LLMs add uncertainty.
- **Approach**: All DCF, comps, precedent logic in pure Python functions. Output is JSON schema.
- **AI role**: Qualitative reasoning only (rationale, evidence linking, scenario commentary).

### 6. Excel Export with Formulas
- **Why**: PE analysts live in Excel. Export must preserve formulas so downstream teams can adjust.
- **Implementation**: OpenPyXL writes native `.xlsx` with `=SUM()` and `=Lookup()` formulas intact.

### 7. Modular Service Architecture
- **Why**: Easy to test, swap, and extend (e.g., add Camelot, swap Gemini for Claude).
- **Services**:
  - `storage_service.py` – upload handling
  - `parse_service.py` – PDF extraction
  - `valuation_service.py` – DCF, comps, precedents
  - `checks_service.py` – hygiene validation
  - `export_service.py` – Excel generation
  - `qualitative_service.py` – AI reasoning

## Adding Features

### New Valuation Method (e.g., Sum-of-the-Parts)
1. Add method function to `valuation_service.py`
2. Update JSON schema to include new output
3. Add workbook sheet in `build_workbook()`
4. Wire UI tab in `WorkbookPanel.tsx`

### New Data Source (e.g., Bloomberg API)
1. Create `backend/app/services/market_data_service.py`
2. Add endpoint to `backend/main.py`
3. Call from `qualitative_service.py` or workbook refresh
4. Update schema

### New Hygiene Check (e.g., Leverage Covenant Test)
1. Add check function to `checks_service.py` in `evaluate_checks()`
2. Return `HygieneCheck` with rule logic
3. Display in `AuditPanel.tsx` with severity color coding

## Testing Strategy

### Backend
- **Unit tests**: Valuation logic, check rules, export format
- **Integration tests**: API routes, database persistence
- **Fixtures**: Sample extracted data, payload templates

### Frontend
- **Component tests**: Upload panel, workbook grid, sliders (future: add Vitest)
- **E2E**: Upload → parse → model → export workflow

### Run Tests
```bash
cd backend
pytest tests/
pytest tests/test_valuation.py::test_generate_valuation_calculates_basic_values -v
```

## Performance

### Parsing
- PyMuPDF ~100ms for typical annual report (20 pages)
- Regex extraction ~50ms
- Falls back to manual if timeout > 2s

### Valuation
- DCF with 5-year forecast + terminal value ~5ms
- Sensitivity analysis 1000 scenarios ~100ms
- All calculations in-memory, no DB writes during compute

### Export
- Build workbook object ~50ms
- Write to Excel bytes ~200ms
- Total export < 300ms for typical model

## Database Schema Evolution

### Current (SQLite for local dev)
```sql
CREATE TABLE companies (
  id INTEGER PRIMARY KEY,
  company_name TEXT,
  industry TEXT,
  ticker TEXT
);

CREATE TABLE documents (
  id INTEGER PRIMARY KEY,
  filename TEXT,
  filepath TEXT,
  company_id INTEGER REFERENCES companies(id)
);

CREATE TABLE valuations (
  id INTEGER PRIMARY KEY,
  company_id INTEGER UNIQUE REFERENCES companies(id),
  payload JSON
);
```

### Migration Path (PostgreSQL for production)
1. Switch connection string to PostgreSQL
2. Add migration: `CREATE TABLE companies (...)`
3. Data persists in JSON payload, no schema changes needed for valuations
4. Can backfill from SQLite → PostgreSQL via export/import

## Debugging

### Backend Logs
```bash
# See request/response logs
uvicorn backend.main:app --reload --log-level debug

# Database logs (SQLAlchemy)
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
```

### Frontend Logs
```bash
# React Query cache inspect
import { useQueryClient } from '@tanstack/react-query'
const queryClient = useQueryClient()
console.log(queryClient.getQueryData(['company', id]))

# Zustand state
import { useAppStore } from '../store/useAppStore'
// In console: useAppStore.getState()
```

### PDF Parsing Issues
- Check `backend/uploads/` for saved file
- Run manual extraction: `python backend/app/services/parse_service.py path/to/file.pdf`
- Verify confidence scores in response

## Code Style

### Backend
- Type hints required for all functions
- Docstrings for public methods
- Unit test every service function
- No hardcoded values; use config/env vars

### Frontend
- TypeScript strict mode
- Functional components + hooks
- Prop drilling OK for <5 levels; use context/store beyond
- Component file = single component (no barrels)

## Deployment Checklist

- [ ] Set `GEMINI_API_KEY` for production Gemini access
- [ ] Configure `DATABASE_URL` for PostgreSQL
- [ ] Set `NEXT_PUBLIC_BACKEND_URL` for frontend API calls
- [ ] Enable HTTPS, CORS headers
- [ ] Configure upload directory with sufficient disk space
- [ ] Set up log aggregation (e.g., Datadog, Sentry)
- [ ] Test PDF upload with large files (>50 MB)
- [ ] Monitor `/health` endpoint (add if needed)
- [ ] Backup database daily

## Future Enhancements

- [ ] Multi-user authentication & RBAC
- [ ] Scenario comparison (side-by-side valuations)
- [ ] Historical valuation tracking (time-series)
- [ ] Deal pipeline integration
- [ ] Email export & sharing
- [ ] Mobile app (React Native)
- [ ] Advanced charting (Plotly, Recharts)
- [ ] Custom model templates (user-defined formulas)
