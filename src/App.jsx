import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import "./App.css";

function App() {
  const canvasRef = useRef(null);

  const handleNodeClick = (nodeType, position) => {
    if (canvasRef.current && canvasRef.current.addNode) {
      canvasRef.current.addNode(nodeType, position);
    }
  };

  const handleNodeAdd = (node) => {
    console.log('Node added:', node);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="app-content">
        <main className="main-content">
          <div className="canvas-area">
            <Canvas 
              ref={canvasRef}
              onNodeAdd={handleNodeAdd}
              onNodeClick={handleNodeClick}
            />
          </div>
        </main>
        <Sidebar onNodeClick={handleNodeClick} />
      </div>
    </div>
  );
}

export default App;
