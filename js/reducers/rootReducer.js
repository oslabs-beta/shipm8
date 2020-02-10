import { combineReducers } from '@reduxjs/toolkit';

import clustersReducer from '../components/Clusters/ClustersSlice';
import podsReducer from '../components/Pods/PodsSlice';

const rootReducer = combineReducers({
  Clusters: clustersReducer,
  Pods: podsReducer,
});

export default rootReducer;
