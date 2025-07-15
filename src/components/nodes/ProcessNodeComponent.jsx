import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { BiCog, BiTrash } from 'react-icons/bi';

const ProcessNodeComponent = ({ data, selected, onUpdateNode, onDeleteNode }) => {
  const handleDelete = () => {
    if (onDeleteNode) {
      onDeleteNode(data.id);
    }
  };

  return (
    <div className={`process-node-flow ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">
            <BiCog size={20} />
          </span>
          <span>PROCESS</span>
        </div>
        <div className="node-actions">
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete">
            <BiTrash size={16} />
          </button>
        </div>
      </div>
      
      <div className="node-content">
        <div className="process-info">
          <p>{data.description || 'Process user input and perform actions'}</p>
        </div>
        
        <div className="node-info">
          <p className="node-id">
            Node: <span>#{data.id || 'N/A'}</span>
          </p>
        </div>
      </div>

      {/* Connection Handles - Left Side (Input) */}
      <Handle
        type="target"
        position={Position.Left}
        id="input-top"
        className="connection-handle input-handle"
        style={{
          background: '#ffc107',
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
          background: '#ffc107',
          width: 12,
          height: 12,
          border: '2px solid #ffffff',
          left: -6,
          top: '70%',
        }}
      />
      
      {/* Connection Handles - Right Side (Output) */}
      <Handle
        type="source"
        position={Position.Right}
        id="output-top"
        className="connection-handle output-handle"
        style={{
          background: '#ffc107',
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
          background: '#ffc107',
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

export default ProcessNodeComponent;
