import React from 'react';
import { useDrag } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../constants/dndTypes';
import { useAppDispatch } from '../../store/hooks';
import { selectNode } from '../../store/flowSlice';

const DraggableNode = ({ children, node }) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPES.EXISTING_NODE,
    item: () => {
      // Bring node to front when drag starts
      dispatch(selectNode(node.id));
      return {
        nodeId: node.id, 
        nodeType: node.type,
        initialPosition: node.position 
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // Handle drop result if needed
      }
    },
  }), [dispatch, node.id, node.type, node.position]);

  const handleClick = (e) => {
    if (e.target.closest('.message-display') || e.target.closest('.edit-mode')) {
      return; // Don't select when editing
    }
    dispatch(selectNode(node.id));
  };

  return (
    <div 
      ref={drag}
      onClick={handleClick}
      style={{
        opacity: isDragging ? 0.8 : 1,
        cursor: isDragging ? 'grabbing' : 'move',
        position: 'absolute',
        left: node.position.x,
        top: node.position.y,
        zIndex: isDragging ? 9999 : (node.zIndex || 1),
        transform: isDragging ? 'scale(1.02) rotate(1deg)' : 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
    >
      {children}
    </div>
  );
};

export default DraggableNode;
