"""Plotting helpers for breast cancer risk visualization.

Provides polished Matplotlib figures for risk assessment results
and a helper to export figures as PNG bytes.
"""

import io
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from breast_cancer_model import RiskAssessmentResult


def _apply_style():
    """Apply a consistent, professional plotting style."""
    try:
        plt.style.use("seaborn-v0_8")
    except OSError:
        # Fallback to seaborn if seaborn-v0_8 doesn't exist
        try:
            plt.style.use("seaborn")
        except OSError:
            # Fallback to default style
            pass
    plt.rcParams.update({
        "figure.dpi": 100,
        "axes.spines.top": False,
        "axes.spines.right": False,
        "axes.titleweight": "bold",
    })


def fig_to_png_bytes(fig: plt.Figure) -> bytes:
    """Return PNG bytes for a Matplotlib figure."""
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    png_bytes = buf.getvalue()
    plt.close(fig)
    return png_bytes


def plot_risk_score(result: RiskAssessmentResult) -> plt.Figure:
    """Create a risk score visualization with category indicators."""
    _apply_style()
    fig, ax = plt.subplots(figsize=(8, 4))

    # Risk categories and their ranges
    categories = ["Low", "Moderate", "High", "Very High"]
    ranges = [(0, 15), (15, 25), (25, 40), (40, 100)]
    colors = ["#2ca02c", "#ffbb78", "#ff7f0e", "#d62728"]

    # Draw category bands
    for i, (low, high) in enumerate(ranges):
        ax.axvspan(low, high, alpha=0.2, color=colors[i], label=categories[i])

    # Draw risk score marker
    risk_score = result.risk_score
    category_map = {
        "low": 0,
        "moderate": 1,
        "high": 2,
        "very_high": 3
    }
    color = colors[category_map.get(result.risk_category, 0)]

    ax.axvline(risk_score, color=color, linewidth=3, linestyle="--",
               label=f"Your Risk: {risk_score:.1f}%")

    ax.set_xlabel("Risk Score (%)", fontsize=12)
    ax.set_ylabel("Risk Category", fontsize=12)
    ax.set_title("Breast Cancer Risk Assessment", fontsize=14, fontweight="bold")
    ax.set_xlim(0, 100)
    ax.set_ylim(-0.5, 0.5)
    ax.set_yticks([])
    ax.legend(loc="upper right", frameon=True)
    ax.grid(True, linestyle="--", alpha=0.35, axis="x")

    fig.tight_layout()
    return fig


def plot_contributing_factors(result: RiskAssessmentResult) -> plt.Figure:
    """Create a bar chart of contributing risk factors."""
    _apply_style()
    fig, ax = plt.subplots(figsize=(8, 5))

    factors = result.contributing_factors
    if not factors:
        ax.text(0.5, 0.5, "No significant risk factors identified",
               ha="center", va="center", fontsize=12)
        ax.set_title("Contributing Risk Factors", fontsize=14, fontweight="bold")
        fig.tight_layout()
        return fig

    # Sort factors by value
    sorted_factors = sorted(factors.items(), key=lambda x: x[1], reverse=True)
    labels = [k.replace("_", " ").title() for k, v in sorted_factors]
    values = [v for k, v in sorted_factors]

    # Color bars based on risk level
    colors = ["#ff7f0e" if v > 10 else "#ffbb78" if v > 5 else "#2ca02c"
              for v in values]

    ax.barh(labels, values, color=colors, alpha=0.8)

    # Add value labels on bars
    for i, val in enumerate(values):
        ax.text(val + 0.5, i, f"{val:.1f}%", va="center", fontsize=10)

    ax.set_xlabel("Risk Contribution (%)", fontsize=12)
    ax.set_title("Contributing Risk Factors", fontsize=14, fontweight="bold")
    ax.grid(True, linestyle="--", alpha=0.35, axis="x")

    fig.tight_layout()
    return fig


def plot_risk_timeline(age: float, risk_score: float) -> plt.Figure:
    """Create a timeline showing risk progression with age."""
    _apply_style()
    fig, ax = plt.subplots(figsize=(8, 4))

    # Generate age range
    ages = np.arange(30, 80, 1)
    # Simplified risk progression model
    base_risk = risk_score
    risk_progression = base_risk * (1 + (ages - age) * 0.02)
    risk_progression = np.clip(risk_progression, 0, 100)

    ax.plot(ages, risk_progression, color="#d62728", linewidth=2,
           label="Estimated Risk Progression")
    ax.axvline(age, color="#2ca02c", linewidth=2, linestyle="--",
              label=f"Current Age: {age:.0f}")
    ax.scatter([age], [risk_score], color="#2ca02c", s=100, zorder=5,
              label=f"Current Risk: {risk_score:.1f}%")

    ax.set_xlabel("Age (years)", fontsize=12)
    ax.set_ylabel("Estimated Risk (%)", fontsize=12)
    ax.set_title("Risk Projection Over Time", fontsize=14, fontweight="bold")
    ax.legend(loc="upper left")
    ax.grid(True, linestyle="--", alpha=0.35)

    fig.tight_layout()
    return fig
