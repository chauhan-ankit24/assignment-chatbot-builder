import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { BiPlayCircle, BiTrash } from 'react-icons/bi';

const StartNodeComponent = ({ data, selected, onDeleteNode }) => {
  const handleDelete = () => {
    if (onDeleteNode) {
      onDeleteNode(data.id);
    }
  };

  return (
    <div className={`start-node-flow ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">
            <BiPlayCircle size={20} />
          </span>
          <span>START</span>
        </div>
        <div className="node-actions">
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete">
            <BiTrash size={16} />
          </button>
        </div>
      </div>
      
      <div className="node-content">
        {/* Minimal content for start node */}
      </div>

      {/* Connection Handles - Right Side (Output) */}
      <Handle
        type="source"
        position={Position.Right}
        id="output-top"
        className="connection-handle output-handle"
        style={{
          background: '#25d366',
          width: 12,
          height: 12,
          border: '2px solid #ffffff',
          right: -6,
          top: '30%',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output-bottom"
        className="connection-handle output-handle"
        style={{
          background: '#25d366',
          width: 12,
          height: 12,
          border: '2px solid #ffffff',
          right: -6,
          top: '70%',
        }}
      />
    </div>
  );
};

export default StartNodeComponent;
