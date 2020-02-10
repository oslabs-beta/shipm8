import { createSlice } from '@reduxjs/toolkit';

const Pods = createSlice({
  name: 'Pods',
  initialState: {
    current: null,
    isLoading: false,
    byCluster: {
      'https://testcluster.com': {
        uuidPodA: {
          apiVersion: "v1",
          kind: "Pod",
          metadata: {
            annotations: {
              "kubernetes.io/psp": "eks.privileged"
            },
            creationTimestamp: "2020-01-29T00:27:40Z",
            generateName: "repark-deployment-7997f8b86d-",
            labels: {
              "pod-template-hash": "7997f8b86d", "repark": "web"
            },
            name: "repark-deployment-7997f8b86d-4k5dd",
            namespace: "default",
            ownerReferences: [[Object]],
            resourceVersion: "5456",
            selfLink: "/api/v1/namespaces/default/pods/repark-deployment-7997f8b86d-4k5dd",
            uid: "287db3d7-422e-11ea-a037-02b853562b6a"
          },
          status: {
            conditions: [[Object]],
            phase: "Active",
            qosClass: "BestEffort"
          }
        },
        uuidPodB: {
          apiVersion: "v1",
          kind: "Pod",
          metadata: {
            annotations: {
              "kubernetes.io/psp": "eks.privileged"
            },
            creationTimestamp: "2020-01-29T00:27:40Z",
            generateName: "repark-deployment-7997f8b86d-",
            labels: {
              "pod-template-hash": "7997f8b86d", "repark": "web"
            },
            name: "repark-testpod-2",
            namespace: "default",
            ownerReferences: [[Object]],
            resourceVersion: "5456",
            selfLink: "/api/v1/namespaces/default/pods/repark-deployment-7997f8b86d-4k5dd",
            uid: "287db3d7-422e-11ea-a037-02b853562b6a"
          },
          status: {
            conditions: [[Object]],
            phase: "Pending",
            qosClass: "BestEffort"
          }

        },
        uuidPodC: {
          apiVersion: "v1",
          kind: "Pod",
          metadata: {
            annotations: {
              "kubernetes.io/psp": "eks.privileged"
            },
            creationTimestamp: "2020-01-29T00:27:40Z",
            generateName: "repark-deployment-7997f8b86d-",
            labels: {
              "pod-template-hash": "7997f8b86d", "repark": "web"
            },
            name: "repark-testpod-3",
            namespace: "default",
            ownerReferences: [[Object]],
            resourceVersion: "5456",
            selfLink: "/api/v1/namespaces/default/pods/repark-deployment-7997f8b86d-4k5dd",
            uid: "287db3d7-422e-11ea-a037-02b853562b6a"
          },
          status: {
            conditions: [[Object]],
            phase: "Pending",
            qosClass: "BestEffort"
          }
        },
      },
    }
  },
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