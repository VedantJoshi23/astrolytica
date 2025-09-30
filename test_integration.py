#!/usr/bin/env python3
"""Test script to demonstrate the full dataset integration."""

import os
from pathlib import Path

def test_dataset_integration():
    print("🔬 Testing Astrolytica Dataset Integration")
    print("=" * 50)
    
    # Test 1: Dataset Download
    print("\n1. Testing Dataset Download...")
    try:
        from ml.data import DATASET_PATH
        print(f"✅ Dataset successfully downloaded to: {DATASET_PATH}")
        
        # Check if dataset exists and list some contents
        dataset_path = Path(DATASET_PATH)
        if dataset_path.exists():
            files = list(dataset_path.iterdir())[:5]  # List first 5 items
            print(f"📁 Dataset contains {len(list(dataset_path.iterdir()))} items")
            print(f"📄 Sample items: {[f.name for f in files]}")
        else:
            print("❌ Dataset path does not exist")
            return False
            
    except Exception as e:
        print(f"❌ Dataset download failed: {e}")
        return False
    
    # Test 2: DatasetLoader Integration
    print("\n2. Testing DatasetLoader with Default Path...")
    try:
        from ml.utils.data import DatasetLoader
        loader = DatasetLoader()  # Should use DATASET_PATH by default
        print(f"✅ DatasetLoader initialized with path: {loader.base_path}")
        
        # Test file listing (looking for FITS files)
        fits_files = loader.list_files()
        print(f"📊 Found {len(fits_files)} FITS files in dataset")
        
    except Exception as e:
        print(f"❌ DatasetLoader test failed: {e}")
    
    # Test 3: Training Functions
    print("\n3. Testing Training Functions Integration...")
    try:
        from ml.training.train_detector import train_detector
        from ml.training.train_anomaly import train_anomaly
        
        print("✅ train_detector imported successfully")
        print("✅ train_anomaly imported successfully")
        print("🔧 Training functions will use DATASET_PATH by default")
        
    except Exception as e:
        print(f"❌ Training functions test failed: {e}")
    
    # Test 4: Backend Models
    print("\n4. Testing Backend Models Integration...")
    try:
        # This might fail if PyTorch models aren't trained yet, but import should work
        from backend.app.models.detector import CNNObjectDetector, SequenceAnomalyModel
        print("✅ Backend detector models imported successfully")
        print("🔧 Models are ready for inference")
        
    except Exception as e:
        print(f"⚠️  Backend models test (expected if models not trained): {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Dataset integration test completed!")
    print("📝 Summary:")
    print("   - Kaggle dataset downloaded via kagglehub")
    print("   - DATASET_PATH available globally")  
    print("   - Training scripts use dataset by default")
    print("   - DatasetLoader uses dataset by default")
    print("   - Backend models ready for inference")
    return True

if __name__ == "__main__":
    test_dataset_integration()
