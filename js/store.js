import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer
});

const development = true;

if (development && module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const newRootReducer = require('./reducers/rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export default store;
