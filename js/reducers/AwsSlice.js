import { createSlice } from '@reduxjs/toolkit';

import AwsApi from '../api/AwsApi'
import { startLoading, loadingFailed } from '../utils/LoadingUtils';

const Aws = createSlice({
  name: 'Aws',
  initialState: {
    isLoading: false,
    selectedRegion: null,
    credentials: null,
    clusters: null,
  },
  reducers: {
    setCredentials(state, action) {
      const credentials = action.payload;
      state.credentials = credentials;
    },
    deleteCredentials(state, action) {
      state.credentials = null;
    },
    fetchEksClustersStart: startLoading,
    fetchEksClustersFailed: loadingFailed,
    fetchEksClustersSuccess(state, action) {
      const clusters = action.payload;
      state.clusters = clusters;
    },
  }
});

export const {
  setCredentials,
  deleteCredentials,
  fetchEksClustersStart,
  fetchEksClustersFailed,
  fetchEksClustersSuccess,
} = Aws.actions;

export default Aws.reducer;

export const checkCredentials = credentials =>
  async dispatch => {
    try {
      const data = await AwsApi.fetchEksClusterNames('us-west-2', credentials);
      if (data) {
        dispatch(setCredentials(credentials));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return Promise.resolve(err);
    }
  }

export const fetchEksClusters = region =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const AwsCredentials = state.Aws.credentials;
      const clusters = await AwsApi.describeAllEksClusters(region, AwsCredentials);
      dispatch(fetchEksClustersSuccess(clusters));
    } catch (err) {
      dispatch(fetchEksClustersFailed(err.toString()));
    }
  }
