import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Image, Alert } from "react-native";
import {
  Button,
  Text,
  Card,
  ActivityIndicator,
  ProgressBar,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch } from "../store/hooks";

export const ImageUploadScreen = () => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickImage = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "We need camera roll permissions to select images"
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setAnalysisResults(null);
    }
  };

  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "We need camera permissions to take photos"
      );
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setAnalysisResults(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 0.9) {
            clearInterval(progressInterval);
            return 0.9;
          }
          return prev + 0.1;
        });
      }, 200);

      // Simulate API call - in real implementation, this would call the backend
      await new Promise((resolve) => setTimeout(resolve, 3000));

      clearInterval(progressInterval);
      setUploadProgress(1);

      // Mock results
      const mockResults = {
        results: [
          {
            object_type: "Galaxy (Spiral)",
            confidence: 0.947,
            bounding_box: [0.2, 0.3, 0.8, 0.7],
          },
          {
            object_type: "Star (Class G)",
            confidence: 0.823,
            bounding_box: [0.1, 0.1, 0.3, 0.3],
          },
        ],
        latency_ms: 234.5,
      };

      setAnalysisResults(mockResults);
    } catch (error) {
      Alert.alert(
        "Analysis Failed",
        "Unable to analyze the image. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        Astronomical Image Analysis
      </Text>
      <Text variant="bodyMedium" style={styles.subheading}>
        Upload or capture astronomical images for AI-powered object detection
      </Text>

      <Card style={styles.uploadCard}>
        <Card.Content>
          {selectedImage ? (
            <View>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
              <Button
                mode="outlined"
                onPress={() => setSelectedImage(null)}
                style={styles.clearButton}
              >
                Clear Image
              </Button>
            </View>
          ) : (
            <View style={styles.uploadArea}>
              <Text style={styles.uploadText}>No image selected</Text>
              <Text style={styles.uploadSubtext}>
                Choose from gallery or take a new photo
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={pickImage}
          style={[styles.actionButton, styles.primaryButton]}
          icon="image"
        >
          Select Image
        </Button>
        <Button
          mode="outlined"
          onPress={takePhoto}
          style={[styles.actionButton, styles.secondaryButton]}
          icon="camera"
        >
          Take Photo
        </Button>
      </View>

      {selectedImage && (
        <Button
          mode="contained"
          onPress={analyzeImage}
          disabled={isAnalyzing}
          style={[styles.analyzeButton, styles.primaryButton]}
          icon="radar"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Image"}
        </Button>
      )}

      {isAnalyzing && (
        <Card style={styles.progressCard}>
          <Card.Content>
            <Text style={styles.progressText}>
              Processing image with neural networks...
            </Text>
            <ProgressBar progress={uploadProgress} style={styles.progressBar} />
          </Card.Content>
        </Card>
      )}

      {analysisResults && (
        <Card style={styles.resultsCard}>
          <Card.Title
            title="Detection Results"
            subtitle={`Processed in ${analysisResults.latency_ms}ms`}
            titleStyle={styles.resultsTitle}
            subtitleStyle={styles.resultsSubtitle}
          />
          <Card.Content>
            {analysisResults.results.map((result: any, index: number) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.objectType}>{result.object_type}</Text>
                <Text style={styles.confidence}>
                  {(result.confidence * 100).toFixed(1)}% confidence
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0a0a0a",
    minHeight: "100%",
  },
  heading: {
    marginBottom: 8,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subheading: {
    marginBottom: 24,
    color: "#b0b0b0",
    textAlign: "center",
  },
  uploadCard: {
    backgroundColor: "#1a1a1a",
    marginBottom: 16,
    borderRadius: 12,
  },
  uploadArea: {
    alignItems: "center",
    paddingVertical: 40,
  },
  uploadText: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
  },
  uploadSubtext: {
    color: "#b0b0b0",
    fontSize: 14,
    textAlign: "center",
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  clearButton: {
    borderColor: "#4fc3f7",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: "#4fc3f7",
  },
  secondaryButton: {
    borderColor: "#4fc3f7",
  },
  analyzeButton: {
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: "#1a1a1a",
    marginBottom: 16,
    borderRadius: 12,
  },
  progressText: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 4,
  },
  resultsCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
  },
  resultsTitle: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  resultsSubtitle: {
    color: "#4fc3f7",
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  objectType: {
    color: "#ffffff",
    fontSize: 16,
    flex: 1,
  },
  confidence: {
    color: "#4fc3f7",
    fontSize: 14,
    fontWeight: "bold",
  },
});
