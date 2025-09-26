"""Tests for anomaly detection service."""
import numpy as np
import pytest

from backend.app.core.schemas import AnomalyDetectionInput, TrajectoryPointInput
from backend.app.services.anomaly import AnomalyDetectionService


@pytest.mark.asyncio
async def test_anomaly_detection_service_runs(mocker):
    service = AnomalyDetectionService()
    mocker.patch.object(service.model, "predict_sequence", return_value=np.array([0.2, 0.9, 0.1]))

    payload = AnomalyDetectionInput(
        points=[
            TrajectoryPointInput(timestamp=0.0, position=[0.0, 0.0]),
            TrajectoryPointInput(timestamp=1.0, position=[1.0, 1.0]),
            TrajectoryPointInput(timestamp=2.0, position=[0.0, 0.0]),
        ]
    )

    result = await service.detect(payload)
    assert result.anomaly_detected is True
