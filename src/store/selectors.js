// Selectors for complex data transformations and computed values
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectFlow = (state) => state.flow;
export const selectUI = (state) => state.ui;

// Memoized selectors
export const selectNodes = createSelector(
  [selectFlow],
  (flow) => flow.nodes
);

export const selectNodeCount = createSelector(
  [selectNodes],
  (nodes) => nodes.length
);

export const selectConnectionCount = createSelector(
  [selectNodes],
  (nodes) => nodes.reduce((count, node) => 
    count + (node.connections?.outputs?.length || 0), 0
  )
);

export const selectNodesByType = createSelector(
  [selectNodes, (state, nodeType) => nodeType],
  (nodes, nodeType) => nodes.filter(node => node.type === nodeType)
);

export const selectNodeById = createSelector(
  [selectNodes, (state, nodeId) => nodeId],
  (nodes, nodeId) => nodes.find(node => node.id === nodeId)
);

export const selectConnectedNodes = createSelector(
  [selectNodes, (state, nodeId) => nodeId],
  (nodes, nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return [];
    
    const connectedIds = [
      ...(node.connections?.inputs || []),
      ...(node.connections?.outputs || [])
    ];
    
    return nodes.filter(n => connectedIds.includes(n.id));
  }
);

export const selectNodesSortedByZIndex = createSelector(
  [selectNodes],
  (nodes) => [...nodes].sort((a, b) => (a.zIndex || 1) - (b.zIndex || 1))
);

export const selectCanvasData = createSelector(
  [selectFlow],
  (flow) => ({
    nodes: flow.nodes,
    selectedNode: flow.selectedNode,
    draggedNode: flow.draggedNode,
    dragOffset: flow.dragOffset,
    canvasPosition: flow.canvasPosition,
    zoom: flow.zoom
  })
);

export const selectSidebarData = createSelector(
  [selectUI, selectNodeCount, selectConnectionCount],
  (ui, nodeCount, connectionCount) => ({
    isCollapsed: ui.isCollapsed,
    selectedNodeType: ui.selectedNodeType,
    isDragging: ui.isDragging,
    nodeCount,
    connectionCount
  })
);
