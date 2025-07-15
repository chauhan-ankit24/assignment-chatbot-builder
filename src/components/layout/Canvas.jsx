import React, { useEffect, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { FiMinus, FiPlus, FiGrid } from 'react-icons/fi';
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
  setZoom,
  createConnection
} from '../../store/flowSlice';
import { DND_ITEM_TYPES } from '../../constants/dndTypes';
import TextNode from '../../nodes/TextNode';
import StartNode from '../../nodes/StartNode';
import EndNode from '../../nodes/EndNode';
import DraggableNode from '../../nodes/common/DraggableNode';
import ConnectionRenderer from '../ConnectionRenderer';
import Grid from '../Grid';
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
  
  // Grid state
  const [gridVisible, setGridVisible] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  
  // Canvas pan state
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  
  // Connection state
  const [connectionState, setConnectionState] = useState({
    isConnecting: false,
    sourceNodeId: null,
    isOutput: false,
    tempLine: null
  });

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
   * Reset zoom to default (1.0) and center canvas
   */
  const handleZoomReset = useCallback(() => {
    dispatch(setZoom(1.0));
    setPanOffset({ x: 0, y: 0 });
  }, [dispatch]);

  /**
   * Handle canvas panning start
   */
  const handlePanStart = useCallback((e) => {
    // Check if click is on empty canvas (not on a node)
    const isEmptyCanvas = e.target.classList.contains('canvas') || 
                         e.target.classList.contains('canvas-content') ||
                         e.target.classList.contains('grid-container') ||
                         e.target.classList.contains('major-grid') ||
                         e.target.classList.contains('minor-grid') ||
                         e.target.classList.contains('grid-dots');
    
    // Start panning with left click on empty canvas, middle click anywhere, or space+click
    if ((e.button === 0 && isEmptyCanvas) || e.button === 1 || e.spaceKey) {
      e.preventDefault();
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, []);

  /**
   * Handle canvas panning move
   */
  const handlePanMove = useCallback((e) => {
    if (isPanning) {
      e.preventDefault();
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, lastPanPoint]);

  /**
   * Handle canvas panning end
   */
  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  /**
   * Handle space key for panning mode
   */
  const [spacePressed, setSpacePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !spacePressed) {
        e.preventDefault();
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [spacePressed]);

  /**
   * Toggle grid visibility
   */
  const handleGridToggle = useCallback(() => {
    setGridVisible(!gridVisible);
  }, [gridVisible]);

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
          case 'g':
          case 'G':
            e.preventDefault();
            handleGridToggle();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleZoomReset, handleGridToggle]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [DND_ITEM_TYPES.NODE_FROM_SIDEBAR, DND_ITEM_TYPES.EXISTING_NODE],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvasRect = document.querySelector('.canvas-content').getBoundingClientRect();
      
      let position;
      
      if (item.nodeType && monitor.getItemType() === DND_ITEM_TYPES.NODE_FROM_SIDEBAR) {
        // Adding new node from sidebar - center it under cursor, accounting for pan offset
        position = {
          x: (clientOffset.x - canvasRect.left - panOffset.x) / currentZoom - 60, // Half node width
          y: (clientOffset.y - canvasRect.top - panOffset.y) / currentZoom - 30   // Half node height
        };
        dispatch(addNode({ nodeType: item.nodeType, position }));
      } else if (item.nodeId && monitor.getItemType() === DND_ITEM_TYPES.EXISTING_NODE) {
        // Moving existing node - use drag offset for precise positioning, accounting for pan offset
        const dragOffset = item.dragOffset || { x: 0, y: 0 };
        position = {
          x: (clientOffset.x - canvasRect.left - panOffset.x) / currentZoom - dragOffset.x,
          y: (clientOffset.y - canvasRect.top - panOffset.y) / currentZoom - dragOffset.y
        };
        dispatch(updateNodePosition({ nodeId: item.nodeId, position }));
      }

      return { moved: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [currentZoom, dispatch, panOffset]);

  /**
   * Handle connection start
   */
  const handleConnectionStart = useCallback((nodeId, isOutput) => {
    setConnectionState({
      isConnecting: true,
      sourceNodeId: nodeId,
      isOutput: isOutput,
      tempLine: null
    });
  }, []);

  /**
   * Handle connection end
   */
  const handleConnectionEnd = useCallback((targetNodeId) => {
    if (connectionState.isConnecting && connectionState.sourceNodeId && targetNodeId !== connectionState.sourceNodeId) {
      // Create connection based on direction
      if (connectionState.isOutput) {
        // Output to input connection
        dispatch(createConnection({
          sourceNodeId: connectionState.sourceNodeId,
          targetNodeId: targetNodeId
        }));
      } else {
        // Input to output connection (reverse)
        dispatch(createConnection({
          sourceNodeId: targetNodeId,
          targetNodeId: connectionState.sourceNodeId
        }));
      }
    }
    
    // Clear connection state
    setConnectionState({
      isConnecting: false,
      sourceNodeId: null,
      isOutput: false,
      tempLine: null
    });
  }, [connectionState, dispatch]);

  /**
   * Handle clicking on canvas to cancel connection or start panning
   */
  const handleCanvasClick = useCallback((e) => {
    if (connectionState.isConnecting) {
      e.stopPropagation();
      setConnectionState({
        isConnecting: false,
        sourceNodeId: null,
        isOutput: false,
        tempLine: null
      });
    }
  }, [connectionState]);

  /**
   * Handle mouse down on canvas
   */
  const handleMouseDown = useCallback((e) => {
    if (spacePressed) {
      handlePanStart({ ...e, spaceKey: true });
    } else {
      handlePanStart(e);
    }
  }, [spacePressed, handlePanStart]);

  return (
    <div 
      ref={drop}
      className={`canvas ${isOver && canDrop ? 'drag-over' : ''} ${connectionState.isConnecting ? 'connecting' : ''} ${spacePressed ? 'pan-mode' : ''}`}
      onClick={handleCanvasClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handlePanMove}
      onMouseUp={handlePanEnd}
      onMouseLeave={handlePanEnd}
      style={{ cursor: isPanning ? 'grabbing' : (spacePressed ? 'grab' : 'grab') }}
    >
      {/* Canvas Content with Zoom Transform and Pan Offset */}
      <div 
        className="canvas-content"
        style={{
          transform: `scale(${currentZoom}) translate(${panOffset.x / currentZoom}px, ${panOffset.y / currentZoom}px)`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Grid Background */}
        <Grid 
          zoom={currentZoom} 
          gridSize={gridSize} 
          visible={gridVisible} 
        />
        
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
            {/* Render connection lines */}
            <ConnectionRenderer nodes={nodes} zoom={currentZoom} />
            
            {/* Render nodes */}
            {nodes.map((node) => (
              <DraggableNode key={node.id} node={node}>
                {node.type === 'start' && (
                  <StartNode 
                    node={node} 
                    onConnectionStart={handleConnectionStart}
                    onConnectionEnd={handleConnectionEnd}
                  />
                )}
                {node.type === 'message' && (
                  <TextNode 
                    node={node} 
                    onConnectionStart={handleConnectionStart}
                    onConnectionEnd={handleConnectionEnd}
                  />
                )}
                {node.type === 'end' && (
                  <EndNode 
                    node={node} 
                    onConnectionStart={handleConnectionStart}
                    onConnectionEnd={handleConnectionEnd}
                  />
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
          title={`Reset View (Ctrl + 0) - Current: ${Math.round(currentZoom * 100)}%`}
        >
          <BiReset size={16} />
        </button>
        <div className="zoom-indicator">
          {Math.round(currentZoom * 100)}%
        </div>
        <button 
          className="zoom-btn zoom-in" 
          onClick={handleZoomIn}
          disabled={currentZoom >= 3}
          title="Zoom In (Ctrl + +)"
        >
          <FiPlus size={16} />
        </button>
        <button 
          className={`grid-toggle-btn ${gridVisible ? 'active' : ''}`}
          onClick={handleGridToggle}
          title="Toggle Grid (Ctrl + G)"
        >
          <FiGrid size={16} />
          Grid
        </button>
      </div>

      {/* Canvas Data Panel */}
      <div className="canvas-data-panel">
        <div className="data-item">
          <span className="data-label">Nodes:</span>
          <span className="data-value">{nodes.length}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Connections:</span>
          <span className="data-value">{nodes.reduce((total, node) => total + (node.connections?.outputs?.length || 0), 0)}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Start Nodes:</span>
          <span className="data-value">{nodes.filter(node => node.type === 'start').length}</span>
        </div>
        <div className="data-item">
          <span className="data-label">End Nodes:</span>
          <span className="data-value">{nodes.filter(node => node.type === 'end').length}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Message Nodes:</span>
          <span className="data-value">{nodes.filter(node => node.type === 'message').length}</span>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
