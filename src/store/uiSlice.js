import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCollapsed: false,
  selectedNodeType: null,
  isDragging: false,
  showSettings: false,
  theme: 'dark'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },

    setSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },

    setSelectedNodeType: (state, action) => {
      state.selectedNodeType = action.payload;
    },

    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },

    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    resetUI: (state) => {
      state.selectedNodeType = null;
      state.isDragging = false;
      state.showSettings = false;
    }
  }
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setSelectedNodeType,
  setIsDragging,
  toggleSettings,
  setTheme,
  resetUI
} = uiSlice.actions;

export default uiSlice.reducer;
