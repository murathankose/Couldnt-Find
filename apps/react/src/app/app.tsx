import React from 'react';

import { Navigation } from '@internship/ui';
import { Provider } from 'react-redux';
import { configureStore } from '@internship/config';
import { Routes } from './Routes';

const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Navigation />
      </Routes>
    </Provider>
  );
};

export default App;
