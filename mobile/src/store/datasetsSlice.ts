import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiClient } from "./api";

export interface Dataset {
  id: string;
  name: string;
  source: string;
  description: string;
}

interface DatasetsState {
  items: Dataset[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DatasetsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchDatasets = createAsyncThunk<
  Dataset[],
  void,
  { rejectValue: string }
>("datasets/fetchDatasets", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<Dataset[]>("/datasets");
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch datasets");
  }
});

const datasetsSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatasets.pending, (state: DatasetsState) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchDatasets.fulfilled,
        (state: DatasetsState, action: PayloadAction<Dataset[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchDatasets.rejected, (state: DatasetsState, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "An unknown error occurred";
      });
  },
});

export default datasetsSlice.reducer;
