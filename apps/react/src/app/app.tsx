import React from 'react';
import Routes from './Routes';
import { Navigation } from '@internship/ui';
import { Provider } from 'react-redux';
import { configureStore } from '@internship/config';
import { withRouter } from 'react-router-dom';

const store = configureStore();
const NavigationWithRouter = withRouter(Navigation);

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationWithRouter />
      <Routes />
    </Provider>
  );
};

export default App;
