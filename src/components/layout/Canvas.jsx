import React, { useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
import { MdDesignServices } from 'react-icons/md';
import { useAppDispatch } from '../../store/hooks';
import { 
  useNodesSortedByZIndex,
  useZoom
} from '../../store/hooks';
import { 
  addNode, 
  updateNodePosition,
  setZoom
} from '../../store/flowSlice';
import { DND_ITEM_TYPES } from '../../constants/dndTypes';
import TextNode from '../../nodes/TextNode';
import StartNode from '../../nodes/StartNode';
import EndNode from '../../nodes/EndNode';
import DraggableNode from '../../nodes/common/DraggableNode';
import './Canvas.css';

/**
 * Canvas Component
 * 
 * Main canvas area for the flow builder where nodes can be dragged, dropped, and arranged.
 * Features:
 * - Drag and drop support for nodes
 * - Zoom in/out functionality with controls
 * - Keyboard shortcuts (Ctrl+Plus, Ctrl+Minus, Ctrl+0)
 * - Responsive design
 * - Grid background pattern
 */

const Canvas = () => {
  const dispatch = useAppDispatch();
  const nodes = useNodesSortedByZIndex(); // Use sorted nodes for proper layering
  const currentZoom = useZoom();

  /**
   * Handle zoom in functionality
   */
  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(3, currentZoom + 0.1);
    dispatch(setZoom(newZoom));
  }, [currentZoom, dispatch]);

  /**
   * Handle zoom out functionality
   */
  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(0.1, currentZoom - 0.1);
    dispatch(setZoom(newZoom));
  }, [currentZoom, dispatch]);

  /**
   * Reset zoom to default (1.0)
   */
  const handleZoomReset = useCallback(() => {
    dispatch(setZoom(1.0));
  }, [dispatch]);

  /**
   * Handle keyboard shortcuts for zoom
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '+':
          case '=':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleZoomReset();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleZoomReset]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [DND_ITEM_TYPES.NODE_FROM_SIDEBAR, DND_ITEM_TYPES.EXISTING_NODE],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvasRect = document.querySelector('.canvas').getBoundingClientRect();
      
      const position = {
        x: clientOffset.x - canvasRect.left - 175, // Center the node
        y: clientOffset.y - canvasRect.top - 100
      };

      if (item.nodeType && monitor.getItemType() === DND_ITEM_TYPES.NODE_FROM_SIDEBAR) {
        // Adding new node from sidebar
        dispatch(addNode({ nodeType: item.nodeType, position }));
      } else if (item.nodeId && monitor.getItemType() === DND_ITEM_TYPES.EXISTING_NODE) {
        // Moving existing node
        dispatch(updateNodePosition({ nodeId: item.nodeId, position }));
      }

      return { moved: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`canvas ${isOver && canDrop ? 'drag-over' : ''}`}
    >
      {/* Canvas Content with Zoom Transform */}
      <div 
        className="canvas-content"
        style={{
          transform: `scale(${currentZoom})`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
        }}
      >
        {nodes.length === 0 ? (
          <div className="canvas-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">
                <MdDesignServices size={60} />
              </div>
              <h3>Your Flow Canvas</h3>
              <p>Drag and drop nodes here to create your chatbot flow</p>
            </div>
          </div>
        ) : (
          <>
            {nodes.map((node) => (
              <DraggableNode key={node.id} node={node}>
                {node.type === 'start' && (
                  <StartNode node={node} />
                )}
                {node.type === 'message' && (
                  <TextNode node={node} />
                )}
                {node.type === 'end' && (
                  <EndNode node={node} />
                )}
              </DraggableNode>
            ))}
          </>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button 
          className="zoom-btn zoom-out" 
          onClick={handleZoomOut}
          disabled={currentZoom <= 0.1}
          title="Zoom Out (Ctrl + -)"
        >
          <FiMinus size={16} />
        </button>
        <button 
          className="zoom-btn zoom-reset" 
          onClick={handleZoomReset}
          title={`Reset Zoom (Ctrl + 0) - Current: ${Math.round(currentZoom * 100)}%`}
        >
          {Math.round(currentZoom * 100)}%
        </button>
        <button 
          className="zoom-btn zoom-in" 
          onClick={handleZoomIn}
          disabled={currentZoom >= 3}
          title="Zoom In (Ctrl + +)"
        >
          <FiPlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Canvas;
