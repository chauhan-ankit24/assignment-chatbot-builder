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
const DraggableNodeItem = ({ node, isCollapsed }) => {
  const dispatch = useAppDispatch();
  const IconComponent = node.icon;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPES.NODE_FROM_SIDEBAR,
    item: { nodeType: node.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) {
        // If dropped outside canvas, add to default position
        const position = { 
          x: canvasSettings.defaultNodePosition.x, 
          y: canvasSettings.defaultNodePosition.y
        };
        dispatch(addNode({ nodeType: item.nodeType, position }));
      }
    }
  }), [node.id, dispatch]);

  const handleClick = () => {
    // Add node to center of canvas
    const position = { 
      x: canvasSettings.defaultNodePosition.x, 
      y: canvasSettings.defaultNodePosition.y
    };
    dispatch(addNode({ nodeType: node.id, position }));
  };

  return (
    <div 
      ref={drag}
      className={`node-item ${isDragging ? 'dragging' : ''} ${isCollapsed ? 'collapsed' : ''}`}
      onClick={handleClick}
      title={node.description}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="node-icon">
        <IconComponent size={isCollapsed ? 18 : 20} style={{ color: node.color }} />
      </div>
      {!isCollapsed && (
        <span className="node-name">{node.name}</span>
      )}
    </div>
  );
};

export default DraggableNodeItem;
