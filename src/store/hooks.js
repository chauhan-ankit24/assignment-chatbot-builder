import { useSelector, useDispatch } from 'react-redux';
import { 
  selectNodes, 
  selectNodeCount, 
  selectConnectionCount,
  selectNodeById,
  selectNodesByType,
  selectNodesSortedByZIndex,
  selectIsSidebarCollapsed,
  selectTheme,
  selectShowSettings,
} from './selectors';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);

// Flow-related hooks
export const useNodes = () => useAppSelector(selectNodes);
export const useSelectedNode = () => useAppSelector(state => state.flow.selectedNode);
export const useDraggedNode = () => useAppSelector(state => state.flow.draggedNode);
export const useDragOffset = () => useAppSelector(state => state.flow.dragOffset);
export const useCanvasPosition = () => useAppSelector(state => state.flow.canvasPosition);
export const useZoom = () => useAppSelector(state => state.flow.zoom);
export const useMaxZIndex = () => useAppSelector(state => state.flow.maxZIndex);

// UI-related hooks
export const useIsSidebarCollapsed = () => useAppSelector(selectIsSidebarCollapsed);
export const useSelectedNodeType = () => useAppSelector(state => state.ui.selectedNodeType);
export const useIsDragging = () => useAppSelector(state => state.ui.isDragging);
export const useShowSettings = () => useAppSelector(selectShowSettings);
export const useTheme = () => useAppSelector(selectTheme);

// Computed state hooks
export const useNodeCount = () => useAppSelector(selectNodeCount);
export const useConnectionCount = () => useAppSelector(selectConnectionCount);
export const useNodeById = (nodeId) => useAppSelector(state => selectNodeById(state, nodeId));
export const useNodesByType = (nodeType) => useAppSelector(state => selectNodesByType(state, nodeType));
export const useNodesSortedByZIndex = () => useAppSelector(selectNodesSortedByZIndex);

/**
 * Convenience hooks for common operations
 */
export const useFlowStats = () => {
  const nodeCount = useNodeCount();
  const connectionCount = useConnectionCount();
  
  return {
    nodeCount,
    connectionCount,
    isEmpty: nodeCount === 0,
  };
};

export const useCanvasState = () => {
  const position = useCanvasPosition();
  const zoom = useZoom();
  const selectedNode = useSelectedNode();
  const draggedNode = useDraggedNode();
  
  return {
    position,
    zoom,
    selectedNode,
    draggedNode,
    hasSelection: selectedNode !== null,
    isDragging: draggedNode !== null,
  };
};
