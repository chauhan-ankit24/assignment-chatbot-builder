import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { BiMessageRounded, BiMobile, BiExpandAlt, BiCog, BiTrash } from 'react-icons/bi';

const TextNodeComponent = ({ data, selected, onUpdateNode, onDeleteNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(data.message || 'Click to add message...');

  const handleSave = () => {
    if (onUpdateNode) {
      onUpdateNode(data.id, { message });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setMessage(data.message || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDeleteNode) {
      onDeleteNode(data.id);
    }
  };

  return (
    <div className={`text-node-flow ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">
            <BiMessageRounded size={16} />
          </span>
          <span>TEXT MESSAGE</span>
        </div>
        <div className="node-actions">
          <button className="action-btn whatsapp-btn" title="WhatsApp">
            <BiMobile size={16} />
          </button>
          <button className="action-btn resize-btn" title="Resize">
            <BiExpandAlt size={16} />
          </button>
          <button className="action-btn settings-btn" title="Settings">
            <BiCog size={16} />
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete">
            <BiTrash size={16} />
          </button>
        </div>
      </div>
      
      <div className="node-content">
        <div className="message-section">
          <label>Message Content</label>
          {isEditing ? (
            <div className="edit-mode">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows={4}
              />
              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="message-display" onClick={() => setIsEditing(true)}>
              {message || 'Click to add message...'}
            </div>
          )}
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
          background: '#25d366',
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
          background: '#25d366',
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

export default TextNodeComponent;
