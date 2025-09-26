"""Inference endpoints for astronomical object detection and anomaly scoring."""
from __future__ import annotations

from fastapi import APIRouter

from ...core.schemas import AnomalyDetectionInput, AnomalyDetectionResult, InferenceRequest, InferenceResponse
from ...services.anomaly import AnomalyDetectionService
from ...services.inference import InferenceService

router = APIRouter()


@router.post("/objects", response_model=InferenceResponse)
async def detect_objects(request: InferenceRequest) -> InferenceResponse:
    """Run object detection on provided images."""

    service = InferenceService()
    result = await service.run_inference(request.model_dump())
    return InferenceResponse(**result)


@router.post("/anomalies", response_model=AnomalyDetectionResult)
async def detect_anomalies(request: AnomalyDetectionInput) -> AnomalyDetectionResult:
    """Run anomaly detection across object trajectories."""

    service = AnomalyDetectionService()
    result = await service.detect(request)
    return result
