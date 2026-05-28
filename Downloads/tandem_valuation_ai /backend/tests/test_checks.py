from backend.app.services.checks_service import evaluate_checks


def test_checks_flags_terminal_growth():
    payload = {
        'assumptions': [{'name': 'terminal_growth', 'value': 0.06}, {'name': 'wacc', 'value': 0.09}, {'name': 'ebitda_margin', 'value': 0.2}],
        'valuation': {'implied_multiple': 10, 'enterprise_value': 100}
    }
    checks = evaluate_checks(payload)
    assert any(check.check_id == 'terminal_growth_high' for check in checks)


def test_checks_detects_negative_wacc_and_invalid_ev():
    payload = {
        'assumptions': [{'name': 'terminal_growth', 'value': 0.02}, {'name': 'wacc', 'value': 0.0}, {'name': 'ebitda_margin', 'value': 0.3}],
        'valuation': {'implied_multiple': 8, 'enterprise_value': 0}
    }
    checks = evaluate_checks(payload)
    assert any(check.check_id == 'negative_wacc' for check in checks)
    assert any(check.check_id == 'invalid_ev' for check in checks)
