from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class DocumentMeta(BaseModel):
    id: int
    filename: str
    source_type: Optional[str]
    filepath: str

class FinancialField(BaseModel):
    field: str
    value: float
    unit: Optional[str] = 'USD'
    confidence: float
    source: Optional[str] = None

class ExtractedFinancials(BaseModel):
    revenue: FinancialField
    ebitda: FinancialField
    ebit: FinancialField
    net_income: FinancialField
    depreciation_amortization: FinancialField
    capex: FinancialField
    working_capital: FinancialField
    debt: FinancialField
    cash: FinancialField
    share_count: FinancialField
    segment_kpis: Optional[List[FinancialField]] = []

class AssumptionRange(BaseModel):
    name: str
    value: float
    low: float
    high: float
    rationale: str
    source: Optional[str] = None
    locked: bool = False

class SensitivityPoint(BaseModel):
    name: str
    value: float
    outcome: float

class PeerComparable(BaseModel):
    company: str
    ev_to_ebitda: float
    price_to_earnings: float
    revenue_growth: float

class PrecedentTransaction(BaseModel):
    buyer: str
    sector: str
    ev_to_ebitda: float
    premium: float
    date: str

class ValuationSummary(BaseModel):
    enterprise_value: float
    equity_value: float
    per_share_value: float
    implied_multiple: float
    terminal_value: float
    dcf_output: Dict[str, Any]
    comps_output: Dict[str, Any]
    precedents_output: Dict[str, Any]

class HygieneCheck(BaseModel):
    check_id: str
    severity: str
    status: str
    message: str
    suggested_fix: str
    affected_path: Optional[str]

class AuditEntry(BaseModel):
    timestamp: str
    action: str
    user: str
    detail: str

class WorkbookCell(BaseModel):
    sheet: str
    row: int
    col: int
    formula: Optional[str]
    value: Optional[float]
    label: Optional[str]
    editable: bool = True

class WorkbookSheet(BaseModel):
    name: str
    cells: List[WorkbookCell]

class ValuationPayload(BaseModel):
    version: str = Field(default='1.0')
    company: Dict[str, Any]
    documents: List[DocumentMeta] = []
    financials: ExtractedFinancials
    assumptions: List[AssumptionRange]
    valuation: ValuationSummary
    comps: List[PeerComparable]
    precedents: List[PrecedentTransaction]
    scenarios: Dict[str, Any]
    checks: List[HygieneCheck] = []
    workbook: List[WorkbookSheet] = []
    audit_log: List[AuditEntry] = []

class OverrideRequest(BaseModel):
    assumption_key: str
    value: float
    reason: str
    user: Optional[str] = 'analyst'

class WorkbookCellUpdate(BaseModel):
    sheet: str
    row: int
    col: int
    value: float
    formula: Optional[str] = None

class QualitativeInput(BaseModel):
    company_id: int
    assumption_key: str
    current_value: float
    context: Optional[str] = None
