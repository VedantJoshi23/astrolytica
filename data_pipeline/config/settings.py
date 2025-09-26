"""Configuration for data pipeline operations."""
from __future__ import annotations

from pydantic_settings import BaseSettings


class DataPipelineSettings(BaseSettings):
    sdss_manifest_url: str = "https://data.sdss.org/nightly/latest-manifest.json"
    panstarrs_manifest_url: str = "https://panstarrs.stsci.edu/latest-manifest.json"
    batch_size: int = 32


settings = DataPipelineSettings()
