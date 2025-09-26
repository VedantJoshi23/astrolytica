import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { fetchDatasets, type Dataset } from '../store/datasetsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { RootState } from '../store';

export const DatasetsScreen = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state: RootState) => state.datasets);

  useEffect(() => {
    dispatch(fetchDatasets());
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        Available Datasets
      </Text>
      {status === 'loading' && <ActivityIndicator animating />}
  {items.map((dataset: Dataset) => (
        <Card key={dataset.id} style={styles.card}>
          <Card.Title title={dataset.name} subtitle={dataset.source} />
          <Card.Content>
            <Text>{dataset.description}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => {}}>Ingest</Button>
          </Card.Actions>
        </Card>
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
