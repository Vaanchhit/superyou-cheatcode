from typing import Dict, Any, List
from backend.app.schemas import HygieneCheck


def evaluate_checks(payload: Dict[str, Any]) -> List[HygieneCheck]:
    checks: List[HygieneCheck] = []
    assumptions = {item['name']: item for item in payload.get('assumptions', [])}
    valuation = payload.get('valuation', {})

    terminal_growth = assumptions.get('terminal_growth', {}).get('value', 0.0)
    wacc = assumptions.get('wacc', {}).get('value', 0.0)
    ebitda_margin = assumptions.get('ebitda_margin', {}).get('value', 0.0)

    if terminal_growth > 0.04:
        checks.append(HygieneCheck(
            check_id='terminal_growth_high',
            severity='warn',
            status='warn',
            message='Terminal growth is above a long-term GDP-like threshold.',
            suggested_fix='Reduce terminal growth to a range under 4%.',
            affected_path='assumptions.terminal_growth'
        ))
    if wacc <= 0:
        checks.append(HygieneCheck(
            check_id='negative_wacc',
            severity='fail',
            status='fail',
            message='WACC is negative or zero and cannot be used for discounting.',
            suggested_fix='Set a positive weighted average cost of capital.',
            affected_path='assumptions.wacc'
        ))
    if ebitda_margin > 0.45:
        checks.append(HygieneCheck(
            check_id='margin_outlier',
            severity='warn',
            status='warn',
            message='EBITDA margin appears unusually high for typical private equity targets.',
            suggested_fix='Review historic margins and adjust to a realistic operating range.',
            affected_path='assumptions.ebitda_margin'
        ))
    if valuation.get('implied_multiple', 0) > 25:
        checks.append(HygieneCheck(
            check_id='multiple_high',
            severity='warn',
            status='warn',
            message='Implied EV / EBITDA multiple is outside normal peer ranges.',
            suggested_fix='Revisit valuation assumptions or comps selection.',
            affected_path='valuation.implied_multiple'
        ))
    if valuation.get('enterprise_value', 0) <= 0:
        checks.append(HygieneCheck(
            check_id='invalid_ev',
            severity='fail',
            status='fail',
            message='Enterprise value is invalid or non-positive.',
            suggested_fix='Verify free cash flow and terminal value inputs.',
            affected_path='valuation.enterprise_value'
        ))
    if not payload.get('financials'):
        checks.append(HygieneCheck(
            check_id='missing_financials',
            severity='fail',
            status='fail',
            message='Extracted financial data is missing or incomplete.',
            suggested_fix='Parse the uploaded document or enter data manually.',
            affected_path='financials'
        ))
    return checks
