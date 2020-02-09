import { createSlice } from '@reduxjs/toolkit';

import K8sApi from '../../api/K8sApi';

const startLoading = state => {
  state.isLoading = true;
}

const loadingFailed = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
}

const Clusters = createSlice({
  name: 'Clusters',
  initialState: {
    isLoading: false,
    current: null,
    error: null,
    byUrl: {
      'https://testcluster.com': {
        name: 'Test Cluster 1',
        url: 'https://testcluster.com',
        status: 'ACTIVE',
        createdAt: '2020-02-01',
        cloudProvider: 'Aws',
      }
    }
  },
  reducers: {
    addCluster(state, action) {
      const clusterToAdd = action.payload;
      state[clusterToAdd.url] = clusterToAdd;
    },
    fetchNamespacesStart: startLoading,
    fetchNamespacesFailed: loadingFailed,
    fetchNamespacesSuccess(state, action) {
      const { cluster, namespaces } = action.payload;
      state[cluster.url].namespaces = namespaces;
      state.isLoading = false;
    },
    removeCluster(state, action) {
      const clusterToRemove = action.payload;
      delete state[clusterToRemove.url];
    },
    updateCluster(state, action) {
      const updatedCluster = action.payload;
      state[updatedCluster.url] = updatedCluster;
    },
    setCurrentCluster(state, action) {
      const selectedCluster = action.payload;
      state.current = selectedCluster.url;
    },
  }
});

export const {
  addCluster,
  fetchNamespacesStart,
  fetchNamespacesSuccess,
  fetchNamespacesFailed,
  removeCluster,
  updateCluster,
  setCurrentCluster,
} = Clusters.actions;

export default Clusters.reducer;

// Thunks
export const fetchNamespaces = cluster =>
  async dispatch => {
    try {
      dispatch(fetchNamespacesStart());
      const namespaces = await K8sApi.fetchNamespaces(cluster);
      dispatch(fetchNamespacesSuccess({ cluster, namespaces }));
    } catch (err) {
      dispatch(fetchNamespacesFailed(err.toString()));
    }
  }