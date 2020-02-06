import { createSlice } from '@reduxjs/toolkit';
import AWSApi from '../api/AWSApi';

const clusters = createSlice({
  name: 'clusters',
  initialState: {
    clusters: {},
    eksClusters: {},
    gkeClusters: {},
  },
  reducers: {
    addCluster(state, action) {
      const clusterToAdd = action.payload;
      state.clusters[clusterToAdd.name] = clusterToAdd;
    },
    removeCluster(state, action) {
      const clusterToRemove = action.payload.name;
      delete state.clusters[clusterToRemove];
    },
    updateCluster(state, action) {
      const updatedCluster = action.payload;
      state.clusters[updatedCluster.name] = updatedCluster;
    },
    setCurrentCluster(state, action) {
      const selectedCluster = action.payload;
      state.clusters.current = selectedCluster.name;
    },
    getEksClusters(state, action) {
      const eksClusters = action.payload;
      state.EksClusters = eksClusters;
    },
    getGkeClusters(state, action) {
      // get Gke Clusters here
    },
  }
});

export const { addCluster, removeCluster, updateCluster, getEksClusters } = clusters.actions;

export default clusters.reducer;

const saveCluster = async cluster => {
  try {
    await AsyncStorage.setItem('currentCluster', JSON.stringify(cluster));
  } catch (err) {
    console.log(err);
  }
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
