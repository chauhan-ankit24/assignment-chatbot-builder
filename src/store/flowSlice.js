import { createSlice } from '@reduxjs/toolkit';
import { defaultMessages } from '../data/mockData';

const initialState = {
  nodes: [],
  selectedNode: null,
  draggedNode: null,
  dragOffset: { x: 0, y: 0 },
  canvasPosition: { x: 0, y: 0 },
  zoom: 1,
  maxZIndex: 1
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { nodeType, position } = action.payload;
      const newNode = {
        id: `${nodeType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: nodeType,
        position,
        zIndex: state.maxZIndex + 1,
        data: {
          message: defaultMessages[nodeType] || '',
          title: '',
          options: [],
          conditions: [],
          actions: []
        },
        connections: {
          inputs: [],
          outputs: []
        }
      };
      state.nodes.push(newNode);
      state.maxZIndex += 1;
    },

    updateNode: (state, action) => {
      const { nodeId, data } = action.payload;
      const node = state.nodes.find(n => n.id === nodeId);
      if (node) {
        node.data = { ...node.data, ...data };
      }
    },

    updateNodePosition: (state, action) => {
      const { nodeId, position } = action.payload;
      const node = state.nodes.find(n => n.id === nodeId);
      if (node) {
        node.position = position;
      }
    },

    deleteNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter(n => n.id !== nodeId);
      // Clear selection if deleted node was selected
      if (state.selectedNode === nodeId) {
        state.selectedNode = null;
      }
    },

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

    setDraggedNode: (state, action) => {
      state.draggedNode = action.payload;
    },

    setDragOffset: (state, action) => {
      state.dragOffset = action.payload;
    },

    clearDrag: (state) => {
      state.draggedNode = null;
      state.dragOffset = { x: 0, y: 0 };
    },

    updateCanvasPosition: (state, action) => {
      state.canvasPosition = action.payload;
    },

    setZoom: (state, action) => {
      state.zoom = action.payload;
    },

    clearFlow: (state) => {
      state.nodes = [];
      state.selectedNode = null;
      state.draggedNode = null;
      state.dragOffset = { x: 0, y: 0 };
      state.maxZIndex = 1;
    },

    duplicateNode: (state, action) => {
      const nodeId = action.payload;
      const originalNode = state.nodes.find(n => n.id === nodeId);
      if (originalNode) {
        const newNode = {
          ...originalNode,
          id: `${originalNode.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          position: {
            x: originalNode.position.x + 50,
            y: originalNode.position.y + 50
          },
          zIndex: state.maxZIndex + 1,
          connections: {
            inputs: [],
            outputs: []
          }
        };
        state.nodes.push(newNode);
        state.maxZIndex += 1;
      }
    }
  }
});

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
  duplicateNode
} = flowSlice.actions;

export default flowSlice.reducer;
