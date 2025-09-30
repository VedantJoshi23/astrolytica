import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/HomeScreen";
import { DatasetsScreen } from "../screens/DatasetsScreen";
import { AnomaliesScreen } from "../screens/AnomaliesScreen";
import { ImageUploadScreen } from "../screens/ImageUploadScreen";
import { DashboardScreen } from "../screens/DashboardScreen";

export type RootStackParamList = {
  Home: undefined;
  Datasets: undefined;
  Anomalies: undefined;
  ImageUpload: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1a1a1a",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "AstroLytica" }}
    />
    <Stack.Screen
      name="Datasets"
      component={DatasetsScreen}
      options={{ title: "Datasets" }}
    />
    <Stack.Screen
      name="Anomalies"
      component={AnomaliesScreen}
      options={{ title: "Anomalies" }}
    />
    <Stack.Screen
      name="ImageUpload"
      component={ImageUploadScreen}
      options={{ title: "Image Analysis" }}
    />
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: "Analytics" }}
    />
  </Stack.Navigator>
);
