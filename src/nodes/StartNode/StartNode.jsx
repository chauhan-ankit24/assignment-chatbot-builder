import React from 'react';
import { BiPlayCircle } from 'react-icons/bi';
import './StartNode.css';

/**
 * StartNode Component
 * Renders a start node with simple UI
 */
const StartNode = ({ node }) => {
  return (
    <div className="start-node">
      <div className="start-node-header">
        <div className="start-node-icon">
          <BiPlayCircle size={20} />
        </div>
        <span className="start-node-title">START</span>
      </div>
    </div>
  );
};

export default StartNode;
