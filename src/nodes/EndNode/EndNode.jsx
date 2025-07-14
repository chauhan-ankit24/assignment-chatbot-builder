import React from 'react';
import { BiStopCircle } from 'react-icons/bi';
import './EndNode.css';

/**
 * EndNode Component
 * Renders an end node with simple UI
 */
const EndNode = ({ node, onConnectionStart, onConnectionEnd }) => {
  const handleConnectionStart = (e, isOutput) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('EndNode: Connection start clicked', node.id);
    if (onConnectionStart) {
      onConnectionStart(node.id, isOutput);
    }
  };

  const handleConnectionEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('EndNode: Connection end clicked', node.id);
    if (onConnectionEnd) {
      onConnectionEnd(node.id);
    }
  };

  return (
    <div className="end-node">
      <div className="end-node-header">
        <div className="end-node-icon">
          <BiStopCircle size={20} />
        </div>
        <span className="end-node-title">END</span>
      </div>
      
      {/* Connection points */}
      <div 
        className="connection-point input" 
        title="Input - Click to complete connection"
        onClick={(e) => handleConnectionEnd(e)}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onMouseEnter={(e) => {
          e.target.classList.add('active');
          console.log('EndNode: Mouse enter connection point');
        }}
        onMouseLeave={(e) => {
          e.target.classList.remove('active');
        }}
        style={{ 
          display: 'block',
          position: 'absolute',
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
      ></div>
    </div>
  );
};

export default EndNode;
