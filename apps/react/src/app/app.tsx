import React from 'react';

import styled from 'styled-components';
import Navigation from './components/Navbar';
import Routes from './Routes';

const StyledApp = styled.div`
  font-family: sans-serif;
`;

export const App = () => {
  return (
    <StyledApp>
      <Navigation />
      <Routes />

    </StyledApp>
  );
};

export default App;
