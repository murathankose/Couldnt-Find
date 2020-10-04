import React from 'react';
import Routes from './Routes';
import { Navigation } from '@internship/ui';
import { Provider } from 'react-redux';
import { configureStore } from '@internship/config';

const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <Routes />
    </Provider>
  );
};

export default App;
