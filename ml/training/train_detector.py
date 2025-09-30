"""Training entrypoint for the CNN detector."""
from __future__ import annotations


from pathlib import Path
from ml.data import DATASET_PATH

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset

from ..models.cnn import AstronomicalCNN, MODEL_WEIGHTS_PATH


class FitsDataset(Dataset):
    def __init__(self, root: Path) -> None:
        self.root = root
        self.files = sorted(root.glob("**/*.npz"))

    def __len__(self) -> int:
        return len(self.files)

    def __getitem__(self, idx: int):
        with np.load(self.files[idx]) as batch:
            image = torch.from_numpy(batch["image"]).float()
            label = torch.tensor(batch["label"]).long()
        return image, label


def train_detector(data_path: Path = None, epochs: int = 5) -> AstronomicalCNN:
    if data_path is None:
        data_path = Path(DATASET_PATH)
    dataset = FitsDataset(data_path)
    dataloader = DataLoader(dataset, batch_size=16, shuffle=True)

    model = AstronomicalCNN()
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)

    model.train()
    for epoch in range(epochs):
        for images, labels in dataloader:
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
    MODEL_WEIGHTS_PATH.parent.mkdir(parents=True, exist_ok=True)
    torch.save(model.state_dict(), MODEL_WEIGHTS_PATH)
    return model
