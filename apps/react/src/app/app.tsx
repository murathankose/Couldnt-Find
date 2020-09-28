import React from 'react';

import styled from 'styled-components';
import Navigation from './components/Navbar';
import Routes from './Routes';
import { Container } from 'react-bootstrap';

const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;
`;

export const App = () => {
  return (
    <Container>
      <StyledApp>
        <Navigation />
        <Routes />
      </StyledApp>
    </Container>
  );
};

export default App;
