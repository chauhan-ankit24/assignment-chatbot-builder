import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../store/hooks';
import { 
  useNodesSortedByZIndex
} from '../../store/hooks';
import { 
  addNode, 
  updateNodePosition
} from '../../store/flowSlice';
import { DND_ITEM_TYPES } from '../../constants/dndTypes';
import TextNode from '../../nodes/TextNode';
import DraggableNode from '../../nodes/common/DraggableNode';
import './Canvas.css';

const Canvas = () => {
  const dispatch = useAppDispatch();
  const nodes = useNodesSortedByZIndex(); // Use sorted nodes for proper layering

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
            <DraggableNode key={node.id} node={node}>
              {node.type === 'message' && (
                <TextNode node={node} />
              )}
            </DraggableNode>
          ))}
        </>
      )}
    </div>
  );
};

export default Canvas;
