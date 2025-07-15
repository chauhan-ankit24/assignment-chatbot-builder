import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { BiStopCircle, BiTrash } from 'react-icons/bi';

const EndNodeComponent = ({ data, selected, onDeleteNode }) => {
  const handleDelete = () => {
    if (onDeleteNode) {
      onDeleteNode(data.id);
    }
  };

  return (
    <div className={`end-node-flow ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">
            <BiStopCircle size={20} />
          </span>
          <span>END</span>
        </div>
        <div className="node-actions">
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete">
            <BiTrash size={16} />
          </button>
        </div>
      </div>
      
      <div className="node-content">
        {/* Minimal content for end node */}
      </div>

      {/* Connection Handles - Left Side (Input) */}
      <Handle
        type="target"
        position={Position.Left}
        id="input-top"
        className="connection-handle input-handle"
        style={{
          background: '#dc3545',
          width: 12,
          height: 12,
          border: '2px solid #ffffff',
          left: -6,
          top: '30%',
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input-bottom"
        className="connection-handle input-handle"
        style={{
          background: '#dc3545',
          width: 12,
          height: 12,
          border: '2px solid #ffffff',
          left: -6,
          top: '70%',
        }}
      />
    </div>
  );
};

export default EndNodeComponent;
