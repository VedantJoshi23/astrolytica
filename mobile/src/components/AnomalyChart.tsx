import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text, Card } from "react-native-paper";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface AnomalyData {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }>;
}

interface Props {
  title: string;
  type: "line" | "bar" | "pie";
  data: AnomalyData | any;
}

export const AnomalyChart: React.FC<Props> = ({ title, type, data }) => {
  const chartConfig = {
    backgroundColor: "#1a1a1a",
    backgroundGradientFrom: "#1a1a1a",
    backgroundGradientTo: "#2a2a2a",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(79, 195, 247, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#4fc3f7",
    },
  };

  const pieData = [
    {
      name: "High",
      population: 15,
      color: "#d32f2f",
      legendFontColor: "#ffffff",
      legendFontSize: 12,
    },
    {
      name: "Medium",
      population: 42,
      color: "#f57c00",
      legendFontColor: "#ffffff",
      legendFontSize: 12,
    },
    {
      name: "Low",
      population: 190,
      color: "#388e3c",
      legendFontColor: "#ffffff",
      legendFontSize: 12,
    },
  ];

  const renderChart = () => {
    const chartWidth = screenWidth - 48; // Account for card padding

    switch (type) {
      case "line":
        return (
          <LineChart
            data={data}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        );
      case "bar":
        return (
          <BarChart
            data={data}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars={true}
            yAxisLabel=""
            yAxisSuffix="%"
          />
        );
      case "pie":
        return (
          <PieChart
            data={pieData}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            style={styles.chart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title title={title} titleStyle={styles.cardTitle} />
      <Card.Content>
        <View style={styles.chartContainer}>{renderChart()}</View>
      </Card.Content>
    </Card>
  );
};

// Sample data for different chart types
export const anomalyTimeSeriesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(79, 195, 247, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

export const detectionAccuracyData = {
  labels: ["Stars", "Galaxies", "Nebulae", "Asteroids", "Comets"],
  datasets: [
    {
      data: [99.7, 98.2, 95.8, 97.3, 94.1],
    },
  ],
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  chartContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
