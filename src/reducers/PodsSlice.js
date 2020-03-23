import { createSlice } from '@reduxjs/toolkit';

import K8sApi from '../api/K8sApi';
import AlertUtils from '../utils/AlertUtils';
import { getAuthToken } from './ClustersSlice';
import { startLoading, loadingFailed } from '../utils/LoadingUtils';

const Pods = createSlice({
  name: 'Pods',
  initialState: {
    current: null,
    isLoading: false,
    byCluster: {},
  },
  reducers: {
    setCurrentPod(state, action) {
      const pod = action.payload;
      state.current = pod.metadata.uid;
    },
    deletePodStart: startLoading,
    deletePodFailed: loadingFailed,
    deletePodSuccess(state, action) {
      const { cluster, uid } = action.payload;
      delete state.byCluster[cluster.url][uid];
      state.isLoading = false;
    },
    fetchPodsStart: startLoading,
    fetchPodsFailed: loadingFailed,
    fetchPodsSuccess(state, action) {
      const { cluster, podsByUid } = action.payload;
      state.byCluster[cluster.url] = podsByUid;
      state.isLoading = false;
    },
  },
});

export const {
  setCurrentPod,
  deletePodStart,
  deletePodFailed,
  deletePodSuccess,
  fetchPodsStart,
  fetchPodsFailed,
  fetchPodsSuccess,
} = Pods.actions;

export default Pods.reducer;

// Thunks
export const fetchPods = cluster =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      if (state.pods.isLoading) { return; }
      dispatch(fetchPodsStart());
      const clusterWithAuth = await dispatch(getAuthToken(cluster));
      const pods = await K8sApi.fetchPods(clusterWithAuth);
      const podsByUid = {};
      pods.forEach(pod => {
        pod.kind = 'pods';
        podsByUid[pod.metadata.uid] = pod;
      });
      dispatch(fetchPodsSuccess({ cluster, podsByUid }));
      return Promise.resolve();
    } catch (err) {
      dispatch(fetchPodsFailed(err.toString()));
    }
  };

export const deletePod = (cluster, pod) =>
  async dispatch => {
    try {
      dispatch(deletePodStart());
      const clusterWithAuth = await dispatch(getAuthToken(cluster));
      const response = await K8sApi.deleteEntity(clusterWithAuth, pod);
      if (response.kind === 'Pod') {
        const uid = response.metadata.uid;
        dispatch(deletePodSuccess({ cluster, uid }));
        return AlertUtils.deleteSuccessAlert(pod);
      } else {
        return AlertUtils.deleteFailedAlert(response);
      }
    } catch (err) {
      dispatch(deletePodFailed(err.toString()));
    }
  };
