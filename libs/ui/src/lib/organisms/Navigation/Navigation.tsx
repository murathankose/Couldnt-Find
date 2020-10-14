import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { useAuthentication } from '@internship/shared/hooks';
import { logoutAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Popup, PopupButton } from '../../molecules/Popup';


export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () =>{
    setShow(false);

  }
  const handleOpen = () =>{
    setShow(true);

  }
  const handleShow = () => {
    dispatch(logoutAsync.request(null));
    setShow(false);
  }
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
            <Button className="nav-link"  onClick={handleOpen}>
              Logout
            </Button>
                <Popup show={show} onHide={handleClose}>Sistemden Çıkıyorsunuz Emin misiniz?
                  <PopupButton href={null} variant="secondary" onClick={handleClose}>HAYIR</PopupButton>
                  <PopupButton href={'/'} variant="primary" onClick={handleShow}>EVET</PopupButton>
                </Popup>
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
