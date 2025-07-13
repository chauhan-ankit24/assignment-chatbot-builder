import React from 'react';
import { BiStopCircle } from 'react-icons/bi';
import './EndNode.css';

/**
 * EndNode Component
 * Renders an end node with simple UI
 */
const EndNode = ({ node }) => {
  return (
    <div className="end-node">
      <div className="end-node-header">
        <div className="end-node-icon">
          <BiStopCircle size={20} />
        </div>
        <span className="end-node-title">END</span>
      </div>
    </div>
  );
};

export default EndNode;
