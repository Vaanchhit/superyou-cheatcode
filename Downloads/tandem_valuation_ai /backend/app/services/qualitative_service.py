import os
import requests
from typing import Dict, Any

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_API_URL = os.getenv('GEMINI_API_URL', 'https://api.gemini.example.com/v1/reasoning')


def qualitative_analysis(company_id: int, assumption_key: str, current_value: float, context: str = '') -> Dict[str, Any]:
    if GEMINI_API_KEY:
        payload = {
            'company_id': company_id,
            'assumption_key': assumption_key,
            'current_value': current_value,
            'context': context
        }
        headers = {'Authorization': f'Bearer {GEMINI_API_KEY}', 'Content-Type': 'application/json'}
        try:
            response = requests.post(GEMINI_API_URL, json=payload, headers=headers, timeout=8)
            response.raise_for_status()
            return response.json()
        except Exception:
            pass

    # Fallback mock qualitative recommendation
    low = round(max(0.01, current_value - 0.02), 3)
    high = round(current_value + 0.03, 3)
    return {
        'assumption_key': assumption_key,
        'recommended_range': {'low': low, 'high': high},
        'current_value': current_value,
        'confidence': 0.72,
        'rationale': f'Mock qualitative range based on sector momentum, comparable valuations, and published guidance.',
        'evidence': [
            {'source': 'Market note', 'snippet': 'Sector growth is stable, supporting the midpoint assumption.'}
        ]
    }
