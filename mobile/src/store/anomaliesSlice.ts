import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from './api';

export interface Anomaly {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

interface AnomaliesState {
  items: Anomaly[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AnomaliesState = {
  items: [],
  status: 'idle',
};

export const fetchAnomalies = createAsyncThunk<Anomaly[]>(
  'anomalies/fetchAnomalies',
  async () => {
  const response = await apiClient.get<Anomaly[]>('/inference/anomalies');
    return response.data;
  }
);

const anomaliesSlice = createSlice({
  name: 'anomalies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnomalies.pending, (state: AnomaliesState) => {
        state.status = 'loading';
      })
      .addCase(fetchAnomalies.fulfilled, (state: AnomaliesState, action: PayloadAction<Anomaly[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAnomalies.rejected, (state: AnomaliesState) => {
        state.status = 'failed';
      });
  },
});

export default anomaliesSlice.reducer;
