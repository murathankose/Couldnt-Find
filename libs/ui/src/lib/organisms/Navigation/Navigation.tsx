import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul className="navbar-nav">
        <li className="navbar-brand">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/contact" className="nav-link">
            Contact Us
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/register" className="nav-link">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/login" className="nav-link">
            Sign In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
