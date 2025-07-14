import React from 'react';
import './ConnectionLine.css';

/**
 * ConnectionLine Component
 * Renders a connection line between two nodes
 */
const ConnectionLine = ({ sourceNode, targetNode, zoom = 1 }) => {
  if (!sourceNode || !targetNode) return null;

  // Calculate connection points based on node types
  const getNodeDimensions = (node) => {
    switch (node.type) {
      case 'start':
      case 'end':
        return { width: 120, height: 60 };
      case 'message':
        return { width: 350, height: 200 }; // Approximate height
      default:
        return { width: 120, height: 60 };
    }
  };

  const sourceDimensions = getNodeDimensions(sourceNode);
  const targetDimensions = getNodeDimensions(targetNode);

  // Calculate connection points
  const sourceX = sourceNode.position.x + sourceDimensions.width; // Right edge for output
  const sourceY = sourceNode.position.y + sourceDimensions.height / 2; // Center height
  const targetX = targetNode.position.x; // Left edge for input
  const targetY = targetNode.position.y + targetDimensions.height / 2; // Center height

  // Calculate control points for smooth curve
  const controlOffset = Math.abs(sourceX - targetX) * 0.3;
  const controlX1 = sourceX + controlOffset;
  const controlX2 = targetX - controlOffset;

  const pathData = `M ${sourceX} ${sourceY} C ${controlX1} ${sourceY}, ${controlX2} ${targetY}, ${targetX} ${targetY}`;

  // Debug logging
  console.log('ConnectionLine - Path data:', pathData);
  console.log('ConnectionLine - Source:', { x: sourceX, y: sourceY });
  console.log('ConnectionLine - Target:', { x: targetX, y: targetY });

  return (
    <svg 
      className="connection-line-svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'visible'
      }}
    >
      <defs>
        <marker
          id={`arrowhead-${sourceNode.id}-${targetNode.id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="rgba(37, 211, 102, 0.8)"
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="rgba(37, 211, 102, 0.8)"
        strokeWidth="2"
        fill="none"
        markerEnd={`url(#arrowhead-${sourceNode.id}-${targetNode.id})`}
        className="connection-path"
      />
    </svg>
  );
};

export default ConnectionLine;
