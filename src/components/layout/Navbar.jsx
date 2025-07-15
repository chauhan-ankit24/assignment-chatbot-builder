import React from 'react';
import { SiChatbot } from 'react-icons/si';
import { useAppDispatch } from '../../store/hooks';
import { clearFlow } from '../../store/flowSlice';
import { useToast } from '../common/ToastProvider';
import './Navbar.css';

const Navbar = ({ nodes = [], edges = [] }) => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError, showInfo } = useToast();
  const nodeCount = nodes.length;

  const handleSaveFlow = () => {
    // Check if there are any nodes
    if (nodes.length === 0) {
      showError('Cannot save empty flow. Please add some nodes first.');
      return;
    }

    // Check for unconnected nodes
    const connectedNodeIds = new Set();
    
    // Add all nodes that are part of connections
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    // Find nodes that are not connected
    const unconnectedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));

    if (unconnectedNodes.length > 0) {
      const nodeNames = unconnectedNodes.map(node => node.data.label || node.type).join(', ');
      const message = unconnectedNodes.length === 1 
        ? `One node is not connected: ${nodeNames}. Please connect it before saving.`
        : `${unconnectedNodes.length} nodes are not connected: ${nodeNames}. Please connect them before saving.`;
      
      showError(message, 5000); // Show error for 5 seconds
      return;
    }

    // If validation passes, save the flow
    showSuccess('Flow saved successfully!');
  };

  /**
   * Handle flow preview
   * Opens a preview of the current flow
   */
  const handlePreview = () => {
    alert('Preview feature coming soon!');
  };

  const handleNewFlow = () => {
    if (nodeCount > 0) {
      const confirmed = window.confirm(
        'Are you sure you want to create a new flow? This will clear your current work.'
      );
      if (!confirmed) return;
    }
    
    dispatch(clearFlow());
  };

  /**
   * Handle exporting the flow
   * Exports the flow data in JSON format
   */
  const handleExport = () => {
    alert('Export feature coming soon!');
  };

  return (
    <nav className="navbar">
      {/* Brand section */}
      <div className="navbar-brand">
        <h1><SiChatbot size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Chatbot Flow Builder</h1>
        {nodeCount > 0 && (
          <span className="node-counter" title={`${nodeCount} nodes in flow`}>
            {nodeCount}
          </span>
        )}
      </div>

      {/* Navigation menu */}
      <div className="navbar-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button 
              className="nav-link nav-button" 
              onClick={handleNewFlow}
              title="Create new flow"
            >
              New
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link nav-button" 
              onClick={() => alert('Templates coming soon!')}
              title="Browse templates"
            >
              Templates
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link nav-button" 
              onClick={handleExport}
              title="Export flow"
            >
              Export
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link nav-button" 
              onClick={() => alert('Settings coming soon!')}
              title="Application settings"
            >
              Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="navbar-actions">
        <button 
          className="btn btn-secondary" 
          onClick={handlePreview}
          disabled={nodeCount === 0}
          title={nodeCount === 0 ? 'Add nodes to preview' : 'Preview flow'}
        >
          Preview
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleSaveFlow}
          disabled={nodeCount === 0}
          title={nodeCount === 0 ? 'Add nodes to save' : 'Save flow'}
        >
          Save Flow
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
