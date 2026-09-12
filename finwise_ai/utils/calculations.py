from _typeshed import importlib
i

ort math
import numpy as np

def calculate_emi(principal: float, rate_per_annum: float, tenure_months: int) -> dict:
    """
    Calculate monthly EMI using standard formula:
    EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    """
    if principal <= 0 or tenure_months <= 0:
        return {'emi': 0.0, 'total_interest': 0.0, 'total_payment': 0.0}
    
    monthly_rate = (rate_per_annum / 12.0) / 100.0
    if monthly_rate == 0:
        emi = principal / tenure_months
    else:
        compound = math.pow(1.0 + monthly_rate, tenure_months)
        emi = (principal * monthly_rate * compound) / (compound - 1.0)
    
    total_payment = emi * tenure_months
    total_interest = total_payment - principal
    
    return {
        'emi': round(emi, 2),
        'total_interest': round(total_interest, 2),
        'total_payment': round(total_payment, 2),
        'monthly_rate': round(monthly_rate * 100, 3)
    }

def compute_financial_ratios(income: float, spending: float, savings: float, emi: float, previous_spending: float = 0.0) -> dict:
    """
    Compute essential financial ratios for personalization & stress analysis.
    """
    if income <= 0:
        income = 1.0  # Prevent division by zero
    
    savings_ratio = max(0.0, min(1.0, savings / income))
    emi_ratio = max(0.0, min(1.0, emi / income))
    spending_ratio = max(0.0, min(2.0, spending / income))
    
    spending_growth = 0.0
    if previous_spending > 0:
        spending_growth = (spending - previous_spending) / previous_spending
        
    return {
        'savings_ratio': round(savings_ratio, 4),
        'emi_ratio': round(emi_ratio, 4),
        'spending_ratio': round(spending_ratio, 4),
        'spending_growth': round(spending_growth, 4)
    }
