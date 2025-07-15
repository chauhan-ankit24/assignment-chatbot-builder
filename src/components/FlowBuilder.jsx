import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from '../data/mockData';
import TextNodeComponent from './nodes/TextNodeComponent';
import StartNodeComponent from './nodes/StartNodeComponent';
import EndNodeComponent from './nodes/EndNodeComponent';
import ProcessNodeComponent from './nodes/ProcessNodeComponent';
import CustomEdge from './edges/CustomEdge';
import './FlowBuilder.css';
import './nodes/CustomNodes.css';
import './edges/CustomEdge.css';

// Define custom node types for React Flow
const nodeTypeComponents = {
  textNode: TextNodeComponent,
  startNode: StartNodeComponent,
  endNode: EndNodeComponent,
  processNode: ProcessNodeComponent,
};

// Define custom edge types
const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [
  {
    id: '1',
    type: 'startNode',
    position: { x: 100, y: 100 },
    data: { id: '1', label: 'Start' },
  },
  {
    id: '2',
    type: 'textNode',
    position: { x: 350, y: 100 },
    data: { id: '2', label: 'Text Message', message: 'Welcome! How can I help you?' },
  },
  {
    id: '3',
    type: 'processNode',
    position: { x: 600, y: 50 },
    data: { id: '3', label: 'Process', description: 'Process user input' },
  },
  {
    id: '4',
    type: 'endNode',
    position: { x: 850, y: 100 },
    data: { id: '4', label: 'End' },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'output-top',
    targetHandle: 'input-top',
    type: 'custom',
    animated: true,
    style: { stroke: '#25d366', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#25d366' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'output-bottom',
    targetHandle: 'input-bottom',
    type: 'custom',
    animated: true,
    style: { stroke: '#25d366', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#25d366' },
  },
];

const FlowBuilder = ({ onNodeClick, onCanvasClick, nodes, setNodes, edges, setEdges, onUpdateNode, onDeleteNode }) => {
  const [nodesState, setNodesState, onNodesChange] = useNodesState(nodes && nodes.length > 0 ? nodes : initialNodes);
  const [edgesState, setEdgesState, onEdgesChange] = useEdgesState(edges && edges.length > 0 ? edges : initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Initialize parent state with initial nodes/edges if empty
  React.useEffect(() => {
    if ((!nodes || nodes.length === 0) && setNodes && nodesState.length > 0) {
      setNodes(nodesState);
    }
    if ((!edges || edges.length === 0) && setEdges && edgesState.length > 0) {
      setEdges(edgesState);
    }
  }, []);

  // Only sync FROM ReactFlow TO parent (one way)
  React.useEffect(() => {
    if (setNodes) setNodes(nodesState);
  }, [nodesState, setNodes]);

  React.useEffect(() => {
    if (setEdges) setEdges(edgesState);
  }, [edgesState, setEdges]);

  // Create enhanced node types that include the delete handler
  const enhancedNodeTypes = React.useMemo(() => ({
    textNode: (props) => <TextNodeComponent {...props} onUpdateNode={onUpdateNode} onDeleteNode={(nodeId) => {
      setNodesState((nds) => nds.filter((node) => node.id !== nodeId));
      setEdgesState((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    }} />,
    startNode: (props) => <StartNodeComponent {...props} onDeleteNode={(nodeId) => {
      setNodesState((nds) => nds.filter((node) => node.id !== nodeId));
      setEdgesState((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    }} />,
    endNode: (props) => <EndNodeComponent {...props} onDeleteNode={(nodeId) => {
      setNodesState((nds) => nds.filter((node) => node.id !== nodeId));
      setEdgesState((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    }} />,
    processNode: (props) => <ProcessNodeComponent {...props} onUpdateNode={onUpdateNode} onDeleteNode={(nodeId) => {
      setNodesState((nds) => nds.filter((node) => node.id !== nodeId));
      setEdgesState((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    }} />,
  }), [onUpdateNode, setNodesState, setEdgesState]);

  // Create enhanced edge types that include the delete handler
  const enhancedEdgeTypes = React.useMemo(() => ({
    custom: (props) => <CustomEdge {...props} data={{ 
      ...props.data, 
      onDelete: (edgeId) => {
        setEdgesState((eds) => eds.filter((edge) => edge.id !== edgeId));
      }
    }} />,
  }), [setEdgesState]);

  const onConnect = useCallback(
    (params) => {
      // Add validation to prevent invalid connections
      const sourceNode = nodesState.find(node => node.id === params.source);
      const targetNode = nodesState.find(node => node.id === params.target);
      
      // Prevent self-connections
      if (params.source === params.target) return;
      
      // Check if connection already exists
      const existingConnection = edgesState.find(
        edge => edge.source === params.source && edge.target === params.target
      );
      if (existingConnection) return;
      
      // Create the new connection
      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
        type: 'custom',
        animated: true,
        style: { stroke: '#25d366', strokeWidth: 2 },
        markerEnd: {
          type: 'arrowclosed',
          color: '#25d366',
        },
      };
      
      setEdgesState((eds) => addEdge(newEdge, eds));
    },
    [setEdgesState, nodesState, edgesState]
  );

  const onConnectStart = useCallback(() => {
    // Visual feedback when starting a connection
  }, []);

  const onConnectEnd = useCallback(() => {
    // Visual feedback when ending a connection
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNodeId = `${Date.now()}`;
      const newNode = {
        id: newNodeId,
        type,
        position,
        data: { 
          id: newNodeId,
          label: type.charAt(0).toUpperCase() + type.slice(1),
          message: type === 'textNode' ? 'New message' : undefined,
          description: type === 'processNode' ? 'Process description' : undefined
        },
      };

      setNodesState((nds) => nds.concat(newNode));
    },
    [setNodesState]
  );

  const onNodeClickHandler = useCallback((event, node) => {
    if (onNodeClick) onNodeClick(node);
  }, [onNodeClick]);

  const onCanvasClickHandler = useCallback((event) => {
    // Only trigger if clicking on the background, not on nodes or edges
    if (event.target.closest('.react-flow__node') || event.target.closest('.react-flow__edge')) {
      return;
    }
    if (onCanvasClick) onCanvasClick();
  }, [onCanvasClick]);

  const flowStats = {
    nodes: nodesState.length,
    connections: edgesState.length,
  };

  return (
    <div className="flow-builder">
      <div className="flow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClickHandler}
          onPaneClick={onCanvasClickHandler}
          onInit={setReactFlowInstance}
          nodeTypes={enhancedNodeTypes}
          edgeTypes={enhancedEdgeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ stroke: '#25d366', strokeWidth: 2 }}
          defaultEdgeOptions={{
            type: 'custom',
            animated: true,
            style: { stroke: '#25d366', strokeWidth: 2 }
          }}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#333" gap={20} />
        
          <MiniMap 
            position="bottom-right"
            nodeColor="#25d366"
            maskColor="rgba(0, 0, 0, 0.8)"
          />
          
          {/* Flow Statistics Panel */}
          <Panel position="top-left" className="flow-stats-panel">
            <div className="flow-stats">
              <h4>Flow Statistics</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Nodes:</span>
                  <span className="stat-value">{flowStats.nodes}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Connections:</span>
                  <span className="stat-value">{flowStats.connections}</span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Zoom Controls */}
          <Panel position="top-right" className="zoom-controls-panel">
            <div className="zoom-controls">
              <button 
                className="zoom-btn zoom-in"
                onClick={() => {
                  const viewport = reactFlowInstance.getViewport();
                  const newZoom = Math.min(viewport.zoom * 1.2, 4);
                  reactFlowInstance.setViewport({ ...viewport, zoom: newZoom });
                }}
                title="Zoom In"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              <button 
                className="zoom-btn zoom-out"
                onClick={() => {
                  const viewport = reactFlowInstance.getViewport();
                  const newZoom = Math.max(viewport.zoom / 1.2, 0.1);
                  reactFlowInstance.setViewport({ ...viewport, zoom: newZoom });
                }}
                title="Zoom Out"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              <button 
                className="zoom-btn fit-view"
                onClick={() => {
                  reactFlowInstance.fitView({ padding: 0.1 });
                }}
                title="Fit to View"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowBuilder;
