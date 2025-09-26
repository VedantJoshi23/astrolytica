"""Tests for dynamic programming optimizer."""
from backend.app.services.dynamic_programming import TrajectoryOptimizer, TrajectoryPoint


def test_optimizer_detects_anomaly():
    optimizer = TrajectoryOptimizer(penalty=0.05, threshold=0.5)
    points = [
        TrajectoryPoint(timestamp=0.0, position=[0.1, 0.1]),
        TrajectoryPoint(timestamp=1.0, position=[5.0, 5.0]),
        TrajectoryPoint(timestamp=2.0, position=[0.2, 0.2]),
    ]

    optimized = optimizer.optimize(points)
    assert optimizer.has_anomaly(optimized)
