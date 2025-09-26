import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { fetchAnomalies, type Anomaly } from '../store/anomaliesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { RootState } from '../store';
import { AnomalyCard } from '../components/AnomalyCard';

export const AnomaliesScreen = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state: RootState) => state.anomalies);

  useEffect(() => {
    dispatch(fetchAnomalies());
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        Anomaly Alerts
      </Text>
      {status === 'loading' && <ActivityIndicator animating />}
  {items.map((anomaly: Anomaly) => (
        <AnomalyCard
          key={anomaly.id}
          title={anomaly.title}
          timestamp={anomaly.timestamp}
          description={anomaly.description}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  heading: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#111',
  },
});
