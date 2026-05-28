from backend.app.services.valuation_service import build_assumptions, generate_valuation


def test_build_assumptions_produces_valid_range():
    assumptions = build_assumptions({})
    assert len(assumptions) >= 4
    assert any(item.name == 'wacc' for item in assumptions)
    assert all(0 <= item.value <= 1 or item.name == 'working_capital_days' for item in assumptions)


def test_generate_valuation_calculates_basic_values():
    extracted = {
        'revenue': {'value': 120.0},
        'ebitda': {'value': 26.4},
        'ebit': {'value': 20.0},
        'net_income': {'value': 14.0},
        'depreciation_amortization': {'value': 4.0},
        'capex': {'value': 8.0},
        'working_capital': {'value': 5.0},
        'debt': {'value': 30.0},
        'cash': {'value': 15.0},
        'share_count': {'value': 50.0}
    }
    assumptions = build_assumptions(extracted)
    valuation = generate_valuation(extracted, assumptions)
    assert valuation.enterprise_value > 0
    assert valuation.equity_value == round(valuation.enterprise_value + 15.0 - 30.0, 2)
    assert valuation.per_share_value == round(valuation.equity_value / 50.0, 2)
