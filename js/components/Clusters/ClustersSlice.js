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
    byUrl: {}
  },
  reducers: {
    addCluster(state, action) {
      const clusterToAdd = action.payload;
      state.byUrl[clusterToAdd.url] = clusterToAdd;
    },
    fetchNamespacesStart: startLoading,
    fetchNamespacesFailed: loadingFailed,
    fetchNamespacesSuccess(state, action) {
      const { cluster, namespaces } = action.payload;
      state.byUrl[cluster.url].namespaces = namespaces;
      state.isLoading = false;
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
  setCurrentNamespace
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
