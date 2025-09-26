"""Anomaly detection service combining ML models and dynamic programming."""
from __future__ import annotations

from typing import Dict, Iterable, List

import numpy as np

from .dynamic_programming import TrajectoryOptimizer, TrajectoryPoint
from ..core.schemas import AnomalyDetectionInput, AnomalyDetectionResult
from ..models.detector import SequenceAnomalyModel


class AnomalyDetectionService:
    """Service orchestrating anomaly detection across models and DP optimizer."""

    def __init__(self) -> None:
        self.model = SequenceAnomalyModel()
        self.optimizer = TrajectoryOptimizer()

    async def detect(self, payload: AnomalyDetectionInput) -> AnomalyDetectionResult:
        """Perform anomaly detection using sequence model followed by DP smoothing."""

        trajectories = [TrajectoryPoint(timestamp=p.timestamp, position=p.position) for p in payload.points]
        model_scores = self.model.predict_sequence(np.array([p.position for p in payload.points]))

        enriched_points = []
        for traj_point, model_score in zip(trajectories, model_scores, strict=False):
            enriched_points.append(
                TrajectoryPoint(
                    timestamp=traj_point.timestamp,
                    position=traj_point.position,
                    anomaly_score=float(model_score),
                )
            )

        optimized = self.optimizer.optimize(enriched_points)
        has_anomaly = self.optimizer.has_anomaly(optimized)

        return AnomalyDetectionResult(
            anomaly_detected=has_anomaly,
            points=[point.__dict__ for point in optimized],
        )
