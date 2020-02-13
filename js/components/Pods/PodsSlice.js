import { createSlice } from '@reduxjs/toolkit';

import K8sApi from '../../api/K8sApi';
import { getAuthToken } from '../Clusters/ClustersSlice';
import { startLoading, loadingFailed } from '../../utils/LoadingUtils';

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
    fetchPodsStart: startLoading,
    fetchPodsFailed: loadingFailed,
    fetchPodsSuccess(state, action) {
      const { cluster, podsByUid } = action.payload;
      state.byCluster[cluster.url] = podsByUid;
      state.isLoading = false;
    },
  }
});

export const {
  setCurrentPod,
  fetchPodsStart,
  fetchPodsFailed,
  fetchPodsSuccess,
} = Pods.actions;

export default Pods.reducer;

// Thunks
export const fetchPods = cluster =>
  async dispatch => {
    try {
      dispatch(fetchPodsStart())
      const clusterWithAuth = await dispatch(getAuthToken(cluster));
      const pods = await K8sApi.fetchPods(clusterWithAuth);
      const podsByUid = {};
      pods.forEach(pod => {
        pod.kind = 'pods';
        podsByUid[pod.metadata.uid] = pod;
      });
      dispatch(fetchPodsSuccess({ cluster: clusterWithAuth, podsByUid }));
    } catch (err) {
      dispatch(fetchPodsFailed(err.toString()));
    }
  }
