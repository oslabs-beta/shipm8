import { createSlice } from '@reduxjs/toolkit';

import AwsApi from '../api/AwsApi';
import { startLoading, loadingFailed } from '../utils/LoadingUtils';

const Aws = createSlice({
  name: 'Aws',
  initialState: {
    isLoading: false,
    error: null,
    selectedRegion: null,
    credentials: null,
    clusters: null,
  },
  reducers: {
    checkAwsCredentialsStart: startLoading,
    checkAwsCredentialsFailed: loadingFailed,
    checkAwsCredentialsSuccess(state, action) {
      const credentials = action.payload;
      state.credentials = credentials;
      state.isLoading = false;
    },
    deleteCredentials(state, action) {
      state.credentials = null;
    },
    fetchEksClustersStart: startLoading,
    fetchEksClustersFailed: loadingFailed,
    fetchEksClustersSuccess(state, action) {
      const clusters = action.payload;
      state.clusters = clusters;
      state.isLoading = false;
    },
  },
});

export const {
  checkAwsCredentialsStart,
  checkAwsCredentialsFailed,
  checkAwsCredentialsSuccess,
  deleteCredentials,
  fetchEksClustersStart,
  fetchEksClustersFailed,
  fetchEksClustersSuccess,
} = Aws.actions;

export default Aws.reducer;

export const checkAwsCredentials = credentials =>
  async dispatch => {
    try {
      dispatch(checkAwsCredentialsStart());
      const data = await AwsApi.fetchEksClusterNames('us-west-2', credentials);
      if (data) {
        dispatch(checkAwsCredentialsSuccess(credentials));
        return true;
      } else {
        dispatch(checkAwsCredentialsFailed());
        return false;
      }
    } catch (err) {
      dispatch(checkAwsCredentialsFailed());
      return Promise.resolve(err);
    }
  };

export const fetchEksClusters = region =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchEksClustersStart());
      const state = getState();
      const AwsCredentials = state.aws.credentials;
      const clusters = await AwsApi.describeAllEksClusters(region, AwsCredentials);
      dispatch(fetchEksClustersSuccess(clusters));
      return Promise.resolve();
    } catch (err) {
      dispatch(fetchEksClustersFailed(err.toString()));
    }
  };
