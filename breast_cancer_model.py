"""Core breast cancer risk prediction model implementation.

This module provides a breast cancer risk assessment model based on patient
characteristics and clinical features.
"""

from dataclasses import dataclass
from typing import Optional
import numpy as np


@dataclass
class BreastCancerParams:
    """Container for breast cancer risk assessment parameters.

    Attributes
    ----------
    age : float
        Patient age in years. Must be positive.
    bmi : float
        Body Mass Index (kg/m²). Must be positive.
    family_history : bool
        Whether patient has a family history of breast cancer.
    breast_density : str
        Breast density category: "low", "medium", "high", "very_high"
    menopausal_status : str
        Menopausal status: "premenopausal", "postmenopausal"
    hormone_use : bool
        Whether patient has used hormone replacement therapy.
    previous_biopsies : int
        Number of previous breast biopsies. Must be non-negative.
    first_menstruation_age : float
        Age at first menstruation. Must be positive.
    first_pregnancy_age : Optional[float]
        Age at first pregnancy, or None if no pregnancy.
    """
    
    age: float
    bmi: float
    family_history: bool
    breast_density: str
    menopausal_status: str
    hormone_use: bool
    previous_biopsies: int
    first_menstruation_age: float
    first_pregnancy_age: Optional[float]


@dataclass
class RiskAssessmentResult:
    """Holds outputs of the breast cancer risk assessment."""
    
    risk_score: float  # 0-100 risk percentage
    risk_category: str  # "low", "moderate", "high", "very_high"
    contributing_factors: dict  # Factors contributing to risk
    recommendations: list[str]  # Clinical recommendations


def validate_params(params: BreastCancerParams) -> BreastCancerParams:
    """Validate and clamp parameters to safe ranges.
    
    Returns a new BreastCancerParams with adjusted values.
    """
    
    if params.age <= 0 or params.age > 120:
        raise ValueError("age must be between 0 and 120 years.")
    if params.bmi <= 0 or params.bmi > 60:
        raise ValueError("bmi must be between 0 and 60 kg/m².")
    if params.previous_biopsies < 0:
        raise ValueError("previous_biopsies must be non-negative.")
    if params.first_menstruation_age < 8 or params.first_menstruation_age > 20:
        raise ValueError("first_menstruation_age must be between 8 and 20 years.")
    if params.first_pregnancy_age is not None:
        if params.first_pregnancy_age < params.first_menstruation_age or params.first_pregnancy_age > 60:
            raise ValueError("first_pregnancy_age must be valid and reasonable.")
    
    valid_density = ["low", "medium", "high", "very_high"]
    if params.breast_density not in valid_density:
        raise ValueError(f"breast_density must be one of {valid_density}")
    
    valid_menopausal = ["premenopausal", "postmenopausal"]
    if params.menopausal_status not in valid_menopausal:
        raise ValueError(f"menopausal_status must be one of {valid_menopausal}")
    
    return params


def calculate_risk_score(params: BreastCancerParams) -> tuple[float, dict]:
    """Calculate breast cancer risk score based on patient parameters.
    
    This is a simplified risk model based on established risk factors.
    Returns (risk_score, contributing_factors).
    """
    
    validated = validate_params(params)
    base_risk = 12.5  # Base lifetime risk of ~12.5% for average woman
    
    contributing_factors = {}
    
    # Age factor (risk increases with age)
    if validated.age >= 50:
        age_factor = (validated.age - 50) * 0.5
        contributing_factors["age"] = age_factor
        base_risk += age_factor
    
    # BMI factor (higher BMI increases risk, especially postmenopausal)
    if validated.menopausal_status == "postmenopausal":
        if validated.bmi > 25:
            bmi_factor = (validated.bmi - 25) * 0.3
            contributing_factors["bmi"] = bmi_factor
            base_risk += bmi_factor
    elif validated.bmi > 30:
        bmi_factor = (validated.bmi - 30) * 0.2
        contributing_factors["bmi"] = bmi_factor
        base_risk += bmi_factor
    
    # Family history
    if validated.family_history:
        family_factor = 15.0
        contributing_factors["family_history"] = family_factor
        base_risk += family_factor
    
    # Breast density
    density_factors = {
        "low": 0.0,
        "medium": 3.0,
        "high": 8.0,
        "very_high": 15.0
    }
    density_factor = density_factors.get(validated.breast_density, 0.0)
    if density_factor > 0:
        contributing_factors["breast_density"] = density_factor
        base_risk += density_factor
    
    # Hormone use (increases risk)
    if validated.hormone_use:
        hormone_factor = 8.0
        contributing_factors["hormone_use"] = hormone_factor
        base_risk += hormone_factor
    
    # Previous biopsies (indicator of previous concerns)
    if validated.previous_biopsies > 0:
        biopsy_factor = validated.previous_biopsies * 2.0
        contributing_factors["previous_biopsies"] = biopsy_factor
        base_risk += biopsy_factor
    
    # Early menstruation
    if validated.first_menstruation_age < 12:
        early_menstruation_factor = 5.0
        contributing_factors["early_menstruation"] = early_menstruation_factor
        base_risk += early_menstruation_factor
    
    # Late or no pregnancy
    if validated.first_pregnancy_age is None:
        no_pregnancy_factor = 5.0
        contributing_factors["no_pregnancy"] = no_pregnancy_factor
        base_risk += no_pregnancy_factor
    elif validated.first_pregnancy_age >= 30:
        late_pregnancy_factor = 3.0
        contributing_factors["late_pregnancy"] = late_pregnancy_factor
        base_risk += late_pregnancy_factor
    
    # Clamp risk to reasonable range (0-100%)
    risk_score = max(0.0, min(100.0, base_risk))
    
    return risk_score, contributing_factors


def assess_breast_cancer_risk(params: BreastCancerParams) -> RiskAssessmentResult:
    """Perform comprehensive breast cancer risk assessment.
    
    Parameters
    ----------
    params : BreastCancerParams
        Patient parameters.
    
    Returns
    -------
    RiskAssessmentResult
        Risk score, category, contributing factors, and recommendations.
    """
    
    risk_score, contributing_factors = calculate_risk_score(params)
    
    # Categorize risk
    if risk_score < 15:
        risk_category = "low"
    elif risk_score < 25:
        risk_category = "moderate"
    elif risk_score < 40:
        risk_category = "high"
    else:
        risk_category = "very_high"
    
    # Generate recommendations
    recommendations = []
    
    if risk_score >= 25:
        recommendations.append("Schedule annual mammogram screening")
        recommendations.append("Consider genetic counseling if family history present")
    
    if params.bmi > 25:
        recommendations.append("Maintain healthy weight through diet and exercise")
    
    if params.hormone_use and risk_score > 20:
        recommendations.append("Discuss hormone therapy risks with your physician")
    
    if params.breast_density in ["high", "very_high"]:
        recommendations.append("Consider additional screening modalities (ultrasound, MRI)")
    
    if risk_score < 15:
        recommendations.append("Continue regular self-examinations")
        recommendations.append("Follow standard screening guidelines for your age")
    
    if not recommendations:
        recommendations.append("Maintain regular screening schedule")
        recommendations.append("Continue healthy lifestyle practices")
    
    return RiskAssessmentResult(
        risk_score=risk_score,
        risk_category=risk_category,
        contributing_factors=contributing_factors,
        recommendations=recommendations
    )

