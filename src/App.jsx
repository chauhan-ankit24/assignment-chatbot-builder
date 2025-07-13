import React from "react";
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store';
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Canvas from "./components/layout/Canvas";
import "./App.css";

function AppContent() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Navbar />
        <div className="app-content">
          <main className="main-content">
            <div className="canvas-area">
              <Canvas />
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </DndProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
