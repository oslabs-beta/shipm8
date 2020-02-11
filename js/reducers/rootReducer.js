import { combineReducers } from '@reduxjs/toolkit';

import clustersReducer from '../components/Clusters/ClustersSlice';
import podsReducer from '../components/Pods/PodsSlice';
import AwsReducer from '../components/AwsSlice';

const rootReducer = combineReducers({
  Clusters: clustersReducer,
  Pods: podsReducer,
  Aws: AwsReducer,
});

export default rootReducer;
