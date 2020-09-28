import React from 'react';

import styled from 'styled-components';


const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;

  .gutter-left {
    margin-left: 2rem;
    margin-right: 2rem;
    text-align: center;
  }
`;

export const App = () => {

  return (
    <StyledApp>
      <h2 className="gutter-left">Start</h2>
    </StyledApp>
  );
};

export default App;
