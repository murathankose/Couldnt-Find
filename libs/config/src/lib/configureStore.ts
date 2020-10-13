import { applyMiddleware, createStore } from 'redux';
import { rootReducer, rootSaga } from './rootReducer';
import { sagaMiddleware } from './middlewares';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const configureStore = () => {
  const middlewares = [sagaMiddleware];
  const store: any = createStore(persistedReducer, bindMiddleware(middlewares));
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga);
  window["UGLY_STORE"] = store;

  return {store, persistor};
};

export { configureStore };
