"""Flask REST API for breast cancer risk assessment."""

import io
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import base64
from breast_cancer_model import BreastCancerParams, assess_breast_cancer_risk, validate_params
from metrics import compute_metrics
from plotting import plot_risk_score, plot_contributing_factors, plot_risk_timeline, fig_to_png_bytes
import presets

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend


def preset_options():
    """Return available risk profile presets."""
    return {
        "low_risk": presets.low_risk_profile(),
        "moderate_risk": presets.moderate_risk_profile(),
        "high_risk": presets.high_risk_profile(),
        "very_high_risk": presets.very_high_risk_profile(),
    }

@app.route("/", methods=["GET"])
def root():
    """API root endpoint."""
    return jsonify({
        "message": "ONCOBRIDGE Breast Cancer Risk Assessment API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "presets": "/api/presets",
            "assess": "/api/assess",
            "plot_risk_score": "/api/plot/risk_score",
            "plot_factors": "/api/plot/factors",
            "plot_timeline": "/api/plot/timeline"
        }
    })
    
@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "service": "breast_cancer_risk_assessment"})


@app.route("/api/presets", methods=["GET"])
def get_presets():
    """Get available risk profile presets."""
    available_presets = preset_options()
    preset_data = {}
    for name, params in available_presets.items():
        preset_data[name] = {
            "age": params.age,
            "bmi": params.bmi,
            "family_history": params.family_history,
            "breast_density": params.breast_density,
            "menopausal_status": params.menopausal_status,
            "hormone_use": params.hormone_use,
            "previous_biopsies": params.previous_biopsies,
            "first_menstruation_age": params.first_menstruation_age,
            "first_pregnancy_age": params.first_pregnancy_age,
        }
    return jsonify({"presets": preset_data})


@app.route("/api/assess", methods=["POST"])
def assess_risk():
    """Perform breast cancer risk assessment."""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = [
            "age", "bmi", "family_history", "breast_density",
            "menopausal_status", "hormone_use", "previous_biopsies",
            "first_menstruation_age"
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create parameters
        params = BreastCancerParams(
            age=float(data["age"]),
            bmi=float(data["bmi"]),
            family_history=bool(data["family_history"]),
            breast_density=str(data["breast_density"]),
            menopausal_status=str(data["menopausal_status"]),
            hormone_use=bool(data["hormone_use"]),
            previous_biopsies=int(data["previous_biopsies"]),
            first_menstruation_age=float(data["first_menstruation_age"]),
            first_pregnancy_age=float(data["first_pregnancy_age"]) if data.get("first_pregnancy_age") is not None else None,
        )
        
        # Validate parameters
        validate_params(params)
        
        # Perform assessment
        result = assess_breast_cancer_risk(params)
        metrics = compute_metrics(result, params)
        
        # Prepare response
        response = {
            "risk_score": round(result.risk_score, 2),
            "risk_category": result.risk_category,
            "contributing_factors": {
                k: round(v, 2) for k, v in result.contributing_factors.items()
            },
            "recommendations": result.recommendations,
            "metrics": {
                "percentile_rank": round(metrics.percentile_rank, 2),
                "screening_frequency_months": metrics.screening_frequency_months,
                "urgency_score": round(metrics.urgency_score, 2),
            },
            "patient_age": params.age,
        }
        
        return jsonify(response)
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@app.route("/api/plot/risk_score", methods=["POST"])
def get_risk_score_plot():
    """Generate and return risk score visualization as PNG."""
    try:
        data = request.json
        
        # Perform assessment (reuse assess_risk logic)
        params = BreastCancerParams(
            age=float(data["age"]),
            bmi=float(data["bmi"]),
            family_history=bool(data["family_history"]),
            breast_density=str(data["breast_density"]),
            menopausal_status=str(data["menopausal_status"]),
            hormone_use=bool(data["hormone_use"]),
            previous_biopsies=int(data["previous_biopsies"]),
            first_menstruation_age=float(data["first_menstruation_age"]),
            first_pregnancy_age=float(data["first_pregnancy_age"]) if data.get("first_pregnancy_age") is not None else None,
        )
        
        result = assess_breast_cancer_risk(params)
        fig = plot_risk_score(result)
        png_bytes = fig_to_png_bytes(fig)
        
        return send_file(
            io.BytesIO(png_bytes),
            mimetype="image/png",
            as_attachment=False
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/plot/factors", methods=["POST"])
def get_factors_plot():
    """Generate and return contributing factors visualization as PNG."""
    try:
        data = request.json
        
        params = BreastCancerParams(
            age=float(data["age"]),
            bmi=float(data["bmi"]),
            family_history=bool(data["family_history"]),
            breast_density=str(data["breast_density"]),
            menopausal_status=str(data["menopausal_status"]),
            hormone_use=bool(data["hormone_use"]),
            previous_biopsies=int(data["previous_biopsies"]),
            first_menstruation_age=float(data["first_menstruation_age"]),
            first_pregnancy_age=float(data["first_pregnancy_age"]) if data.get("first_pregnancy_age") is not None else None,
        )
        
        result = assess_breast_cancer_risk(params)
        fig = plot_contributing_factors(result)
        png_bytes = fig_to_png_bytes(fig)
        
        return send_file(
            io.BytesIO(png_bytes),
            mimetype="image/png",
            as_attachment=False
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/plot/timeline", methods=["POST"])
def get_timeline_plot():
    """Generate and return risk timeline visualization as PNG."""
    try:
        data = request.json
        
        params = BreastCancerParams(
            age=float(data["age"]),
            bmi=float(data["bmi"]),
            family_history=bool(data["family_history"]),
            breast_density=str(data["breast_density"]),
            menopausal_status=str(data["menopausal_status"]),
            hormone_use=bool(data["hormone_use"]),
            previous_biopsies=int(data["previous_biopsies"]),
            first_menstruation_age=float(data["first_menstruation_age"]),
            first_pregnancy_age=float(data["first_pregnancy_age"]) if data.get("first_pregnancy_age") is not None else None,
        )
        
        result = assess_breast_cancer_risk(params)
        fig = plot_risk_timeline(params.age, result.risk_score)
        png_bytes = fig_to_png_bytes(fig)
        
        return send_file(
            io.BytesIO(png_bytes),
            mimetype="image/png",
            as_attachment=False
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
