import * as types from '../constants/actionsTypes';


//our state
const initialState = {
  clusterList: [],
  totalCluster: 0,
  pods: [],
  totalPods: 0,
  clusterId: '',
};


const appReducer = (state = initialState, action) => {
  let accessKeyId;
  let secretAccessKey;

  switch (action.type) {
    case types.ADD_API:
      console.log('This is action.payload ====>', action.payload)
      accessKeyId = action.payload.accessKeyId;
      secretAccessKey = action.payload.secretAccessKey;

      return {
        ...state,
        accessKeyId,
        secretAccessKey,
      };

    case types.ADD_CLUSTER:

      totalCluster = state.totalCluster + 1;
      clusterName = action.payload.clusterName;


      const newCluster = {

        clusterName: clusterName,
        totalCluster: state.totalCluster,
      };


      clusterList = state.clusterList.slice();
      clusterList.push(newCluster);


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

console.log('This is the store', initialState.accessKeyId)

export default appReducer;