import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import TextNode from './TextNode';
import './Canvas.css';

const Canvas = forwardRef(({ onNodeAdd }, ref) => {
  const [nodes, setNodes] = useState([]);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const addNode = useCallback((nodeType, position) => {
    const newNode = {
      id: `${nodeType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: nodeType,
      position,
      data: {
        message: nodeType === 'message' ? 'If you like this project, give it a star on GitHub! ⭐ and connect with me on LinkedIn 🚀. See top right corner or in bottom bar (mobile)' : ''
      }
    };
    
    setNodes(prev => [...prev, newNode]);
    onNodeAdd && onNodeAdd(newNode);
  }, [onNodeAdd]);

  // Expose addNode function to parent component
  useImperativeHandle(ref, () => ({
    addNode
  }), [addNode]);

  const updateNode = useCallback((nodeId, newData) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, ...newData } }
        : node
    ));
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
  }, []);

  const handleCanvasClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left - 175, // Center the node
        y: e.clientY - rect.top - 100
      };
      
      // For now, add a message node when clicking on canvas
      // Later this can be controlled by sidebar selection
      // addNode('message', position);
    }
  }, []);

  const handleMouseDown = useCallback((e, node) => {
    if (e.target.closest('.message-display') || e.target.closest('.edit-mode')) {
      return; // Don't drag when editing
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedNode(node.id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!draggedNode) return;
    
    const canvasRect = document.querySelector('.canvas').getBoundingClientRect();
    const newPosition = {
      x: e.clientX - canvasRect.left - dragOffset.x,
      y: e.clientY - canvasRect.top - dragOffset.y
    };
    
    setNodes(prev => prev.map(node => 
      node.id === draggedNode 
        ? { ...node, position: newPosition }
        : node
    ));
  }, [draggedNode, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  // Handle drop from sidebar
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType');
    
    if (nodeType) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left - 175, // Center the node
        y: e.clientY - rect.top - 100
      };
      
      addNode(nodeType, position);
    }
  }, [addNode]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div 
      className="canvas"
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {nodes.length === 0 ? (
        <div className="canvas-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-icon">🎨</div>
            <h3>Your Flow Canvas</h3>
            <p>Drag and drop nodes here to create your chatbot flow</p>
          </div>
        </div>
      ) : (
        <>
          {nodes.map((node) => (
            <div
              key={node.id}
              onMouseDown={(e) => handleMouseDown(e, node)}
            >
              {node.type === 'message' && (
                <TextNode
                  node={node}
                  onUpdate={updateNode}
                  onDelete={deleteNode}
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
});

export default Canvas;
