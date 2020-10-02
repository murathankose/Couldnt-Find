import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

export const Navigation = withRouter(() => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact Us</Nav.Link>
          <Nav.Link href="/register">Sign up</Nav.Link>
          <Nav.Link href="/login">Sign in</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});
