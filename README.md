# Astronomical Object and Anomaly Detection System

Comprehensive R&D platform combining deep learning, dynamic programming, and mobile interfaces for astronomical object detection and anomaly monitoring. Inspired by IIT Gandhinagar-grade research rigor.

## Modules

- **backend/** – FastAPI service, Celery workers, and service layer orchestrating inference and anomaly detection.
- **ml/** – Shared PyTorch models, training loops, and evaluation utilities.
- **data_pipeline/** – Ingestion and preprocessing workflows for SDSS, Pan-STARRS, and orbital data.
- **mobile/** – React Native (Expo) client with Redux Toolkit state management and anomaly visualizations.
- **infrastructure/** – Docker, Terraform, and monitoring artifacts for deployment.

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Celery Worker

```bash
cd backend
source .venv/bin/activate
celery -A app.workers.celery_app.celery_app worker --loglevel=info
```

### Mobile App

```bash
cd mobile
npm install
npm run start
```

### Tests

```bash
cd backend
pytest

cd ../data_pipeline
pytest

cd ../mobile
npm test
```

## Timeline (Summary)

- Weeks 1–2: Pipeline scaffolding & dataset hygiene
- Weeks 3–5: CNN baselines & cloud infra
- Weeks 6–8: LSTM + dynamic programming anomaly modules
- Weeks 9–11: Calibration, benchmarking, ensemble reliability
- Weeks 12–13: Mobile app & visualization
- Weeks 14–16: Validation, cross-survey comparisons
- Weeks 17–18: User study, documentation, scalable deployment

## Limitations & Mitigation

- Class imbalance: Augmentations, synthetic anomalies, calibrated weighting
- Domain shift: Diverse sampling, domain adaptation
- Mobile constraints: Server-side inference fallbacks, latency budgeting
- Explainability: Grad-CAM, attention overlays, confidence summaries

## Monitoring

Use `infrastructure/docker/docker-compose.yml` to spin up supporting services, Prometheus scraping, and (optional) Grafana dashboards.

## License

MIT
