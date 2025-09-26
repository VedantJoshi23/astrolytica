"""Sequence model for anomaly detection."""
from __future__ import annotations

from pathlib import Path

import torch
import torch.nn as nn

MODEL_WEIGHTS_PATH = Path(__file__).resolve().parent.parent / "models" / "sequence_anomaly.pth"


class SequenceAnomalyEstimator(nn.Module):
    def __init__(self, input_dim: int = 3, hidden_dim: int = 64, num_layers: int = 2) -> None:
        super().__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers=num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, 1)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        outputs, _ = self.lstm(x)
        logits = self.fc(outputs)
        return logits.squeeze(-1)

    @classmethod
    def load_pretrained(cls) -> "SequenceAnomalyEstimator":
        model = cls()
        if MODEL_WEIGHTS_PATH.exists():
            state_dict = torch.load(MODEL_WEIGHTS_PATH, map_location="cpu")
            model.load_state_dict(state_dict)
        else:
            model.apply(cls._init_weights)
        return model

    @staticmethod
    def _init_weights(module: nn.Module) -> None:
        if isinstance(module, nn.Linear):
            nn.init.xavier_normal_(module.weight)
            if module.bias is not None:
                nn.init.zeros_(module.bias)
