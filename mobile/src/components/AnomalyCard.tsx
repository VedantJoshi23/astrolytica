import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Chip, Button } from "react-native-paper";

interface Props {
  title: string;
  timestamp: string;
  description: string;
}

export const AnomalyCard: React.FC<Props> = ({
  title,
  timestamp,
  description,
}: Props) => {
  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }
  };

  const getSeverityChip = (title: string) => {
    if (title.includes("Unusual") || title.includes("Deviation")) {
      return (
        <Chip
          mode="flat"
          style={styles.highSeverity}
          textStyle={styles.chipText}
        >
          HIGH
        </Chip>
      );
    } else if (title.includes("Uncertainty") || title.includes("Review")) {
      return (
        <Chip
          mode="flat"
          style={styles.mediumSeverity}
          textStyle={styles.chipText}
        >
          MEDIUM
        </Chip>
      );
    }
    return (
      <Chip mode="flat" style={styles.lowSeverity} textStyle={styles.chipText}>
        LOW
      </Chip>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          {getSeverityChip(title)}
        </View>

        <Text variant="bodySmall" style={styles.timestamp}>
          {formatTimestamp(timestamp)}
        </Text>

        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      </Card.Content>

      <Card.Actions>
        <Button mode="outlined" style={styles.actionButton}>
          Investigate
        </Button>
        <Button mode="text" onPress={() => {}}>
          Mark Reviewed
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    color: "#b0b0b0",
    marginBottom: 8,
  },
  description: {
    color: "#e0e0e0",
    lineHeight: 20,
  },
  highSeverity: {
    backgroundColor: "#d32f2f",
  },
  mediumSeverity: {
    backgroundColor: "#f57c00",
  },
  lowSeverity: {
    backgroundColor: "#388e3c",
  },
  chipText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  actionButton: {
    borderColor: "#4fc3f7",
  },
});
