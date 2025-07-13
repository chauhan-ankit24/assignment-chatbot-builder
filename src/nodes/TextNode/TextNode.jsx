import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useSelectedNode } from '../../store/hooks';
import { updateNode, deleteNode } from '../../store/flowSlice';
import './TextNode.css';

const TextNode = ({ node }) => {
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(node.data.message || 'If you like this project, give it a star on GitHub! ⭐ and connect with me on LinkedIn 🚀. See top right corner or in bottom bar (mobile)');

  const isSelected = selectedNode === node.id;

  const handleSave = () => {
    dispatch(updateNode({ nodeId: node.id, data: { message } }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setMessage(node.data.message || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteNode(node.id));
  };

  return (
    <div className={`text-node ${isSelected ? 'selected' : ''}`}>
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">💬</span>
          <span>TEXT MESSAGE</span>
        </div>
        <div className="node-actions">
          <button className="action-btn whatsapp-btn" title="WhatsApp">
            <span>📱</span>
          </button>
          <button className="action-btn resize-btn" title="Resize">
            <span>◇</span>
          </button>
          <button className="action-btn settings-btn" title="Settings">
            <span>⚙️</span>
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete">
            <span>🗑️</span>
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
          <p className="channel-info">
            This message will be sent to the user using the <strong>"WhatsApp"</strong> channel.
          </p>
          <p className="node-id">
            Node: <span>#{node.id}</span>
          </p>
        </div>
      </div>
      
      {/* Connection points */}
      <div className="connection-point input" title="Input"></div>
      <div className="connection-point output" title="Output"></div>
    </div>
  );
};

export default TextNode;
