import React from 'react';
import Routes from './Routes';
import { Navigation } from '@internship/ui';
import { Provider } from 'react-redux'
import store from '../../../../libs/store/src/lib/rootIndex';



export const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <Routes />
    </Provider>
  );
};

export default App;
