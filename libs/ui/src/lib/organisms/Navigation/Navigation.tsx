import React from 'react';
import { NavLink } from 'react-router-dom';
import {  NavDropdown } from 'react-bootstrap';
import { useAuthentication } from '@internship/shared/hooks';

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();
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
        {isAuthenticated ? (
          <li className="nav-link">
            <NavLink to="/logout" className="nav-link">
              Logout
            </NavLink>
          </li>
        ) : (
          <NavDropdown className="nav-link" title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">
              <NavLink to="/register">Sign Up</NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item href="#">
              <NavLink to="/login">Sign In</NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </ul>
    </nav>
  );
};
