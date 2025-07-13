/**
 * Main App Component
 * 
 * This is the root component that sets up the application with Redux store,
 * drag-and-drop functionality, and renders the main layout components.
 */
import React from "react";
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Redux store
import { store } from './store';

// Layout components
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Canvas from "./components/layout/Canvas";

// Global styles
import "./App.css";

/**
 * AppContent Component
 * 
 * Contains the main application layout wrapped with DndProvider
 * for drag-and-drop functionality across the entire app.
 */
function AppContent() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {/* Top navigation bar */}
        <Navbar />
        
        {/* Main application content */}
        <div className="app-content">
          {/* Canvas area for building flows */}
          <main className="main-content">
            <div className="canvas-area">
              <Canvas />
            </div>
          </main>
          
          {/* Right sidebar with node palette */}
          <Sidebar />
        </div>
      </div>
    </DndProvider>
  );
}

/**
 * Main App Component
 * 
 * Root component that provides Redux store to the entire application.
 * This ensures all components have access to the global state.
 */
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
