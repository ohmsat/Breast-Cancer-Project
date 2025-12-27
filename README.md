# Breast Cancer Risk Assessment Platform

A comprehensive breast cancer risk assessment application with a modern React frontend and Flask REST API backend. Designed to help women in Ghana and worldwide assess their personalized breast cancer risk based on clinical factors.

## Features

- **Personalized Risk Assessment**: Calculate breast cancer risk based on multiple factors including:
  - Age and BMI
  - Family history
  - Breast density
  - Menopausal status
  - Hormone use history
  - Previous biopsies
  - Reproductive history

- **Visual Analytics**: Interactive charts showing:
  - Risk score visualization
  - Contributing factors breakdown
  - Risk timeline projections

- **Clinical Recommendations**: Personalized screening and prevention recommendations based on risk profile

- **Modern UI/UX**: Beautiful, responsive React interface built with shadcn/ui components

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Flask REST API
- **Visualization**: Matplotlib for server-side chart generation

## Quickstart

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the Flask API server:
```bash
python app.py
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Install Node dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

### Environment Variables

Create a `.env` file in the frontend root (optional):
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/presets` - Get available risk profile presets
- `POST /api/assess` - Perform risk assessment
- `POST /api/plot/risk_score` - Generate risk score visualization
- `POST /api/plot/factors` - Generate contributing factors chart
- `POST /api/plot/timeline` - Generate risk timeline projection

## Risk Categories

- **Low**: Risk score < 15%
- **Moderate**: Risk score 15-25%
- **High**: Risk score 25-40%
- **Very High**: Risk score > 40%

## Development

### Running Tests

```bash
python -m pytest
```

### Building for Production

Frontend:
```bash
npm run build
```

## Project Structure

```
.
├── app.py                 # Flask REST API server
├── breast_cancer_model.py # Core risk assessment model
├── metrics.py            # Risk metrics computation
├── plotting.py           # Visualization utilities
├── presets.py            # Risk profile presets
├── requirements.txt      # Python dependencies
├── src/                  # React frontend
│   ├── components/       # React components
│   ├── lib/              # Utilities and API client
│   └── pages/            # Page components
└── tests/                # Python tests
```

## Medical Disclaimer

This tool is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.

## License

This project is intended for educational and research purposes.
