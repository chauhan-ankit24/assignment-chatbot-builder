/**
 * Drag and Drop Constants
 * 
 * This file defines constants for drag-and-drop operations throughout the application.
 * These constants ensure type safety and consistency across components.
 */

/**
 * Drag and Drop Item Types
 * Used by react-dnd to identify different draggable items
 */
export const DND_ITEM_TYPES = {
  NODE_FROM_SIDEBAR: 'NODE_FROM_SIDEBAR',  // New nodes dragged from sidebar
  EXISTING_NODE: 'EXISTING_NODE',          // Existing nodes being repositioned
};

/**
 * Node Types
 * Defines all available node types in the flow builder
 */
export const NODE_TYPES = {
  MESSAGE: 'message',      // Simple message node
  QUESTION: 'question',    // Question/prompt node
  CONDITION: 'condition',  // Conditional logic node
  ACTION: 'action',        // Action execution node
  INPUT: 'input',          // User input collection node
  API: 'api',              // API call node
  DELAY: 'delay',          // Time delay node
  END: 'end',              // Flow termination node
};

/**
 * Connection Types
 * Defines how nodes can be connected
 */
export const CONNECTION_TYPES = {
  DEFAULT: 'default',      // Standard connection
  CONDITIONAL: 'conditional', // Conditional branch
  FALLBACK: 'fallback',    // Fallback/error path
};

/**
 * Canvas Constants
 * Settings for canvas behavior
 */
export const CANVAS_CONSTANTS = {
  MIN_ZOOM: 0.1,           // Minimum zoom level
  MAX_ZOOM: 3.0,           // Maximum zoom level
  DEFAULT_ZOOM: 1.0,       // Default zoom level
  GRID_SIZE: 20,           // Grid snap size
  NODE_SPACING: 50,        // Default spacing between nodes
};
