import React from 'react';
import './Grid.css';

/**
 * Grid Component
 * Renders a responsive grid background for the canvas
 */
const Grid = ({ zoom = 1, gridSize = 20, visible = true }) => {
  if (!visible) return null;

  // Calculate grid size based on zoom level
  const adjustedGridSize = gridSize * zoom;
  
  // Adjust grid visibility based on zoom level
  const minGridSize = 8; // Minimum visible grid size
  const maxGridSize = 100; // Maximum grid size before switching to major grid only
  
  const shouldShowMinorGrid = adjustedGridSize >= minGridSize && adjustedGridSize <= maxGridSize;
  const shouldShowMajorGrid = adjustedGridSize >= minGridSize / 2;
  
  // Calculate opacity based on zoom for better visibility
  const baseOpacity = Math.max(0.1, Math.min(0.4, (zoom - 0.3) * 0.8));
  const majorOpacity = Math.max(0.15, Math.min(0.6, (zoom - 0.2) * 0.7));
  
  // Create grid pattern
  const gridStyle = {
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, ${baseOpacity}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, ${baseOpacity}) 1px, transparent 1px)
    `,
    backgroundSize: `${adjustedGridSize}px ${adjustedGridSize}px`,
    backgroundPosition: '0 0, 0 0',
    position: 'absolute',
    top: `-${50 / zoom}%`,
    left: `-${50 / zoom}%`,
    width: `${200 / zoom}%`,
    height: `${200 / zoom}%`,
    pointerEvents: 'none',
    zIndex: 0,
  };

  // Add larger grid lines every 5 units
  const majorGridSize = adjustedGridSize * 5;
  const majorGridStyle = {
    ...gridStyle,
    backgroundImage: `
      linear-gradient(rgba(37, 211, 102, ${majorOpacity}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37, 211, 102, ${majorOpacity}) 1px, transparent 1px)
    `,
    backgroundSize: `${majorGridSize}px ${majorGridSize}px`,
  };

  return (
    <div className="grid-container">
      {/* Major grid lines */}
      {shouldShowMajorGrid && (
        <div style={majorGridStyle} className="major-grid" />
      )}
      
      {/* Minor grid lines */}
      {shouldShowMinorGrid && (
        <div style={gridStyle} className="minor-grid" />
      )}
      
      {/* Grid dots at intersections for better visibility at high zoom */}
      {zoom > 1.2 && adjustedGridSize > 40 && (
        <div 
          className="grid-dots"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: `${adjustedGridSize}px ${adjustedGridSize}px`,
            position: 'absolute',
            top: `-${50 / zoom}%`,
            left: `-${50 / zoom}%`,
            width: `${200 / zoom}%`,
            height: `${200 / zoom}%`,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: Math.max(0.1, Math.min(0.4, zoom - 1)),
          }}
        />
      )}
    </div>
  );
};

export default Grid;
