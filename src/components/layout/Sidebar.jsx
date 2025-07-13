import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useAppDispatch } from '../../store/hooks';
import { 
  useIsSidebarCollapsed, 
  useNodeCount, 
  useConnectionCount 
} from '../../store/hooks';
import { toggleSidebar } from '../../store/uiSlice';
import { nodeTypes } from '../../data/mockData';
import DraggableNodeItem from '../common/DraggableNodeItem';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isCollapsed = useIsSidebarCollapsed();
  const nodeCount = useNodeCount();
  const connectionCount = useConnectionCount();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3>{!isCollapsed && 'Flow Elements'}</h3>
        <button 
          className="collapse-btn"
          onClick={handleToggleSidebar}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <MdChevronRight size={20} /> : <MdChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="node-section">
          {!isCollapsed && <h4>Drag & Drop Nodes</h4>}
          <div className="node-list">
            {nodeTypes.map((node) => (
              <DraggableNodeItem
                key={node.id}
                node={node}
                isCollapsed={isCollapsed}
                nodeCount={nodeCount}
              />
            ))}
          </div>
        </div>

        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="flow-stats">
              <h4>Flow Statistics</h4>
              <div className="stat-item">
                <span>Nodes: {nodeCount}</span>
              </div>
              <div className="stat-item">
                <span>Connections: {connectionCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
