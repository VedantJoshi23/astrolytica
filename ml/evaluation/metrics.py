"""Evaluation utilities for astronomical detection."""
from __future__ import annotations

from typing import Iterable, Sequence

import numpy as np
from sklearn.metrics import f1_score, precision_score, recall_score, roc_auc_score


def classification_metrics(y_true: Sequence[int], y_pred: Sequence[int]) -> dict[str, float]:
    return {
        "precision": precision_score(y_true, y_pred, average="macro"),
        "recall": recall_score(y_true, y_pred, average="macro"),
        "f1": f1_score(y_true, y_pred, average="macro"),
    }


def anomaly_metrics(y_true: Sequence[int], scores: Sequence[float]) -> dict[str, float]:
    return {
        "roc_auc": roc_auc_score(y_true, scores),
        "f1": f1_score(y_true, [score > 0.5 for score in scores]),
    }


def latency_statistics(latencies: Iterable[float]) -> dict[str, float]:
    values = np.array(list(latencies), dtype=float)
    return {
        "mean": float(values.mean()),
        "p95": float(np.percentile(values, 95)),
    }
