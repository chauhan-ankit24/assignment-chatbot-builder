import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ReactFlowProvider } from '@xyflow/react';
import { store } from './store';
import { useIsSidebarCollapsed } from './store/hooks';
import { ToastProvider } from './components/common/ToastProvider';
import Navbar from './components/layout/Navbar';
import FlowBuilder from './components/FlowBuilder';
import NewSidebar from './components/NewSidebar';
import './App.css';

const AppContent = () => {
  const isCollapsed = useIsSidebarCollapsed();
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleCanvasClick = () => {
    setSelectedNode(null);
  };

  const handleUpdateNode = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  };

  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  };
  
  return (
    <div className="app">
      <Navbar nodes={nodes} edges={edges} />
      <div className="app-content">
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <ReactFlowProvider>
            <FlowBuilder 
              onNodeClick={handleNodeClick}
              onCanvasClick={handleCanvasClick}
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              onUpdateNode={handleUpdateNode}
              onDeleteNode={handleDeleteNode}
            />
          </ReactFlowProvider>
        </div>
        <NewSidebar 
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
        />
      </div>
    </div>
  );
};

const NewApp = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Provider>
  );
};

export default NewApp;
