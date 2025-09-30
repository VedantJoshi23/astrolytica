"""Inference endpoints for astronomical object detection and anomaly scoring."""
from __future__ import annotations
from typing import List
from datetime import datetime, timedelta

from fastapi import APIRouter

from ...core.schemas import Anomaly, AnomalyDetectionInput, AnomalyDetectionResult, InferenceRequest, InferenceResponse
from ...services.anomaly import AnomalyDetectionService
from ...services.inference import InferenceService

router = APIRouter()


@router.post("/objects", response_model=InferenceResponse)
async def detect_objects(request: InferenceRequest) -> InferenceResponse:
    """Run object detection on provided images."""

    service = InferenceService()
    result = await service.run_inference(request.model_dump())
    return InferenceResponse(**result)


@router.get("/anomalies", response_model=List[Anomaly])
async def get_anomalies() -> List[Anomaly]:
    """Get all detected anomalies."""
    
    # Mock data for now - in production this would query the database
    base_time = datetime.now()
    mock_anomalies = [
        Anomaly(
            id="anom-001",
            title="Unusual Orbital Deviation",
            description="Asteroid 2023-ZX147 showing unexpected trajectory changes with 94.2% confidence anomaly score",
            timestamp=(base_time - timedelta(hours=2)).isoformat()
        ),
        Anomaly(
            id="anom-002", 
            title="Object Classification Uncertainty",
            description="Object in sector J2000.0 shows mixed stellar/galactic signatures requiring manual review",
            timestamp=(base_time - timedelta(hours=8)).isoformat()
        ),
        Anomaly(
            id="anom-003",
            title="Transit Timing Variation",
            description="Exoplanet candidate showing irregular transit periods indicating possible binary system",
            timestamp=(base_time - timedelta(days=1)).isoformat()
        ),
        Anomaly(
            id="anom-004",
            title="Brightness Anomaly Detected",
            description="Variable star GX-4471 exhibiting unprecedented luminosity spike (>5 sigma)",
            timestamp=(base_time - timedelta(days=2)).isoformat()
        ),
        Anomaly(
            id="anom-005",
            title="Spectral Line Anomaly",
            description="Unknown absorption lines detected in quasar spectrum at z=2.41",
            timestamp=(base_time - timedelta(days=3)).isoformat()
        )
    ]
    
    return mock_anomalies


@router.post("/anomalies", response_model=AnomalyDetectionResult)
async def detect_anomalies(request: AnomalyDetectionInput) -> AnomalyDetectionResult:
    """Run anomaly detection across object trajectories."""

    service = AnomalyDetectionService()
    result = await service.detect(request)
    return result
