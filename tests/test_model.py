from breast_cancer_model import BreastCancerParams, assess_breast_cancer_risk, validate_params


def default_params() -> BreastCancerParams:
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


def test_low_risk_assessment():
    """Test that low risk profile returns appropriate results."""
    params = default_params()
    result = assess_breast_cancer_risk(params)
    assert 0 <= result.risk_score <= 100
    assert result.risk_category in ["low", "moderate", "high", "very_high"]
    assert len(result.recommendations) > 0


def test_high_risk_with_family_history():
    """Test that family history increases risk score."""
    params_low = default_params()
    params_high = BreastCancerParams(
        age=params_low.age,
        bmi=params_low.bmi,
        family_history=True,  # Added family history
        breast_density=params_low.breast_density,
        menopausal_status=params_low.menopausal_status,
        hormone_use=params_low.hormone_use,
        previous_biopsies=params_low.previous_biopsies,
        first_menstruation_age=params_low.first_menstruation_age,
        first_pregnancy_age=params_low.first_pregnancy_age,
    )

    result_low = assess_breast_cancer_risk(params_low)
    result_high = assess_breast_cancer_risk(params_high)
    
    assert result_high.risk_score > result_low.risk_score


def test_validation_rejects_invalid_params():
    """Test that invalid parameters are rejected."""
    params = default_params()
    
    # Test invalid age
    params_invalid = BreastCancerParams(
        age=-5.0,  # Invalid
        bmi=params.bmi,
        family_history=params.family_history,
        breast_density=params.breast_density,
        menopausal_status=params.menopausal_status,
        hormone_use=params.hormone_use,
        previous_biopsies=params.previous_biopsies,
        first_menstruation_age=params.first_menstruation_age,
        first_pregnancy_age=params.first_pregnancy_age,
    )
    
    try:
        validate_params(params_invalid)
        assert False, "Should have raised ValueError"
    except ValueError:
        pass  # Expected


def test_risk_score_is_bounded():
    """Test that risk score is always between 0 and 100."""
    params = default_params()
    result = assess_breast_cancer_risk(params)
    assert 0 <= result.risk_score <= 100
