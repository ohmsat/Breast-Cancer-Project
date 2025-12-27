from breast_cancer_model import BreastCancerParams

def low_risk_profile() -> BreastCancerParams:
    """Young, healthy woman with no significant risk factors."""
    return BreastCancerParams(
        age=35.0,
        bmi=22.0,
        family_history=False,
        breast_density="low",
        menopausal_status="premenopausal",
        hormone_use=False,
        previous_biopsies=0,
        first_menstruation_age=13.0,
        first_pregnancy_age=28.0,
    )

def moderate_risk_profile() -> BreastCancerParams:
    """Middle-aged woman with some risk factors."""
    return BreastCancerParams(
        age=52.0,
        bmi=26.0,
        family_history=False,
        breast_density="medium",
        menopausal_status="postmenopausal",
        hormone_use=True,
        previous_biopsies=1,
        first_menstruation_age=12.0,
        first_pregnancy_age=32.0,
    )

def high_risk_profile() -> BreastCancerParams:
    """Woman with family history and high breast density."""
    return BreastCancerParams(
        age=48.0,
        bmi=28.0,
        family_history=True,
        breast_density="high",
        menopausal_status="premenopausal",
        hormone_use=False,
        previous_biopsies=2,
        first_menstruation_age=11.0,
        first_pregnancy_age=None,
    )

def very_high_risk_profile() -> BreastCancerParams:
    """Woman with multiple significant risk factors."""
    return BreastCancerParams(
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
