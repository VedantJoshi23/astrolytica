"""Application configuration using pydantic settings."""
from __future__ import annotations

from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Environment-backed application settings."""

    project_name: str = "Astronomical Object and Anomaly Detection Backend"
    version: str = "0.1.0"
    api_v1_prefix: str = "/api/v1"

    postgres_dsn: str = "postgresql://astro:astro@localhost:5432/astro_db"
    mongo_dsn: str = "mongodb://astro:astro@localhost:27017/astro_logs"
    rabbitmq_url: str = "amqp://astro:astro@localhost:5672/astro"
    redis_url: str = "redis://localhost:6379/0"

    allowed_origins: List[str] = ["http://localhost:3000", "http://localhost:19006"]

    model_config = SettingsConfigDict(env_file=".env", env_nested_delimiter="__")


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance."""

    return Settings()  # type: ignore[arg-type]


settings = get_settings()
