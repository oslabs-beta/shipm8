import { createSlice } from '@reduxjs/toolkit';
import AWSApi from '../api/AWSApi';

const clusters = createSlice({
  name: 'clusters',
  initialState: {},
  reducers: {
    getEksClusters(state, action) {
      const { clusters } = action.payload;
      state.clusters = clusters;
    }
  }
});

export const { addCluster } = clusters.actions;

export default clusters.reducer;

export const fetchAwsClusters = region =>
  async dispatch => {
    try {
      const clusters = await AWSApi.describeAllEksClusters(region);
      dispatch(getEksClusters(clusters));
    } catch (err) {
      console.log(err);
    }
  }

