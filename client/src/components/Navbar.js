import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>SBlogs</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/create">New Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;