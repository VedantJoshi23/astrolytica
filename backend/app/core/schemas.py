"""Pydantic data models for API requests and responses."""
from __future__ import annotations

from typing import Any, Dict, List, Optional, Sequence

from pydantic import BaseModel, Field


class DatasetIngestionRequest(BaseModel):
    dataset_uri: str
    metadata: Dict[str, Any] = Field(default_factory=dict)


class DatasetIngestionResponse(BaseModel):
    dataset_uri: str
    local_path: str
    metadata: Dict[str, Any]


class InferenceItem(BaseModel):
    image_uri: Optional[str] = None
    image_array: Optional[Sequence[Sequence[Sequence[float]]]] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {"image_uri": "s3://bucket/image.fits"},
                {"image_array": [[[0.0, 0.1, 0.9]]]},
            ]
        }
    }


class InferenceRequest(BaseModel):
    items: List[InferenceItem]


class ObjectDetectionResult(BaseModel):
    object_type: str
    confidence: float
    bounding_box: Sequence[float]


class InferenceResponse(BaseModel):
    results: List[ObjectDetectionResult]
    latency_ms: float


class TrajectoryPointInput(BaseModel):
    timestamp: float
    position: Sequence[float]


class AnomalyDetectionInput(BaseModel):
    points: List[TrajectoryPointInput]


class AnomalyDetectionResult(BaseModel):
    anomaly_detected: bool
    points: List[Dict[str, Any]]
