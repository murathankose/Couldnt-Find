import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import {useSelector} from 'react-redux';

export const Navigation = () => {
  const {authenticated}=useSelector((store)=>({authenticated:store.authentication.authenticated}))
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
        {authenticated===false &&
          <NavDropdown className="nav-link" title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
            <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
          </NavDropdown>
        }
        {authenticated===true &&
        <li className="nav-link">
          <NavLink to="/contact" className="nav-link">
            out
          </NavLink>
        </li>
        }

      </ul>
    </nav>
  );
};
