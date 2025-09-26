"""Stub ML models bridging to the shared ml package."""
from __future__ import annotations

import time
from pathlib import Path
from typing import Iterable, List

import numpy as np
import torch

from ml.models.cnn import AstronomicalCNN
from ml.models.sequence import SequenceAnomalyEstimator
from ml.utils.images import load_fits_image


class CNNObjectDetector:
    """Wraps the PyTorch CNN for inference usage."""

    def __init__(self) -> None:
        self.model = AstronomicalCNN.load_pretrained()
        self.model.eval()
        self.last_latency_ms: float = 0.0

    def load_image(self, uri: str) -> np.ndarray:
        """Load image using shared ML utilities."""

        return load_fits_image(uri)

    def predict(self, images: Iterable[np.ndarray]) -> List[dict]:
        """Run inference and return serialized detection outputs."""

        start = time.perf_counter()
        outputs = []
        for image in images:
            tensor = torch.tensor(image).float().unsqueeze(0)
            with torch.no_grad():
                prediction = self.model(tensor)
            label = torch.argmax(prediction, dim=1).item()
            confidence = torch.max(torch.softmax(prediction, dim=1)).item()
            outputs.append(
                {
                    "object_type": self.model.class_names[label],
                    "confidence": confidence,
                    "bounding_box": [0.0, 0.0, float(image.shape[-2]), float(image.shape[-1])],
                }
            )
        self.last_latency_ms = (time.perf_counter() - start) * 1000
        return outputs


class SequenceAnomalyModel:
    """Wrap the recurrent anomaly estimator for backend usage."""

    def __init__(self) -> None:
        self.model = SequenceAnomalyEstimator.load_pretrained()
        self.model.eval()

    def predict_sequence(self, sequence: np.ndarray) -> np.ndarray:
        tensor = torch.tensor(sequence).float().unsqueeze(0)
        with torch.no_grad():
            outputs = self.model(tensor)
        return torch.sigmoid(outputs).squeeze(0).numpy()
