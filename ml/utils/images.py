"""Utility functions for astronomical imagery."""
from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np

try:
    from astropy.io import fits
except ImportError:  # pragma: no cover - optional dependency fallback
    fits = None


def load_fits_image(uri: str) -> np.ndarray:
    """Load an astronomical FITS image into a numpy array."""

    path = Path(uri)
    if fits is None:
        raise RuntimeError("astropy is required to load FITS images")
    with fits.open(path) as hdul:  # type: ignore[union-attr]
        data = hdul[0].data.astype("float32")
        if data.ndim == 2:
            data = data[None, ...]
    return data


def normalize_image(image: np.ndarray) -> np.ndarray:
    """Normalize image intensities for model consumption."""

    image = image.astype("float32")
    max_val = float(image.max() or 1.0)
    return image / max_val
