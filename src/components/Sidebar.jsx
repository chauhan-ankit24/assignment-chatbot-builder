import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onNodeClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [nodeCount, setNodeCount] = useState(0);

  const nodeTypes = [
    { id: 'message', name: 'Message Node', icon: '💬', description: 'Send a message to user' },
    { id: 'question', name: 'Question Node', icon: '❓', description: 'Ask user a question' },
    { id: 'condition', name: 'Condition Node', icon: '🔀', description: 'Add conditional logic' },
    { id: 'action', name: 'Action Node', icon: '⚡', description: 'Perform an action' },
    { id: 'input', name: 'Input Node', icon: '📝', description: 'Collect user input' },
    { id: 'api', name: 'API Call', icon: '🌐', description: 'Make external API call' },
    { id: 'delay', name: 'Delay Node', icon: '⏱️', description: 'Add time delay' },
    { id: 'end', name: 'End Node', icon: '🏁', description: 'End conversation' }
  ];

  const handleNodeClick = (nodeType) => {
    // Add node to center of canvas
    const position = { x: 200, y: 200 + (nodeCount * 50) };
    onNodeClick && onNodeClick(nodeType, position);
    setNodeCount(prev => prev + 1);
  };

  const handleDragStart = (e, nodeType) => {
    e.dataTransfer.setData('nodeType', nodeType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3>{!isCollapsed && 'Flow Elements'}</h3>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="node-section">
          {!isCollapsed && <h4>Drag & Drop Nodes</h4>}
          <div className="node-list">
            {nodeTypes.map((node) => (
              <div 
                key={node.id}
                className="node-item"
                draggable="true"
                onClick={() => handleNodeClick(node.id)}
                onDragStart={(e) => handleDragStart(e, node.id)}
                title={isCollapsed ? node.name : node.description}
              >
                <span className="node-icon">{node.icon}</span>
                {!isCollapsed && (
                  <div className="node-info">
                    <span className="node-name">{node.name}</span>
                    <span className="node-desc">{node.description}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="flow-stats">
              <h4>Flow Statistics</h4>
              <div className="stat-item">
                <span>Nodes: {nodeCount}</span>
              </div>
              <div className="stat-item">
                <span>Connections: 0</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
