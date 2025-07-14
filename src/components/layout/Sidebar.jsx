import React from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useAppDispatch } from "../../store/hooks";
import { useIsSidebarCollapsed } from "../../store/hooks";
import { toggleSidebar } from "../../store/uiSlice";
import { nodeTypes } from "../../data/mockData";
import DraggableNodeItem from "../common/DraggableNodeItem";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isCollapsed = useIsSidebarCollapsed();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h3>{!isCollapsed && "Flow Elements"}</h3>
        <button
          className="collapse-btn"
          onClick={handleToggleSidebar}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <MdKeyboardArrowRight size={22} />
          ) : (
            <MdKeyboardArrowLeft size={22} />
          )}
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
