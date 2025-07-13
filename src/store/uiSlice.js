/**
 * UI Slice - Redux Toolkit Slice for UI State Management
 * 
 * This slice manages UI-related state such as sidebar visibility,
 * theme preferences, and other interface settings.
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for UI slice
 */
const initialState = {
  isCollapsed: false,        // Sidebar collapsed state
  selectedNodeType: null,    // Currently selected node type from sidebar
  isDragging: false,         // Global drag state indicator
  showSettings: false,       // Settings panel visibility
  theme: 'dark',            // Application theme
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Toggle sidebar collapsed state
     */
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },

    /**
     * Set sidebar collapsed state explicitly
     */
    setSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },

    /**
     * Set the selected node type in sidebar
     */
    setSelectedNodeType: (state, action) => {
      state.selectedNodeType = action.payload;
    },

    /**
     * Set global dragging state
     */
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },

    /**
     * Toggle settings panel visibility
     */
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },

    /**
     * Set application theme
     */
    setTheme: (state, action) => {
      const validThemes = ['light', 'dark', 'auto'];
      const theme = action.payload;
      
      if (validThemes.includes(theme)) {
        state.theme = theme;
      }
    },

    /**
     * Reset UI state to defaults
     */
    resetUI: (state) => {
      state.selectedNodeType = null;
      state.isDragging = false;
      state.showSettings = false;
      // Keep sidebar and theme state as they are user preferences
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  setSidebarCollapsed,
  setSelectedNodeType,
  setIsDragging,
  toggleSettings,
  setTheme,
  resetUI,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;
