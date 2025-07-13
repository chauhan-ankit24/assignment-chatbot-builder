import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🤖 Chatbot Flow Builder</h1>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Templates</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Export</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Settings</a>
          </li>
        </ul>
      </div>
      <div className="navbar-actions">
        <button className="btn btn-primary">Save Flow</button>
        <button className="btn btn-secondary">Preview</button>
      </div>
    </nav>
  );
};

export default Navbar;
