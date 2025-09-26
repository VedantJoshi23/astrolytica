"""Inference service tests."""
import numpy as np
import pytest

from backend.app.core.schemas import InferenceRequest, InferenceResponse, InferenceItem
from backend.app.services.inference import InferenceService


@pytest.mark.asyncio
async def test_inference_service_handles_arrays(mocker):
    service = InferenceService()
    mocker.patch.object(service.detector, "predict", return_value=[{
        "object_type": "galaxy",
        "confidence": 0.95,
        "bounding_box": [0.0, 0.0, 10.0, 10.0],
    }])
    mocker.patch.object(service.detector, "load_image", return_value=np.zeros((1, 64, 64)))

    request = InferenceRequest(
        items=[InferenceItem(image_array=np.zeros((1, 64, 64)).tolist())]
    )

    response = await service.run_inference(request.model_dump())
    parsed = InferenceResponse(**response)
    assert parsed.results[0].object_type == "galaxy"
