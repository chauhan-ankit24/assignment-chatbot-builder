/**
 * Redux Store Configuration
 * 
 * This file configures the Redux store with multiple slices for managing
 * different aspects of the application state.
 */
import { configureStore } from '@reduxjs/toolkit';

// Slice imports
import flowReducer from './flowSlice';
import uiReducer from './uiSlice';

/**
 * Configure and export the Redux store
 * 
 * The store combines multiple reducers:
 * - flow: Manages node data, canvas state, and flow logic
 * - ui: Manages UI state like sidebar visibility and themes
 */
export const store = configureStore({
  reducer: {
    flow: flowReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from serialization checks
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
