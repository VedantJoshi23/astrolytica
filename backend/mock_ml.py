"""Simple ML model demonstration for object detection."""
import torch
import torch.nn as nn
import numpy as np
from typing import List, Dict, Any


class SimpleAstroCNN(nn.Module):
    """Simplified CNN for demonstration."""
    
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, 3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        self.classifier = nn.Linear(32, 4)  # 4 classes: star, galaxy, quasar, noise
        
    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        return self.classifier(x)


class MockInferenceEngine:
    """Mock ML inference engine for demonstration."""
    
    def __init__(self):
        self.model = SimpleAstroCNN()
        self.model.eval()
        self.class_names = ["star", "galaxy", "quasar", "noise"]
        
    def predict_objects(self, image_data: np.ndarray) -> List[Dict[str, Any]]:
        """Mock object detection."""
        # Simulate detection results
        objects = [
            {
                "type": "star", 
                "confidence": float(np.random.uniform(0.8, 0.95)),
                "position": [int(np.random.uniform(50, 200)), int(np.random.uniform(50, 200))],
                "magnitude": float(np.random.uniform(12.0, 18.0))
            },
            {
                "type": "galaxy", 
                "confidence": float(np.random.uniform(0.7, 0.9)),
                "position": [int(np.random.uniform(250, 400)), int(np.random.uniform(150, 300))],
                "magnitude": float(np.random.uniform(15.0, 22.0))
            }
        ]
        return objects
        
    def detect_anomalies(self, trajectory_points: List[Dict]) -> Dict[str, Any]:
        """Mock anomaly detection."""
        # Simulate trajectory analysis
        anomaly_scores = [np.random.uniform(0.1, 0.9) for _ in trajectory_points]
        has_anomaly = max(anomaly_scores) > 0.7
        
        enriched_points = []
        for i, point in enumerate(trajectory_points):
            enriched_points.append({
                "timestamp": point.get("timestamp", i * 60),
                "position": point.get("position", [i * 0.1, i * 0.1, i * 0.1]),
                "anomaly_score": anomaly_scores[i]
            })
            
        return {
            "anomaly_detected": has_anomaly,
            "confidence": max(anomaly_scores),
            "points": enriched_points
        }


# Global inference engine instance
inference_engine = MockInferenceEngine()
print("ML Inference Engine initialized successfully!")
