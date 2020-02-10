import { createSlice } from '@reduxjs/toolkit';

import K8sApi from '../../api/K8sApi';
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

export const { setCurrentPod, fetchPodsFailed, fetchPodsSuccess, fetchPodsStart } = Pods.actions;

export default Pods.reducer;

// Thunks
export const fetchPods = cluster =>
  async dispatch => {
    try {
      dispatch(fetchPodsStart());
      const pods = await K8sApi.fetchPods(cluster);
      const podsByUid = {};
      pods.forEach(pod => {
        pod.kind = 'pods';
        podsByUid[pod.metadata.uid] = pod;
      });
      dispatch(fetchPodsSuccess({ cluster, podsByUid }));
    } catch (err) {
      dispatch(fetchPodsFailed());
    }
  }
