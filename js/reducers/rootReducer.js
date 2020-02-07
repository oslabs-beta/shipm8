import { combineReducers } from '@reduxjs/toolkit';

import clustersReducer from './ClustersSlice';
import podsReducer from './PodsSlice';

const rootReducer = combineReducers({
  Clusters: clustersReducer,
  Pods: podsReducer,
});

export default rootReducer;
