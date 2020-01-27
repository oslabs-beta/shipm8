import * as types from '../constants/actions';


//our state
const initialState = {
  clusterName: '',
  clusterList: [],
  totalCluster: 0,
  pods: [],
  totalPods: 0,
};

const appReducer = (state = initialState, action) => {
  let clusterName;
  let totalCluster;

  switch (action.type) {
    case types.ADD_CLUSTER:
      // increment lastMarketId and totalMarkets counters
      totalCluster = state.totalCluster + 1;
      clusterName = action.payload.clusterName;

      // create the new market object from provided data
      const newCluster = {
        // what goes in here?
        clusterName: clusterName,
        totalCluster: state.totalCluster,
      };

      // push the new market onto a copy of the market list
      clusterList = state.clusterList.slice();
      clusterList.push(newCluster);

      // return updated state
      return {
        ...state,
        clusterList,
        totalCluster,
        clusterName: '',
      };


    default:
      return state;
  }
};

export default appReducer;