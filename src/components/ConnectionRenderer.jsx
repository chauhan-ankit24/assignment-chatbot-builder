import React from 'react';
import ConnectionLine from './ConnectionLine';

/**
 * ConnectionRenderer Component
 * Renders all connections between nodes
 */
const ConnectionRenderer = ({ nodes, zoom = 1 }) => {
  const connections = [];

  // Generate connection lines for all nodes
  nodes.forEach(node => {
    if (node.connections && node.connections.outputs) {
      node.connections.outputs.forEach(targetNodeId => {
        const targetNode = nodes.find(n => n.id === targetNodeId);
        if (targetNode) {
          connections.push({
            id: `${node.id}-${targetNodeId}`,
            sourceNode: node,
            targetNode: targetNode
          });
        }
      });
    }
  });

  return (
    <div className="connection-renderer" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 2
    }}>
      {connections.map(connection => (
        <ConnectionLine
          key={connection.id}
          sourceNode={connection.sourceNode}
          targetNode={connection.targetNode}
          zoom={zoom}
        />
      ))}
    </div>
  );
};

export default ConnectionRenderer;
