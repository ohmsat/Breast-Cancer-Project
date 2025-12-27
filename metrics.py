"""Derived metrics for breast cancer risk assessments."""

from dataclasses import dataclass
from breast_cancer_model import BreastCancerParams, RiskAssessmentResult


@dataclass
class RiskMetrics:
    """Container for breast cancer risk metrics.
    
    Provides a standardized way to report risk assessment results
    with additional calculated metrics.
    """
    risk_score: float
    risk_category: str
    percentile_rank: float  # Where patient falls in risk distribution
    screening_frequency_months: int  # Recommended screening interval
    urgency_score: float  # 0-1 score indicating urgency


def compute_metrics(
    result: RiskAssessmentResult,
    params: BreastCancerParams,
) -> RiskMetrics:
    """Compute additional metrics from a risk assessment.
    
    Parameters
    ----------
    result : RiskAssessmentResult
        The risk assessment result.
    params : BreastCancerParams
        Original patient parameters.
    
    Returns
    -------
    RiskMetrics
        Enhanced metrics including percentile rank and screening recommendations.
    """
    
    # Estimate percentile rank based on risk score
    # Using a simplified distribution model
    if result.risk_score < 10:
        percentile_rank = 20.0
    elif result.risk_score < 15:
        percentile_rank = 50.0
    elif result.risk_score < 25:
        percentile_rank = 75.0
    elif result.risk_score < 40:
        percentile_rank = 90.0
    else:
        percentile_rank = 98.0
    
    # Determine screening frequency
    if result.risk_category == "very_high":
        screening_frequency_months = 6
    elif result.risk_category == "high":
        screening_frequency_months = 12
    elif result.risk_category == "moderate":
        screening_frequency_months = 12
    else:
        # Low risk: standard screening based on age
        if params.age < 40:
            screening_frequency_months = 24  # Less frequent for younger women
        elif params.age < 50:
            screening_frequency_months = 18
        else:
            screening_frequency_months = 12
    
    # Calculate urgency score (0-1)
    urgency_score = min(1.0, result.risk_score / 50.0)
    
    return RiskMetrics(
        risk_score=result.risk_score,
        risk_category=result.risk_category,
        percentile_rank=percentile_rank,
        screening_frequency_months=screening_frequency_months,
        urgency_score=urgency_score,
    )
