/**
 * Redux Selectors - Memoized selectors for efficient state access
 * 
 * This file contains memoized selectors using createSelector from Redux Toolkit.
 * These selectors help avoid unnecessary re-computations and re-renders.
 */
import { createSelector } from '@reduxjs/toolkit';

/**
 * Basic selectors for accessing main state slices
 */
export const selectFlow = (state) => state.flow;
export const selectUI = (state) => state.ui;

/**
 * Flow-related selectors
 */
export const selectNodes = createSelector(
  [selectFlow],
  (flow) => flow.nodes
);

export const selectSelectedNode = createSelector(
  [selectFlow],
  (flow) => flow.selectedNode
);

export const selectDraggedNode = createSelector(
  [selectFlow],
  (flow) => flow.draggedNode
);

export const selectCanvasPosition = createSelector(
  [selectFlow],
  (flow) => flow.canvasPosition
);

export const selectZoom = createSelector(
  [selectFlow],
  (flow) => flow.zoom
);

/**
 * Computed selectors for derived state
 */
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

/**
 * Parameterized selectors (require additional parameters)
 */
export const selectNodesByType = createSelector(
  [selectNodes, (state, nodeType) => nodeType],
  (nodes, nodeType) => nodes.filter(node => node.type === nodeType)
);

export const selectNodeById = createSelector(
  [selectNodes, (state, nodeId) => nodeId],
  (nodes, nodeId) => nodes.find(node => node.id === nodeId)
);

/**
 * Get nodes connected to a specific node
 */
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

/**
 * Get nodes sorted by z-index for proper rendering order
 */
export const selectNodesSortedByZIndex = createSelector(
  [selectNodes],
  (nodes) => [...nodes].sort((a, b) => (a.zIndex || 1) - (b.zIndex || 1))
);

/**
 * Complex selectors for component props
 */
export const selectCanvasData = createSelector(
  [selectFlow],
  (flow) => ({
    nodes: flow.nodes,
    selectedNode: flow.selectedNode,
    draggedNode: flow.draggedNode,
    dragOffset: flow.dragOffset,
    canvasPosition: flow.canvasPosition,
    zoom: flow.zoom,
  })
);

export const selectSidebarData = createSelector(
  [selectUI, selectNodeCount, selectConnectionCount],
  (ui, nodeCount, connectionCount) => ({
    isCollapsed: ui.isCollapsed,
    selectedNodeType: ui.selectedNodeType,
    isDragging: ui.isDragging,
    nodeCount,
    connectionCount,
  })
);

/**
 * UI-related selectors
 */
export const selectIsSidebarCollapsed = createSelector(
  [selectUI],
  (ui) => ui.isCollapsed
);

export const selectTheme = createSelector(
  [selectUI],
  (ui) => ui.theme
);

export const selectShowSettings = createSelector(
  [selectUI],
  (ui) => ui.showSettings
);
