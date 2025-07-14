import React from 'react';
import { BiPlayCircle } from 'react-icons/bi';
import './StartNode.css';

/**
 * StartNode Component
 * Renders a start node with simple UI
 */
const StartNode = ({ node, onConnectionStart, onConnectionEnd }) => {
  const handleConnectionStart = (e, isOutput) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('StartNode: Connection start clicked', node.id);
    if (onConnectionStart) {
      onConnectionStart(node.id, isOutput);
    }
  };

  const handleConnectionEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('StartNode: Connection end clicked', node.id);
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
          console.log('StartNode: Mouse enter connection point');
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
