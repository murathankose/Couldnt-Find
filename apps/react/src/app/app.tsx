import React from 'react';

import { Navigation } from '@internship/ui';
import { Provider } from 'react-redux';
import { configureStore } from '@internship/config';
import { Routes } from './Routes';

import { PersistGate } from 'redux-persist/integration/react'



// ... normal setup, create store and persistor, import components etc.
//const store = configureStore();

export const App = () => {
  return (
    <Provider store={configureStore().store}>
      <PersistGate persistor={configureStore().persistor}>
      <Routes>
        <Navigation />
      </Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
