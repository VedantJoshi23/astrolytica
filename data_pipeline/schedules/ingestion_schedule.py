"""Schedule definitions for periodic data ingestion."""
from __future__ import annotations

from datetime import timedelta

from celery.schedules import crontab

from backend.app.workers.celery_app import celery_app

celery_app.conf.beat_schedule = {
    "fetch-sdss-nightly": {
        "task": "workers.tasks.ingest_dataset",
        "schedule": crontab(hour=2, minute=0),
        "args": ("https://data.sdss.org/nightly/latest-manifest.json",),
    },
}
