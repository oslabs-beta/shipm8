import { createSlice } from '@reduxjs/toolkit';

const Clusters = createSlice({
  name: 'Clusters',
  initialState: {},
  reducers: {
    addCluster(state, action) {
      const clusterToAdd = action.payload;
      state[clusterToAdd.url] = clusterToAdd;
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

export const { addCluster, removeCluster, updateCluster, setCurrentCluster } = Clusters.actions;

export default Clusters.reducer;

// Thunks
// export const fetchEksClusters = region =>
//   async dispatch => {
//     try {
//       const clusters = await AwsApi.describeAllEksClusters(region);
//       dispatch(getEksClusters(clusters));
//     } catch (err) {
//       console.log(err);
//     }
//   }
