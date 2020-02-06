import { combineReducers } from '@reduxjs/toolkit';

import clustersReducer from './clustersSlice';

const rootReducer = combineReducers({
  clusters: clustersReducer
});

export default rootReducer;
