import { createSlice } from '@reduxjs/toolkit';
import AWSApi from '../api/AWSApi';

const clusters = createSlice({
  name: 'clusters',
  initialState: {
    clusters: null
  },
  reducers: {
    getEksClusters(state, action) {
      const clusters = action.payload;
      state.clusters = clusters;
    }

    // getGoogleClusters(state, action) {

    // }
  }
});

export const { getEksClusters } = clusters.actions;

export default clusters.reducer;

export const fetchEksClusters = region =>
  async dispatch => {
    try {
      const clusters = await AWSApi.describeAllEksClusters(region);
      const newClusterList = await Promise.all(clusters.map(async cluster => {
        const namespaces = await AWSApi.fetchNamespaces(cluster.name, cluster.endpointUrl);
        return {
          ...cluster,
          namespaces
        }
      }));
      dispatch(getEksClusters(newClusterList));
    } catch (err) {
      console.log(err);
    }
  }

