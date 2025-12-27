from breast_cancer_model import BreastCancerParams, assess_breast_cancer_risk
from metrics import compute_metrics


def base_params() -> BreastCancerParams:
    return BreastCancerParams(
        age=45.0,
        bmi=24.0,
        family_history=False,
        breast_density="medium",
        menopausal_status="premenopausal",
        hormone_use=False,
        previous_biopsies=0,
        first_menstruation_age=13.0,
        first_pregnancy_age=28.0,
    )


def test_metrics_computation():
    """Test that metrics are computed correctly."""
    params = base_params()
    result = assess_breast_cancer_risk(params)
    metrics = compute_metrics(result, params)
    
    assert 0 <= metrics.risk_score <= 100
    assert metrics.risk_category in ["low", "moderate", "high", "very_high"]
    assert 0 <= metrics.percentile_rank <= 100
    assert metrics.screening_frequency_months > 0
    assert 0 <= metrics.urgency_score <= 1


def test_screening_frequency_by_risk():
    """Test that higher risk results in more frequent screening."""
    params_low = base_params()
    params_high = BreastCancerParams(
        age=55.0,
        bmi=30.0,
        family_history=True,
        breast_density="very_high",
        menopausal_status="postmenopausal",
        hormone_use=True,
        previous_biopsies=3,
        first_menstruation_age=10.0,
        first_pregnancy_age=None,
    )
    
    result_low = assess_breast_cancer_risk(params_low)
    result_high = assess_breast_cancer_risk(params_high)
    
    metrics_low = compute_metrics(result_low, params_low)
    metrics_high = compute_metrics(result_high, params_high)
    
    # Higher risk should have more frequent screening (lower months between)
    if result_high.risk_category == "very_high":
        assert metrics_high.screening_frequency_months <= 12
    
    # Very high risk should have the most frequent screening
    if result_high.risk_category == "very_high":
        assert metrics_high.screening_frequency_months == 6


def test_urgency_score_increases_with_risk():
    """Test that urgency score correlates with risk score."""
    params_low = base_params()
    params_high = BreastCancerParams(
        age=55.0,
        bmi=32.0,
        family_history=True,
        breast_density="very_high",
        menopausal_status="postmenopausal",
        hormone_use=True,
        previous_biopsies=3,
        first_menstruation_age=10.0,
        first_pregnancy_age=None,
    )
    
    result_low = assess_breast_cancer_risk(params_low)
    result_high = assess_breast_cancer_risk(params_high)
    
    metrics_low = compute_metrics(result_low, params_low)
    metrics_high = compute_metrics(result_high, params_high)
    
    assert metrics_high.urgency_score >= metrics_low.urgency_score
