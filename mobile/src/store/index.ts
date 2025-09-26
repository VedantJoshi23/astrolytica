import { configureStore } from '@reduxjs/toolkit';

import anomaliesReducer from './anomaliesSlice';
import datasetsReducer from './datasetsSlice';

export const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
    anomalies: anomaliesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
