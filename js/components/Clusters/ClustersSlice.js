import { createSlice } from '@reduxjs/toolkit';

import AwsApi from '../../api/AwsApi';
import K8sApi from '../../api/K8sApi';
import GoogleCloudApi from '../../api/GoogleCloudApi';
import { startLoading, loadingFailed } from '../../utils/LoadingUtils';

const Clusters = createSlice({
  name: 'Clusters',
  initialState: {
    isReady: true,
    isLoading: false,
    current: null,
    error: null,
    currentProvider: null,
    byUrl: {},
  },
  reducers: {
    addCluster(state, action) {
      const clusterToAdd = action.payload;
      state.byUrl[clusterToAdd.url] = clusterToAdd;
    },
    removeCluster(state, action) {
      const clusterToRemove = action.payload;
      delete state.byUrl[clusterToRemove.url];
    },
    updateCluster(state, action) {
      const updatedCluster = action.payload;
      state.byUrl[updatedCluster.url] = updatedCluster;
    },
    setCurrentCluster(state, action) {
      const selectedCluster = action.payload;
      state.current = selectedCluster.url;
    },
    setCurrentNamespace(state, action) {
      const { currentCluster: cluster, namespace } = action.payload;
      state.byUrl[cluster.url].currentNamespace = namespace;
    },
    setCurrentProvider(state, action) {
      const provider = action.payload;
      state.currentProvider = provider;
    },
    getAuthTokenFailed: loadingFailed,
    getAuthTokenSuccess(state, action) {
      const { cluster, token } = action.payload;
      state.byUrl[cluster.url].token = token;
    },
    fetchNamespacesStart: startLoading,
    fetchNamespacesFailed: loadingFailed,
    fetchNamespacesSuccess(state, action) {
      const { cluster, namespaces } = action.payload;
      state.byUrl[cluster.url].namespaces = namespaces;
      state.isLoading = false;
    },
  },
});

export const {
  addCluster,
  removeCluster,
  updateCluster,
  setCurrentCluster,
  setCurrentNamespace,
  setCurrentProvider,
  getAuthTokenSuccess,
  getAuthTokenFailed,
  fetchNamespacesStart,
  fetchNamespacesSuccess,
  fetchNamespacesFailed,
} = Clusters.actions;

export default Clusters.reducer;

// Thunks
export const fetchNamespaces = cluster =>
  async dispatch => {
    try {
      dispatch(fetchNamespacesStart());
      const clusterWithToken = await dispatch(getAuthToken(cluster));
      const namespaces = await K8sApi.fetchNamespaces(clusterWithToken);
      dispatch(fetchNamespacesSuccess({ cluster: clusterWithToken, namespaces }));
    } catch (err) {
      dispatch(fetchNamespacesFailed(err.toString()));
      return Promise.reject(err)
    }
  };

export const getAuthToken = cluster =>
  async (dispatch, getState) => {
    try {
      let state = getState();
      let token;

      if (cluster.cloudProvider === 'Aws') {
        token = AwsApi.getAuthToken(cluster.name, state.Aws.credentials);
      } else if (cluster.cloudProvider === 'Gcp') {
        token = await GoogleCloudApi.refreshAccessToken(state.Gcp.user.refreshToken);
      }

      dispatch(getAuthTokenSuccess({ cluster, token }));
      state = getState();
      const clusterWithToken = state.Clusters.byUrl[cluster.url];
      return Promise.resolve(clusterWithToken);
    } catch (err) {
      dispatch(getAuthTokenFailed(err.toString()));
      return Promise.reject(err);
    }
  }
