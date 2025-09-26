"""PyTorch CNN model definition for astronomical object detection."""
from __future__ import annotations

from pathlib import Path
from typing import ClassVar, List

import torch
import torch.nn as nn
import torch.nn.functional as F

MODEL_WEIGHTS_PATH = Path(__file__).resolve().parent.parent / "models" / "astronomical_cnn.pth"


class AstronomicalCNN(nn.Module):
    """Convolutional network inspired by EfficientNet-lite for lightweight inference."""

    class_names: ClassVar[List[str]] = ["star", "galaxy", "quasar", "noise"]

    def __init__(self, num_classes: int | None = None) -> None:
        super().__init__()
        self.num_classes = num_classes or len(self.class_names)

        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        self.fc1 = nn.Linear(128 * 8 * 8, 256)
        self.dropout = nn.Dropout(0.4)
        self.fc2 = nn.Linear(256, self.num_classes)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.bn2(self.conv2(x)))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.bn3(self.conv3(x)))
        x = F.max_pool2d(x, 2)
        x = torch.flatten(x, 1)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        return self.fc2(x)

    @classmethod
    def load_pretrained(cls) -> "AstronomicalCNN":
        model = cls()
        if MODEL_WEIGHTS_PATH.exists():
            state_dict = torch.load(MODEL_WEIGHTS_PATH, map_location="cpu")
            model.load_state_dict(state_dict)
        else:
            model.apply(cls._init_weights)
        return model

    @staticmethod
    def _init_weights(module: nn.Module) -> None:
        if isinstance(module, (nn.Conv2d, nn.Linear)):
            nn.init.kaiming_normal_(module.weight)
            if module.bias is not None:
                nn.init.zeros_(module.bias)
