import { useSelector, useDispatch } from 'react-redux';
import { 
  selectNodes, 
  selectNodeCount, 
  selectConnectionCount,
  selectNodeById,
  selectNodesByType,
  selectNodesSortedByZIndex 
} from './selectors';

// Custom hooks for typed Redux usage
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);

// Flow selectors
export const useNodes = () => useAppSelector(selectNodes);
export const useSelectedNode = () => useAppSelector(state => state.flow.selectedNode);
export const useDraggedNode = () => useAppSelector(state => state.flow.draggedNode);
export const useDragOffset = () => useAppSelector(state => state.flow.dragOffset);
export const useCanvasPosition = () => useAppSelector(state => state.flow.canvasPosition);
export const useZoom = () => useAppSelector(state => state.flow.zoom);
export const useMaxZIndex = () => useAppSelector(state => state.flow.maxZIndex);

// UI selectors
export const useIsSidebarCollapsed = () => useAppSelector(state => state.ui.isCollapsed);
export const useSelectedNodeType = () => useAppSelector(state => state.ui.selectedNodeType);
export const useIsDragging = () => useAppSelector(state => state.ui.isDragging);
export const useShowSettings = () => useAppSelector(state => state.ui.showSettings);
export const useTheme = () => useAppSelector(state => state.ui.theme);

// Computed selectors using memoized selectors
export const useNodeCount = () => useAppSelector(selectNodeCount);
export const useConnectionCount = () => useAppSelector(selectConnectionCount);
export const useNodeById = (nodeId) => useAppSelector(state => selectNodeById(state, nodeId));
export const useNodesByType = (nodeType) => useAppSelector(state => selectNodesByType(state, nodeType));
export const useNodesSortedByZIndex = () => useAppSelector(selectNodesSortedByZIndex);
