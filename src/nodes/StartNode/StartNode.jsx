import React from 'react';
import { BiPlayCircle } from 'react-icons/bi';
import './StartNode.css';

const StartNode = ({ node, onConnectionStart, onConnectionEnd }) => {
  const handleConnectionStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onConnectionStart) {
      onConnectionStart(node.id, true);
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
    <div className="start-node">
      <div className="start-node-header">
        <div className="start-node-icon">
          <BiPlayCircle size={20} />
        </div>
        <span className="start-node-title">START</span>
      </div>
      
      {/* Connection points */}
      <div 
        className="connection-point output" 
        title="Output - Click to start connection"
        onClick={(e) => handleConnectionStart(e, true)}
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

export default StartNode;
