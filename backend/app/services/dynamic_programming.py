"""Dynamic programming utilities for trajectory optimization and anomaly scoring."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, List, Sequence


@dataclass
class TrajectoryPoint:
    """Single observation in a trajectory."""

    timestamp: float
    position: Sequence[float]
    anomaly_score: float = 0.0


class TrajectoryOptimizer:
    """Dynamic programming optimizer for trajectory smoothing and anomaly scoring."""

    def __init__(self, penalty: float = 0.1, threshold: float = 0.75) -> None:
        self.penalty = penalty
        self.threshold = threshold

    def optimize(self, points: Iterable[TrajectoryPoint]) -> List[TrajectoryPoint]:
        """Run dynamic programming over trajectory points to smooth and flag anomalies."""

        optimized: List[TrajectoryPoint] = []
        cumulative_deviation = 0.0
        for point in points:
            deviation = self._compute_deviation(point)
            weighted = (deviation + point.anomaly_score) / 2
            cumulative_deviation = max(0.0, cumulative_deviation + weighted - self.penalty)
            score = min(1.0, cumulative_deviation)
            optimized.append(
                TrajectoryPoint(
                    timestamp=point.timestamp,
                    position=point.position,
                    anomaly_score=score,
                )
            )
        return optimized

    def _compute_deviation(self, point: TrajectoryPoint) -> float:
        """Compute deviation magnitude for a trajectory point."""

        if not point.position:
            return 0.0
        return sum(abs(coord) for coord in point.position) / len(point.position)

    def has_anomaly(self, optimized_points: Sequence[TrajectoryPoint]) -> bool:
        """Check if any optimized point exceeds the anomaly threshold."""

        return any(point.anomaly_score >= self.threshold for point in optimized_points)
