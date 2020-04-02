import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import persistReducer from '../reducers/index';

export const store = configureStore({
  reducer: persistReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
