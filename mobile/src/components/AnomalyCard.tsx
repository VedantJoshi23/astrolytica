import React from 'react';
import { Card, Text } from 'react-native-paper';

interface Props {
  title: string;
  timestamp: string;
  description: string;
}

export const AnomalyCard: React.FC<Props> = ({ title, timestamp, description }: Props) => (
  <Card style={{ marginVertical: 8 }}>
    <Card.Title title={title} subtitle={timestamp} />
    <Card.Content>
      <Text>{description}</Text>
    </Card.Content>
  </Card>
);
