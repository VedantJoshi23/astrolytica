"""Data access utilities for astronomical datasets."""
from __future__ import annotations

from pathlib import Path
from typing import Iterable, List

import numpy as np

from .images import load_fits_image, normalize_image



from ml.data import DATASET_PATH

class DatasetLoader:
    """Load batches of FITS images from local path patterns."""

    def __init__(self, base_path: str | Path = None) -> None:
        if base_path is None:
            base_path = DATASET_PATH
        self.base_path = Path(base_path)

    def list_files(self) -> List[Path]:
        return sorted(self.base_path.glob("**/*.fits"))

    def iter_batches(self, batch_size: int = 16) -> Iterable[np.ndarray]:
        batch: List[np.ndarray] = []
        for filepath in self.list_files():
            image = load_fits_image(str(filepath))
            batch.append(normalize_image(image))
            if len(batch) == batch_size:
                yield np.stack(batch)
                batch.clear()
        if batch:
            yield np.stack(batch)
