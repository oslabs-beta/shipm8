import { createSlice } from '@reduxjs/toolkit';
import AWSApi from '../api/AWSApi';

const clusters = createSlice({
  name: 'clusters',
  initialState: {
    clusters: null
  },
  reducers: {
    getEksClusters(state, action) {
      const eksClusters = action.payload;
      state.EksClusters = eksClusters;
    },
    addCluster(state, action) {

    }

    // getGoogleClusters(state, action) {

    // }
  }
});

export const { getEksClusters } = clusters.actions;

export default clusters.reducer;

const saveCluster = async cluster => {
  await AsyncStorage.setItem('currentCluster', JSON.stringify(cluster));
}

const saveClusters = async clusters => {
  const clustersStore = {};
  clusters.forEach(cluster => {
    clustersStore[cluster.name] = cluster;
  });
  await AsyncStorage.setItem('ClustersStore', JSON.stringify(clustersStore));
}

export const fetchEksClusters = region =>
  async dispatch => {
    try {
      const clusters = await AWSApi.describeAllEksClusters(region);
      dispatch(getEksClusters(clusters));
    } catch (err) {
      console.log(err);
    }
  }
