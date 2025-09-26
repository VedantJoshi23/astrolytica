import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Astronomical Object & Anomaly Detection
      </Text>
      <Card style={styles.card}>
        <Card.Title title="Real-time Inference" subtitle="Upload images or stream telescope feeds" />
        <Card.Content>
          <Text>
            Run detection against SDSS/Pan-STARRS datasets or your own telescope imagery. View classification
            confidence along with anomaly risk in seconds.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Datasets')}>
            Explore Datasets
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Anomaly Monitoring" subtitle="Receive push alerts when risk spikes" />
        <Card.Content>
          <Text>
            Sequence models and dynamic programming collaborate to highlight suspicious orbital deviations.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" onPress={() => navigation.navigate('Anomalies')}>
            View Anomalies
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#111',
  },
});
