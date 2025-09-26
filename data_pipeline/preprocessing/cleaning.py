"""Preprocessing routines for astronomical datasets."""
from __future__ import annotations

import numpy as np


def remove_outliers(data: np.ndarray, z_thresh: float = 3.0) -> np.ndarray:
    mean = data.mean(axis=0)
    std = data.std(axis=0)
    mask = np.abs((data - mean) / (std + 1e-8)) < z_thresh
    return data[mask.all(axis=1)]


def normalize(data: np.ndarray) -> np.ndarray:
    return (data - data.min()) / (data.max() - data.min() + 1e-8)
