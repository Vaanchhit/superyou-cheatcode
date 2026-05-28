import re
from typing import Dict, Any
import fitz

VALUE_PATTERNS = [r'\$?([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]+)?)', r'([0-9]+\.[0-9]+)%']


def _normalize_number(token: str) -> float:
    text = token.replace(',', '').replace('$', '')
    try:
        return float(text)
    except ValueError:
        return 0.0


def _confidence_for(field: str, text: str) -> float:
    if field.lower() in text.lower():
        return 0.9
    return 0.45


def extract_financials(filepath: str) -> Dict[str, Any]:
    doc = fitz.open(filepath)
    raw_text = ' '.join(page.get_text('text') for page in doc)
    doc.close()

    def find_value(label_options):
        pattern = r'(' + '|'.join(re.escape(label) for label in label_options) + r')[^\d\n\r]{0,40}([\$\d,\.]+)'
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            return _normalize_number(match.group(2)), _confidence_for(label_options[0], match.group(0))
        return 0.0, 0.25

    data = {
        'revenue': find_value(['Revenue', 'Net revenue', 'Sales']),
        'ebitda': find_value(['EBITDA']),
        'ebit': find_value(['EBIT']),
        'net_income': find_value(['Net income', 'PAT', 'Profit after tax']),
        'depreciation_amortization': find_value(['Depreciation and amortization', 'D&A']),
        'capex': find_value(['CAPEX', 'Capital expenditure']),
        'working_capital': find_value(['Working capital', 'Net working capital']),
        'debt': find_value(['Debt', 'Total debt', 'Net debt']),
        'cash': find_value(['Cash', 'Cash and cash equivalents']),
        'share_count': find_value(['Shares outstanding', 'Share count', 'Basic shares'])
    }

    extracted = {}
    for key, (value, confidence) in data.items():
        extracted[key] = {
            'field': key,
            'value': value,
            'unit': 'USD' if key != 'share_count' else 'shares',
            'confidence': min(max(confidence, 0.25), 0.95),
            'source': 'document parsing'
        }
    extracted['segment_kpis'] = []
    return extracted
