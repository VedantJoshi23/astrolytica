import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiClient } from "./api";

export interface Anomaly {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

interface AnomaliesState {
  items: Anomaly[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AnomaliesState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchAnomalies = createAsyncThunk<
  Anomaly[],
  void,
  { rejectValue: string }
>("anomalies/fetchAnomalies", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<Anomaly[]>("/inference/anomalies");
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch anomalies");
  }
});

const anomaliesSlice = createSlice({
  name: "anomalies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnomalies.pending, (state: AnomaliesState) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchAnomalies.fulfilled,
        (state: AnomaliesState, action: PayloadAction<Anomaly[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAnomalies.rejected, (state: AnomaliesState, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "An unknown error occurred";
      });
  },
});

export default anomaliesSlice.reducer;
