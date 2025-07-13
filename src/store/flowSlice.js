/**
 * Flow Slice - Redux Toolkit Slice for Flow Management
 * 
 * This slice manages the core flow state including nodes, canvas position,
 * drag operations, and node relationships.
 */
import { createSlice } from '@reduxjs/toolkit';
import { defaultMessages } from '../data/mockData';

/**
 * Initial state for the flow slice
 */
const initialState = {
  nodes: [],                    // Array of all nodes in the flow
  selectedNode: null,           // ID of currently selected node
  draggedNode: null,            // Node being dragged
  dragOffset: { x: 0, y: 0 },   // Offset for drag operations
  canvasPosition: { x: 0, y: 0 }, // Canvas pan position
  zoom: 1,                      // Canvas zoom level
  maxZIndex: 1,                 // Highest z-index for layering
};

/**
 * Generate a unique ID for new nodes
 * @param {string} nodeType - Type of node being created
 * @returns {string} Unique node ID
 */
const generateNodeId = (nodeType) => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substr(2, 9);
  return `${nodeType}_${timestamp}_${randomId}`;
};

/**
 * Create a new node with default properties
 * @param {string} nodeType - Type of node to create
 * @param {Object} position - Initial position {x, y}
 * @param {number} zIndex - Z-index for layering
 * @returns {Object} New node object
 */
const createNewNode = (nodeType, position, zIndex) => ({
  id: generateNodeId(nodeType),
  type: nodeType,
  position,
  zIndex,
  data: {
    message: defaultMessages[nodeType] || '',
    title: '',
    options: [],
    conditions: [],
    actions: [],
  },
  connections: {
    inputs: [],
    outputs: [],
  },
});

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    /**
     * Add a new node to the flow
     */
    addNode: (state, action) => {
      const { nodeType, position } = action.payload;
      const newNode = createNewNode(nodeType, position, state.maxZIndex + 1);
      
      state.nodes.push(newNode);
      state.maxZIndex += 1;
    },

    /**
     * Update node data (message, title, etc.)
     */
    updateNode: (state, action) => {
      const { nodeId, data } = action.payload;
      const node = state.nodes.find(n => n.id === nodeId);
      
      if (node) {
        node.data = { ...node.data, ...data };
      }
    },

    /**
     * Update node position during drag operations
     */
    updateNodePosition: (state, action) => {
      const { nodeId, position } = action.payload;
      const node = state.nodes.find(n => n.id === nodeId);
      
      if (node) {
        node.position = position;
      }
    },

    /**
     * Delete a node from the flow
     */
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      
      // Remove node from nodes array
      state.nodes = state.nodes.filter(n => n.id !== nodeId);
      
      // Clear selection if deleted node was selected
      if (state.selectedNode === nodeId) {
        state.selectedNode = null;
      }
    },

    /**
     * Select a node and bring it to front
     */
    selectNode: (state, action) => {
      const nodeId = action.payload;
      state.selectedNode = nodeId;
      
      // Bring selected node to front
      if (nodeId) {
        const node = state.nodes.find(n => n.id === nodeId);
        if (node) {
          state.maxZIndex += 1;
          node.zIndex = state.maxZIndex;
        }
      }
    },

    /**
     * Set the currently dragged node
     */
    setDraggedNode: (state, action) => {
      state.draggedNode = action.payload;
    },

    /**
     * Set drag offset for smooth dragging
     */
    setDragOffset: (state, action) => {
      state.dragOffset = action.payload;
    },

    /**
     * Clear drag state
     */
    clearDrag: (state) => {
      state.draggedNode = null;
      state.dragOffset = { x: 0, y: 0 };
    },

    /**
     * Update canvas position for panning
     */
    updateCanvasPosition: (state, action) => {
      state.canvasPosition = action.payload;
    },

    /**
     * Set canvas zoom level
     */
    setZoom: (state, action) => {
      state.zoom = Math.max(0.1, Math.min(3, action.payload)); // Clamp between 0.1 and 3
    },

    /**
     * Clear entire flow (reset to initial state)
     */
    clearFlow: (state) => {
      state.nodes = [];
      state.selectedNode = null;
      state.draggedNode = null;
      state.dragOffset = { x: 0, y: 0 };
      state.maxZIndex = 1;
    },

    /**
     * Duplicate an existing node
     */
    duplicateNode: (state, action) => {
      const nodeId = action.payload;
      const originalNode = state.nodes.find(n => n.id === nodeId);
      
      if (originalNode) {
        const newNode = {
          ...originalNode,
          id: generateNodeId(originalNode.type),
          position: {
            x: originalNode.position.x + 50,
            y: originalNode.position.y + 50,
          },
          zIndex: state.maxZIndex + 1,
          connections: {
            inputs: [],
            outputs: [],
          },
        };
        
        state.nodes.push(newNode);
        state.maxZIndex += 1;
      }
    },
  },
});

// Export actions
export const {
  addNode,
  updateNode,
  updateNodePosition,
  deleteNode,
  selectNode,
  setDraggedNode,
  setDragOffset,
  clearDrag,
  updateCanvasPosition,
  setZoom,
  clearFlow,
  duplicateNode,
} = flowSlice.actions;

// Export reducer
export default flowSlice.reducer;
