from backend.app.services.export_service import build_workbook


def test_build_workbook_includes_sheets():
    payload = {
        'workbook': [
            {
                'name': 'Inputs',
                'cells': [
                    {'sheet': 'Inputs', 'row': 1, 'col': 1, 'label': 'Revenue', 'value': 120.0, 'editable': True}
                ]
            }
        ]
    }
    data = build_workbook(payload)
    assert isinstance(data, bytes)
    assert len(data) > 0
