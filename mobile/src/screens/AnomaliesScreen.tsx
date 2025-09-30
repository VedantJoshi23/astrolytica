import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { ActivityIndicator, Text, Button, FAB } from "react-native-paper";
import { fetchAnomalies, type Anomaly } from "../store/anomaliesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store";
import { AnomalyCard } from "../components/AnomalyCard";

export const AnomaliesScreen = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.anomalies
  );
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(fetchAnomalies());
  }, [dispatch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(fetchAnomalies()).finally(() => {
      setIsRefreshing(false);
    });
  };

  const handleScanForAnomalies = () => {
    // TODO: Trigger a new anomaly scan
    dispatch(fetchAnomalies());
  };

  if (status === "loading") {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator animating size="large" />
        <Text style={styles.loadingText}>Scanning for anomalies...</Text>
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load anomalies</Text>
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
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <Text variant="titleLarge" style={styles.heading}>
          Anomaly Alerts
        </Text>
        <Text variant="bodyMedium" style={styles.subheading}>
          {items.length} anomalies detected requiring attention
        </Text>

        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No anomalies detected</Text>
            <Text style={styles.emptySubtext}>
              Your astronomical data looks clean!
            </Text>
          </View>
        ) : (
          items.map((anomaly: Anomaly) => (
            <AnomalyCard
              key={anomaly.id}
              title={anomaly.title}
              timestamp={anomaly.timestamp}
              description={anomaly.description}
            />
          ))
        )}
      </ScrollView>

      <FAB
        icon="radar"
        style={styles.fab}
        onPress={handleScanForAnomalies}
        label="Scan"
      />
    </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    color: "#b0b0b0",
    fontSize: 14,
    textAlign: "center",
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#4fc3f7",
  },
});
