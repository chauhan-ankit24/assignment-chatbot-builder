import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { BiPlayCircle, BiStopCircle, BiMessageDetail, BiCog } from 'react-icons/bi';
import { useAppDispatch, useIsSidebarCollapsed } from '../store/hooks';
import { toggleSidebar } from '../store/uiSlice';
import './NewSidebar.css';

const nodeTypes = [
  {
    id: 'startNode',
    type: 'startNode',
    label: 'Start Node',
    icon: BiPlayCircle,
    color: '#25d366',
    description: 'Beginning of the flow',
  },
  {
    id: 'textNode',
    type: 'textNode',
    label: 'Text Message',
    icon: BiMessageDetail,
    color: '#007bff',
    description: 'Send a text message',
  },
  {
    id: 'processNode',
    type: 'processNode',
    label: 'Process',
    icon: BiCog,
    color: '#ffc107',
    description: 'Process user input',
  },
  {
    id: 'endNode',
    type: 'endNode',
    label: 'End Node',
    icon: BiStopCircle,
    color: '#dc3545',
    description: 'End of the flow',
  },
];

const NewSidebar = ({ selectedNode, onUpdateNode, onDeleteNode }) => {
  const dispatch = useAppDispatch();
  const isCollapsed = useIsSidebarCollapsed();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={`new-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3>{!isCollapsed && 'Flow Elements'}</h3>
        <button
          className="collapse-btn"
          onClick={handleToggleSidebar}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <MdKeyboardArrowRight size={22} />
          ) : (
            <MdKeyboardArrowLeft size={22} />
          )}
        </button>
      </div>

      <div className="sidebar-content">
        {/* Node Properties Section */}
        {selectedNode && !isCollapsed && (
          <div className="properties-section">
            <h4>Node Properties</h4>
            <div className="properties-content">
              <div className="property-group">
                <label>Node ID:</label>
                <input
                  type="text"
                  value={selectedNode.id}
                  disabled
                  className="property-input disabled"
                />
              </div>
              <div className="property-group">
                <label>Type:</label>
                <input
                  type="text"
                  value={selectedNode.type}
                  disabled
                  className="property-input disabled"
                />
              </div>
              {selectedNode.type === 'textNode' && (
                <div className="property-group">
                  <label>Message:</label>
                  <textarea
                    value={selectedNode.data.message || ''}
                    onChange={(e) => onUpdateNode(selectedNode.id, { message: e.target.value })}
                    className="property-textarea"
                    rows={3}
                    placeholder="Enter your message..."
                  />
                </div>
              )}
              {selectedNode.type === 'processNode' && (
                <div className="property-group">
                  <label>Description:</label>
                  <textarea
                    value={selectedNode.data.description || ''}
                    onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
                    className="property-textarea"
                    rows={3}
                    placeholder="Enter process description..."
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nodes Section */}
        <div className="node-section">
          {!isCollapsed && <h4>Drag & Drop Nodes</h4>}
          <div className="node-list">
            {nodeTypes.map((node) => {
              const IconComponent = node.icon;
              return (
                <div
                  key={node.id}
                  className={`draggable-node ${isCollapsed ? 'collapsed' : ''}`}
                  draggable
                  onDragStart={(event) => onDragStart(event, node.type)}
                  title={isCollapsed ? node.label : node.description}
                >
                  <div className="node-icon" style={{ color: node.color }}>
                    <IconComponent size={20} />
                  </div>
                  {!isCollapsed && (
                    <div className="node-info">
                      <span className="node-name">{node.label}</span>
                      <span className="node-desc">{node.description}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSidebar;
