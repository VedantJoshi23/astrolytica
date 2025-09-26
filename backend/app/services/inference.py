"""Inference service for astronomical object detection."""
from __future__ import annotations

from typing import Any, Dict, List

import numpy as np

from ..core.schemas import InferenceRequest, InferenceResponse, ObjectDetectionResult
from ..models.detector import CNNObjectDetector


class InferenceService:
    """Service wrapping the ML detector for REST and task usage."""

    def __init__(self) -> None:
        self.detector = CNNObjectDetector()

    async def run_inference(self, payload: Dict[str, Any] | InferenceRequest) -> Dict[str, Any]:
        """Run inference against uploaded images or dataset references."""

        request = InferenceRequest.model_validate(payload)
        image_batches: List[np.ndarray] = []
        for item in request.items:
            if item.image_array is not None:
                image_batches.append(np.array(item.image_array))
            else:
                image_batches.append(self.detector.load_image(item.image_uri))

        detections = self.detector.predict(image_batches)
        response = InferenceResponse(
            results=[ObjectDetectionResult(**result) for result in detections],
            latency_ms=float(self.detector.last_latency_ms),
        )

        return response.model_dump()
