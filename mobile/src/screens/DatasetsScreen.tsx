import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  Snackbar,
} from "react-native-paper";
import { fetchDatasets, type Dataset } from "../store/datasetsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store";

export const DatasetsScreen = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.datasets
  );
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(fetchDatasets());
  }, [dispatch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(fetchDatasets()).finally(() => {
      setIsRefreshing(false);
    });
  };

  const handleIngest = (dataset: Dataset) => {
    // TODO: Implement dataset ingestion
    setSnackbarVisible(true);
  };

  if (status === "loading") {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator animating size="large" />
        <Text style={styles.loadingText}>Loading datasets...</Text>
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load datasets</Text>
        {error && <Text style={styles.errorSubtext}>{error}</Text>}
        <Button
          mode="outlined"
          onPress={handleRefresh}
          style={styles.retryButton}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <Text variant="titleLarge" style={styles.heading}>
          Available Datasets
        </Text>
        <Text variant="bodyMedium" style={styles.subheading}>
          Choose from astronomical survey data to explore celestial objects
        </Text>

        {items.map((dataset: Dataset) => (
          <Card key={dataset.id} style={styles.card}>
            <Card.Title
              title={dataset.name}
              subtitle={dataset.source}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
            <Card.Content>
              <Text style={styles.cardDescription}>{dataset.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => handleIngest(dataset)}
                style={styles.ingestButton}
              >
                Ingest Data
              </Button>
              <Button mode="outlined" onPress={() => {}}>
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Dataset ingestion started
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0a0a0a",
    minHeight: "100%",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
    padding: 20,
  },
  heading: {
    marginBottom: 8,
    color: "#ffffff",
    fontWeight: "bold",
  },
  subheading: {
    marginBottom: 20,
    color: "#b0b0b0",
    textAlign: "center",
  },
  card: {
    marginVertical: 8,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#4fc3f7",
    fontSize: 14,
  },
  cardDescription: {
    color: "#e0e0e0",
    lineHeight: 20,
  },
  ingestButton: {
    backgroundColor: "#4fc3f7",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#f44336",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  errorSubtext: {
    color: "#f44336",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.8,
  },
  retryButton: {
    borderColor: "#4fc3f7",
  },
});
