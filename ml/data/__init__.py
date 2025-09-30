
"""Data assets for ML experiments."""

# Import kagglehub and download the latest version of the dataset
import kagglehub

# Download the Sloan Digital Sky Survey DR18 dataset
DATASET_PATH = kagglehub.dataset_download("diraf0/sloan-digital-sky-survey-dr18")

# Expose the dataset path for use in other modules
__all__ = ["DATASET_PATH"]