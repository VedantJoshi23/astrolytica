import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from './api';

export interface Dataset {
  id: string;
  name: string;
  source: string;
  description: string;
}

interface DatasetsState {
  items: Dataset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DatasetsState = {
  items: [],
  status: 'idle',
};

export const fetchDatasets = createAsyncThunk<Dataset[]>(
  'datasets/fetchDatasets',
  async () => {
  const response = await apiClient.get<Dataset[]>('/datasets');
    return response.data;
  }
);

const datasetsSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatasets.pending, (state: DatasetsState) => {
        state.status = 'loading';
      })
      .addCase(fetchDatasets.fulfilled, (state: DatasetsState, action: PayloadAction<Dataset[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDatasets.rejected, (state: DatasetsState) => {
        state.status = 'failed';
      });
  },
});

export default datasetsSlice.reducer;
