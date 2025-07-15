import React from 'react';
import { BiStopCircle } from 'react-icons/bi';
import './EndNode.css';

const EndNode = ({ node, onConnectionStart, onConnectionEnd }) => {
  const handleConnectionStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onConnectionStart) {
      onConnectionStart(node.id, false);
    }
  };

  const handleConnectionEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
