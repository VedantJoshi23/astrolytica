"""SQLAlchemy ORM models representing core datasets."""
from __future__ import annotations

from sqlalchemy import JSON, Column, DateTime, Float, Integer, String, func
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)
    object_type = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    extra = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
