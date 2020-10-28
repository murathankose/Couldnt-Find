import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/all';
import { useAuthentication } from '@internship/shared/hooks';
import {  logoutAsync} from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Popup, PopupButton, Search } from '../../molecules';
import { getAccessToken, getRefreshToken } from '@internship/shared/utils';

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };
  const tokens= {
    accessToken:getAccessToken(),
    refreshToken:getRefreshToken()
  }

  const handleShow = () => {
    dispatch(logoutAsync.request(tokens));
    setShow(false);
    history.push('/');
  };

  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <div className="container">
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbar">
          <ul className="navbar-nav mr-auto">
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
              <NavDropdown className="nav-link" title={<FaUserAlt />} id="basic-nav-dropdown">
                <li className="nav-link">
                  <NavLink to="/profile" className="nav-link active bg-primary w-50 rounded">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-link">
                  <NavLink type="button" to={location.pathname} className="nav-link active bg-primary w-50  rounded" onClick={handleOpen}>
                    Logout
                  </NavLink>
                  <Popup show={show} onHide={handleClose}>
                    Sistemden Çıkıyorsunuz Emin misiniz?
                    <PopupButton variant="secondary" onClick={handleClose}>
                      HAYIR
                    </PopupButton>
                    <PopupButton type="submit" variant="primary" onClick={handleShow}>
                      EVET
                    </PopupButton>
                  </Popup>
                </li>
              </NavDropdown>
            ) : (
              <NavDropdown className="nav-link" title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">
                  <NavLink to="/register">Sign Up</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <NavLink to="/login">Sign In</NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Search />
          </ul>
        </div>
      </div>
    </nav>
  );
};
