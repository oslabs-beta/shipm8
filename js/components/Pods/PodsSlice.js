import { createSlice } from '@reduxjs/toolkit';

const Pods = createSlice({
  name: 'Pods',
  initialState: {},
  reducers: {

  }
});

export const { } = Pods.actions;
export default Pods.reducer;

// Thunks
// export const fetchPods = region =>
//   async dispatch => {
//     try {
//       const clusters = await AwsApi.describeAllEksClusters(region);
//       dispatch(getEksClusters(clusters));
//     } catch (err) {
//       console.log(err);
//     }
//   }