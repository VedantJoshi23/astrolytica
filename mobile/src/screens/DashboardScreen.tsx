import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import {
  AnomalyChart,
  anomalyTimeSeriesData,
  detectionAccuracyData,
} from "../components/AnomalyChart";

export const DashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        Analytics Dashboard
      </Text>
      <Text variant="bodyMedium" style={styles.subheading}>
        Real-time insights into astronomical object detection and anomaly
        analysis
      </Text>

      <View style={styles.metricsContainer}>
        <Card style={styles.metricCard}>
          <Card.Content style={styles.metricContent}>
            <Text style={styles.metricNumber}>2.4M</Text>
            <Text style={styles.metricLabel}>Objects Processed</Text>
          </Card.Content>
        </Card>
        <Card style={styles.metricCard}>
          <Card.Content style={styles.metricContent}>
            <Text style={styles.metricNumber}>247</Text>
            <Text style={styles.metricLabel}>Active Anomalies</Text>
          </Card.Content>
        </Card>
      </View>

      <AnomalyChart
        title="Anomalies Detected Over Time"
        type="line"
        data={anomalyTimeSeriesData}
      />

      <AnomalyChart
        title="Detection Accuracy by Object Type"
        type="bar"
        data={detectionAccuracyData}
      />

      <AnomalyChart
        title="Anomaly Severity Distribution"
        type="pie"
        data={{}}
      />

      <Card style={styles.actionCard}>
        <Card.Title
          title="System Status"
          subtitle="All systems operational"
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.statusGood}
        />
        <Card.Content>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>ML Model:</Text>
            <Text style={styles.statusGood}>Online (99.7% accuracy)</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Data Pipeline:</Text>
            <Text style={styles.statusGood}>Active (247 objects/sec)</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Anomaly Detection:</Text>
            <Text style={styles.statusGood}>Running (Last scan: 2m ago)</Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" style={styles.actionButton}>
            System Logs
          </Button>
          <Button mode="contained" style={styles.primaryButton}>
            Run Manual Scan
          </Button>
        </Card.Actions>
      </Card>
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
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    elevation: 3,
  },
  metricContent: {
    alignItems: "center",
    paddingVertical: 8,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4fc3f7",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "#b0b0b0",
    textAlign: "center",
  },
  actionCard: {
    backgroundColor: "#1a1a1a",
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  statusLabel: {
    color: "#e0e0e0",
  },
  statusGood: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  actionButton: {
    borderColor: "#4fc3f7",
  },
  primaryButton: {
    backgroundColor: "#4fc3f7",
  },
});
