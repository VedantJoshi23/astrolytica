import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/HomeScreen';
import { DatasetsScreen } from '../screens/DatasetsScreen';
import { AnomaliesScreen } from '../screens/AnomaliesScreen';

export type RootStackParamList = {
  Home: undefined;
  Datasets: undefined;
  Anomalies: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Datasets" component={DatasetsScreen} />
    <Stack.Screen name="Anomalies" component={AnomaliesScreen} />
  </Stack.Navigator>
);
