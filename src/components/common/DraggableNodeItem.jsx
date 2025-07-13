import React from 'react';
import { useDrag } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../constants/dndTypes';
import { useAppDispatch } from '../../store/hooks';
import { addNode } from '../../store/flowSlice';
import { canvasSettings } from '../../data/mockData';

/**
 * DraggableNodeItem Component
 * 
 * Renders a draggable node item in the sidebar that can be dropped onto the canvas
 */
const DraggableNodeItem = ({ node, isCollapsed, nodeCount }) => {
  const dispatch = useAppDispatch();
  const IconComponent = node.icon;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPES.NODE_FROM_SIDEBAR,
    item: { nodeType: node.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [node.id]);

  const handleClick = () => {
    // Add node to center of canvas with some offset based on existing nodes
    const position = { 
      x: canvasSettings.defaultNodePosition.x, 
      y: canvasSettings.defaultNodePosition.y + (nodeCount * canvasSettings.nodeSpacing) 
    };
    dispatch(addNode({ nodeType: node.id, position }));
  };

  return (
    <div 
      ref={drag}
      className={`node-item ${isDragging ? 'dragging' : ''}`}
      onClick={handleClick}
      title={isCollapsed ? node.name : node.description}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <span className="node-icon">
        <IconComponent size={20} style={{ color: node.color }} />
      </span>
      {!isCollapsed && (
        <div className="node-info">
          <span className="node-name">{node.name}</span>
          <span className="node-desc">{node.description}</span>
        </div>
      )}
    </div>
  );
};

export default DraggableNodeItem;
