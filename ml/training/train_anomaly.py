"""Training script for the sequence anomaly estimator."""
from __future__ import annotations


from pathlib import Path
from ml.data import DATASET_PATH

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset

from ..models.sequence import MODEL_WEIGHTS_PATH as SEQ_MODEL_PATH, SequenceAnomalyEstimator


class TrajectoryDataset(Dataset):
    def __init__(self, root: Path) -> None:
        self.files = sorted(root.glob("**/*.npz"))

    def __len__(self) -> int:
        return len(self.files)

    def __getitem__(self, idx: int):
        with np.load(self.files[idx]) as batch:
            trajectory = torch.from_numpy(batch["trajectory"]).float()
            labels = torch.from_numpy(batch["labels"]).float()
        return trajectory, labels


def train_anomaly(data_path: Path = None, epochs: int = 5) -> SequenceAnomalyEstimator:
    if data_path is None:
        data_path = Path(DATASET_PATH)
    dataset = TrajectoryDataset(data_path)
    dataloader = DataLoader(dataset, batch_size=8, shuffle=True)

    model = SequenceAnomalyEstimator()
    criterion = nn.BCEWithLogitsLoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)

    model.train()
    for _ in range(epochs):
        for trajectories, labels in dataloader:
            optimizer.zero_grad()
            logits = model(trajectories)
            loss = criterion(logits, labels)
            loss.backward()
            optimizer.step()
    SEQ_MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    torch.save(model.state_dict(), SEQ_MODEL_PATH)
    return model
