"""Tests for preprocessing functions."""
import numpy as np

from data_pipeline.preprocessing.cleaning import normalize, remove_outliers


def test_normalize_scales_between_zero_and_one():
    data = np.array([0.0, 5.0, 10.0])
    normalized = normalize(data)
    assert normalized.min() == 0.0
    assert normalized.max() == 1.0


def test_remove_outliers_filters_values():
    data = np.array([[1.0, 1.0], [100.0, 100.0], [2.0, 2.0]])
    filtered = remove_outliers(data)
    assert filtered.shape[0] == 2
