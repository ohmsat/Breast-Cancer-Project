/** API service for communicating with the breast cancer risk assessment backend */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface BreastCancerParams {
  age: number;
  bmi: number;
  family_history: boolean;
  breast_density: "low" | "medium" | "high" | "very_high";
  menopausal_status: "premenopausal" | "postmenopausal";
  hormone_use: boolean;
  previous_biopsies: number;
  first_menstruation_age: number;
  first_pregnancy_age: number | null;
}

export interface RiskAssessmentResult {
  risk_score: number;
  risk_category: "low" | "moderate" | "high" | "very_high";
  contributing_factors: Record<string, number>;
  recommendations: string[];
  metrics: {
    percentile_rank: number;
    screening_frequency_months: number;
    urgency_score: number;
  };
  patient_age: number;
}

export interface Preset {
  age: number;
  bmi: number;
  family_history: boolean;
  breast_density: string;
  menopausal_status: string;
  hormone_use: boolean;
  previous_biopsies: number;
  first_menstruation_age: number;
  first_pregnancy_age: number | null;
}

export const api = {
  async healthCheck(): Promise<{ status: string; service: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error("Health check failed");
    }
    return response.json();
  },

  async getPresets(): Promise<Record<string, Preset>> {
    const response = await fetch(`${API_BASE_URL}/presets`);
    if (!response.ok) {
      throw new Error("Failed to fetch presets");
    }
    const data = await response.json();
    return data.presets;
  },

  async assessRisk(params: BreastCancerParams): Promise<RiskAssessmentResult> {
    const response = await fetch(`${API_BASE_URL}/assess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to assess risk");
    }

    return response.json();
  },

  async getRiskScorePlot(params: BreastCancerParams): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/plot/risk_score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to generate risk score plot");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },

  async getFactorsPlot(params: BreastCancerParams): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/plot/factors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to generate factors plot");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },

  async getTimelinePlot(params: BreastCancerParams): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/plot/timeline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to generate timeline plot");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },
};

