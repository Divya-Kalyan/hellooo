import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo">
          <h1>Sizzlefy</h1>
        </div>
        
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#sizzle-suggests" className="nav-link">Sizzle Suggests</a>
          <a href="#trending-bites" className="nav-link">Trending Bites</a>
          <a href="#about" className="nav-link">About</a>
        </div>
        
        <div className="nav-actions">
          <button className="nav-button search">
            <i className="fas fa-search"></i>
          </button>
          <button className="nav-button profile">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 