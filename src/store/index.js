import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './flowSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    flow: flowReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
