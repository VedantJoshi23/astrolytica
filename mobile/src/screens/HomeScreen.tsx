import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Card, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.heading}>
            AstroLytica
          </Text>
          <Text variant="titleSmall" style={styles.subtitle}>
            Astronomical Object & Anomaly Detection System
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1.2M+</Text>
            <Text style={styles.statLabel}>Objects Analyzed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>247</Text>
            <Text style={styles.statLabel}>Anomalies Found</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>99.7%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        <Card style={styles.card}>
          <Card.Title
            title="Real-time Detection"
            subtitle="AI-powered astronomical analysis"
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
          />
          <Card.Content>
            <Text style={styles.cardDescription}>
              Deploy advanced CNNs against SDSS, Pan-STARRS, and Gaia datasets.
              Our models achieve sub-second inference with 99.7% classification
              accuracy for stellar objects.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Datasets")}
              style={styles.primaryButton}
            >
              Explore Datasets
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Anomaly Monitoring"
            subtitle="Dynamic programming & sequence analysis"
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
          />
          <Card.Content>
            <Text style={styles.cardDescription}>
              Sequence models collaborate with dynamic programming algorithms to
              identify orbital deviations, spectral anomalies, and unprecedented
              astronomical phenomena.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("Anomalies")}
              style={styles.secondaryButton}
            >
              View Anomalies
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Scientific Pipeline"
            subtitle="End-to-end astronomical workflow"
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
          />
          <Card.Content>
            <Text style={styles.cardDescription}>
              From raw telescope imagery to peer-reviewed discoveries. Automated
              preprocessing, classification, anomaly detection, and scientific
              validation.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.primaryButton}
            >
              View Analytics
            </Button>
            <Button mode="text" onPress={() => {}}>
              Learn More
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      <FAB
        icon="camera"
        style={styles.fab}
        onPress={() => navigation.navigate("ImageUpload")}
        label="Scan Image"
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
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 20,
  },
  heading: {
    color: "#4fc3f7",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 16,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4fc3f7",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#4fc3f7",
  },
  secondaryButton: {
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
