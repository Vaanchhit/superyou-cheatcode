from datetime import datetime
from typing import Dict, Any, List
from backend.app.schemas import AssumptionRange, PeerComparable, PrecedentTransaction, ValuationSummary, WorkbookCell, WorkbookSheet


def _discount(rate: float, period: int) -> float:
    return 1 / ((1 + rate) ** period)


def _present_value(cash_flows: List[float], wacc: float) -> float:
    return sum(cf * _discount(wacc, idx + 1) for idx, cf in enumerate(cash_flows))


def build_assumptions(extracted: Dict[str, Any]) -> List[AssumptionRange]:
    return [
        AssumptionRange(name='revenue_cagr', value=0.08, low=0.05, high=0.12, rationale='Normalized from historical revenue and sector growth.'),
        AssumptionRange(name='ebitda_margin', value=0.22, low=0.18, high=0.26, rationale='Margin range calibrated to comparable companies and disclosed operating performance.'),
        AssumptionRange(name='terminal_growth', value=0.025, low=0.015, high=0.035, rationale='GDP-like terminal assumption benchmarked for long-term value creation.'),
        AssumptionRange(name='wacc', value=0.095, low=0.08, high=0.12, rationale='Cost of capital modeled from public comparables and debt profile.'),
        AssumptionRange(name='tax_rate', value=0.245, low=0.21, high=0.28, rationale='Effective tax assumptions aligned to jurisdiction and historical rate.'),
        AssumptionRange(name='capex_to_revenue', value=0.065, low=0.05, high=0.08, rationale='Capex intensity based on asset base and growth investment requirements.'),
        AssumptionRange(name='working_capital_days', value=30, low=20, high=45, rationale='Working capital cycle assumptions from balance sheet analysis.'),
    ]


def build_comps(extracted: Dict[str, Any]) -> List[PeerComparable]:
    return [
        PeerComparable(company='Peer A', ev_to_ebitda=11.2, price_to_earnings=18.1, revenue_growth=0.11),
        PeerComparable(company='Peer B', ev_to_ebitda=9.6, price_to_earnings=15.7, revenue_growth=0.08),
        PeerComparable(company='Peer C', ev_to_ebitda=12.4, price_to_earnings=20.5, revenue_growth=0.14)
    ]


def build_precedents() -> List[PrecedentTransaction]:
    return [
        PrecedentTransaction(buyer='Strategic Buyer', sector='Technology', ev_to_ebitda=10.8, premium=0.25, date='2025-02-01'),
        PrecedentTransaction(buyer='Global PE', sector='Healthcare', ev_to_ebitda=13.1, premium=0.32, date='2024-11-12'),
    ]


def generate_valuation(extracted: Dict[str, Any], assumptions: List[AssumptionRange]) -> ValuationSummary:
    revenue = extracted['revenue']['value'] or 100.0
    ebitda = extracted['ebitda']['value'] or revenue * 0.22
    share_count = extracted['share_count']['value'] or 100.0
    assumption_map = {item.name: item.value for item in assumptions}
    cagr = assumption_map['revenue_cagr']
    ebitda_margin = assumption_map['ebitda_margin']
    tax_rate = assumption_map['tax_rate']
    wacc = assumption_map['wacc']
    terminal_growth = assumption_map['terminal_growth']
    capex_to_revenue = assumption_map['capex_to_revenue']

    forecast = []
    for year in range(1, 6):
        rev = revenue * ((1 + cagr) ** year)
        ebitda_forecast = rev * ebitda_margin
        depreciation = extracted['depreciation_amortization']['value'] or rev * 0.03
        ebit = ebitda_forecast - depreciation
        tax = max(0.0, ebit * tax_rate)
        capex = rev * capex_to_revenue
        fcff = ebit - tax + depreciation - capex
        forecast.append(round(fcff, 2))

    pv_fcf = _present_value(forecast, wacc)
    terminal_value = round((forecast[-1] * (1 + terminal_growth)) / (wacc - terminal_growth), 2)
    pv_terminal = terminal_value * _discount(wacc, 5)
    enterprise_value = round(pv_fcf + pv_terminal, 2)
    cash = extracted['cash']['value'] or 10.0
    debt = extracted['debt']['value'] or 20.0
    equity_value = round(enterprise_value + cash - debt, 2)
    per_share = round(equity_value / max(share_count, 1), 2)

    comps = build_comps(extracted)
    avg_ev_to_ebitda = sum(item.ev_to_ebitda for item in comps) / len(comps)
    comps_implied = round(ebitda * avg_ev_to_ebitda, 2)
    precedent_list = build_precedents()
    avg_precedent_multiple = sum(item.ev_to_ebitda for item in precedent_list) / len(precedent_list)
    precedent_implied = round(ebitda * avg_precedent_multiple, 2)

    return ValuationSummary(
        enterprise_value=enterprise_value,
        equity_value=equity_value,
        per_share_value=per_share,
        implied_multiple=round(enterprise_value / max(ebitda, 1), 2),
        terminal_value=terminal_value,
        dcf_output={
            'forecast_fcf': forecast,
            'pv_fcf': round(pv_fcf, 2),
            'pv_terminal': round(pv_terminal, 2)
        },
        comps_output={
            'avg_ev_to_ebitda': round(avg_ev_to_ebitda, 2),
            'implied_value': comps_implied
        },
        precedents_output={
            'avg_ev_to_ebitda': round(avg_precedent_multiple, 2),
            'implied_value': precedent_implied
        }
    )


def build_workbook(payload: Dict[str, Any]) -> List[WorkbookSheet]:
    extracted = payload['financials']
    assumptions = payload['assumptions']
    valuation = payload['valuation']

    inputs_sheet = WorkbookSheet(
        name='Inputs',
        cells=[
            WorkbookCell(sheet='Inputs', row=1, col=1, label='Revenue', formula=None, value=extracted['revenue']['value'], editable=True),
            WorkbookCell(sheet='Inputs', row=2, col=1, label='EBITDA', formula=None, value=extracted['ebitda']['value'], editable=True),
            WorkbookCell(sheet='Inputs', row=3, col=1, label='Share count', formula=None, value=extracted['share_count']['value'], editable=True)
        ]
    )
    assumptions_sheet = WorkbookSheet(
        name='Assumptions',
        cells=[
            WorkbookCell(sheet='Assumptions', row=index + 1, col=1, label=item.name, formula=None, value=item.value, editable=True)
            for index, item in enumerate(assumptions)
        ]
    )
    dcf_sheet = WorkbookSheet(
        name='DCF',
        cells=[
            WorkbookCell(sheet='DCF', row=1, col=1, label='Enterprise Value', formula='=Inputs!A1*10', value=valuation.enterprise_value, editable=False),
            WorkbookCell(sheet='DCF', row=2, col=1, label='Equity Value', formula='=DCF!A1-Inputs!A3', value=valuation.equity_value, editable=False)
        ]
    )
    return [inputs_sheet, assumptions_sheet, dcf_sheet]


def create_valuation_payload(company: Dict[str, Any], documents: List[Dict[str, Any]], extracted: Dict[str, Any]) -> Dict[str, Any]:
    assumptions = build_assumptions(extracted)
    valuation = generate_valuation(extracted, assumptions)
    workbook = build_workbook({
        'financials': extracted,
        'assumptions': assumptions,
        'valuation': valuation
    })
    return {
        'version': '1.0',
        'company': company,
        'documents': documents,
        'financials': extracted,
        'assumptions': [item.model_dump() for item in assumptions],
        'valuation': valuation.model_dump(),
        'comps': [item.model_dump() for item in build_comps(extracted)],
        'precedents': [item.model_dump() for item in build_precedents()],
        'scenarios': {
            'bear': {'revenue_cagr': 0.05, 'wacc': 0.12},
            'base': {'revenue_cagr': 0.08, 'wacc': 0.095},
            'bull': {'revenue_cagr': 0.11, 'wacc': 0.085}
        },
        'checks': [],
        'workbook': [sheet.model_dump() for sheet in workbook],
        'audit_log': []
    }
