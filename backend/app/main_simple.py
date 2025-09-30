"""Simplified FastAPI application entrypoint for demo purposes."""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Astronomical Object Detection System - Demo",
    version="0.1.0",
    description="Simplified backend for demonstration",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:19006", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Astrolytica Backend is running!"}


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy", "service": "astrolytica-backend"}


@app.get("/api/v1/status/health")
async def api_health():
    """API health check."""
    return {"status": "ok", "version": "0.1.0"}


@app.post("/api/v1/inference/objects")
async def detect_objects(request: dict):
    """Mock object detection endpoint."""
    return {
        "objects": [
            {"type": "star", "confidence": 0.95, "position": [100, 200]},
            {"type": "galaxy", "confidence": 0.87, "position": [300, 400]},
        ],
        "processing_time": 0.045
    }


@app.post("/api/v1/inference/anomalies")
async def detect_anomalies(request: dict):
    """Mock anomaly detection endpoint."""
    return {
        "anomaly_detected": True,
        "confidence": 0.78,
        "points": [
            {"timestamp": 1695811200, "position": [1.0, 2.0, 3.0], "anomaly_score": 0.2},
            {"timestamp": 1695811260, "position": [1.1, 2.1, 3.2], "anomaly_score": 0.8},
            {"timestamp": 1695811320, "position": [1.2, 2.0, 3.1], "anomaly_score": 0.3},
        ]
    }


@app.post("/api/v1/datasets/ingest")
async def ingest_dataset(request: dict):
    """Mock dataset ingestion endpoint."""
    return {
        "task_id": "abc123",
        "status": "processing",
        "message": "Dataset ingestion started"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
