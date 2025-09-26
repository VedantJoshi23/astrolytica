"""Basic health endpoint test."""
from fastapi.testclient import TestClient

from backend.app.main import app


def test_healthcheck():
    client = TestClient(app)
    response = client.get("/status/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
