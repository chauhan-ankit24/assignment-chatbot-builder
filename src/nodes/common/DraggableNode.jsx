import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../constants/dndTypes';
import { useAppDispatch } from '../../store/hooks';
import { selectNode } from '../../store/flowSlice';

const DraggableNode = ({ children, node }) => {
  const dispatch = useAppDispatch();
  const nodeRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPES.EXISTING_NODE,
    item: (monitor) => {
      // Calculate the offset from the mouse position to the node's top-left corner
      const sourceClientOffset = monitor.getInitialClientOffset();
      const sourceOffset = monitor.getInitialSourceClientOffset();
      
      const dragOffset = {
        x: sourceClientOffset.x - sourceOffset.x,
        y: sourceClientOffset.y - sourceOffset.y
      };

      // Bring node to front when drag starts
      dispatch(selectNode(node.id));
      
      return {
        nodeId: node.id, 
        nodeType: node.type,
        initialPosition: node.position,
        dragOffset: dragOffset
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
      ref={(el) => {
        drag(el);
        nodeRef.current = el;
      }}
      onClick={handleClick}
      style={{
        opacity: isDragging ? 0.85 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'absolute',
        left: node.position.x,
        top: node.position.y,
        zIndex: isDragging ? 9999 : (node.zIndex || 1),
        transform: isDragging ? 'scale(1.01) rotate(0.5deg)' : 'none',
        transition: isDragging ? 'none' : 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default DraggableNode;
