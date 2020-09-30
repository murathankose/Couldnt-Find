import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import styled from "styled-components";

const containerr = styled(Container)`
    background-color: #007bff;
`;
const Navigation = (props) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/About">About</Nav.Link>
          <Nav.Link href="/Contact">Contact Us</Nav.Link>
          <Nav.Link href="/Register">Sign up</Nav.Link>
          <Nav.Link href="/Sign_in">Sign in</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
