/**
 * Navbar Component
 * 
 * Top navigation bar with branding, navigation links, and action buttons.
 * Provides consistent navigation across the application.
 */
import React from 'react';
import { SiChatbot } from 'react-icons/si';
import { useAppDispatch } from '../../store/hooks';
import { clearFlow } from '../../store/flowSlice';
import { useFlowStats } from '../../store/hooks';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { nodeCount } = useFlowStats();

  /**
   * Handle saving the current flow
   * In a real app, this would save to a backend service
   */
  const handleSaveFlow = () => {
    // TODO: Implement actual save functionality
    console.log('Saving flow...');
    // For now, just show a success message
    alert('Flow saved successfully!');
  };

  /**
   * Handle flow preview
   * Opens a preview of the current flow
   */
  const handlePreview = () => {
    // TODO: Implement preview functionality
    console.log('Opening preview...');
    alert('Preview feature coming soon!');
  };

  /**
   * Handle creating a new flow
   * Clears the current flow after confirmation
   */
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
    // TODO: Implement export functionality
    console.log('Exporting flow...');
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
