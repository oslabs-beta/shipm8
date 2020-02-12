import { createSlice } from '@reduxjs/toolkit';

import GoogleCloudApi from '../api/GoogleCloudApi';
import { startLoading, loadingFailed } from '../utils/LoadingUtils';

const GoogleCloud = createSlice({
  name: 'GoogleCloud',
  initialState: {
    isLoading: false,
    error: null,
    user: null,
    zones: null,
    projects: null,
    clusters: null,
  },
  reducers: {
    fetchProjectsStart: startLoading,
    fetchProjectsFailed: loadingFailed,
    fetchProjectsSuccess(state, action) {
      const projects = action.payload;
      state.projects = projects;
    },
    fetchZonesStart: startLoading,
    fetchZonesFailed: loadingFailed,
    fetchZonesSuccess(state, action) {
      const zones = action.payload;
      state.zones = zones;
    },
    fetchGkeClustersStart: startLoading,
    fetchGkeClustersFailed: loadingFailed,
    fetchGkeClustersSuccess(state, action) {
      const clusters = action.payload;
      state.clusters = clusters;
    },
    googleSignInStart: startLoading,
    googleSignInFailed: loadingFailed,
    googleSignInSuccess(state, action) {
      const user = action.payload;
      state.user = user;
    },
    googleSignOutStart: startLoading,
    googleSignOutFailed: loadingFailed,
    googleSignOutSuccess(state, action) {
      state.user = null;
    }
  }
});

export const {
  fetchProjectsStart,
  fetchProjectsFailed,
  fetchProjectsSuccess,
  fetchZonesStart,
  fetchZonesFailed,
  fetchZonesSuccess,
  fetchGkeClustersStart,
  fetchGkeClustersFailed,
  fetchGkeClustersSuccess,
  googleSignInStart,
  googleSignInFailed,
  googleSignInSuccess,
  googleSignOutStart,
  googleSignOutFailed,
  googleSignOutSuccess,
} = GoogleCloud.actions;

export default GoogleCloud.reducer;

// Thunks
export const googleSignIn = () =>
  async dispatch => {
    try {
      dispatch(googleSignInStart());
      const user = await GoogleCloudApi.signIn();
      dispatch(googleSignInSuccess(user));
    } catch (err) {
      dispatch(googleSignInFailed(err.toString()));
      return Promise.reject(err);
    }
  }

export const googleSignOut = () => {
  async dispatch => {
    try {
      dispatch(googleSignOutStart());
      await GoogleCloudApi.signOut();
      dispatch(googleSignOutSuccess());
    } catch (err) {
      dispatch(googleSignOutFailed(err.toString()));
      return Promise.reject(err);
    }
  }

  export const fetchGkeClusters = (projectId, zone) =>
    async dispatch => {
      try {
        dispatch(fetchGkeClustersStart());
        const clusters = await GoogleCloudApi.fetchGkeClusters(projectId, zone);
        dispatch(fetchGkeClustersSuccess(clusters));
      } catch (err) {
        dispatch(fetchGkeClustersFailed(err.toString()));
        return Promise.reject(err);
      }
    }

  export const fetchGcpProjects = pageToken =>
    async dispatch => {
      try {
        dispatch(fetchProjectsStart());
        const projects = await GoogleCloudApi.fetchProjects(pageToken);
        if (projects.error) {
          dispatch(fetchProjectsFailed(projects.error.toString()));
          return Promise.reject(projects.error.message);
        }
        dispatch(fetchProjectsSuccess(projects.projects));
        if (projects.nextPageToken) { return dispatch(fetchProjects(projects.nextPageToken)); }
        return Promise.resolve('success');
      } catch (err) {
        dispatch(fetchGkeClustersFailed(err.toString()));
        return alert(err);
      }
    }

  export const fetchGcpZones = (projectId, pageToken) =>
    async dispatch => {
      try {
        dispatch(fetchZonesStart());
        const zones = await GoogleCloudApi.fetchZones(projectId, pageToken);
        dispatch(fetchZonesSuccess(zones.zones));
        if (zones.nextPageToken) {
          return dispatch(fetchZones(projectId, zones.nextPageToken));
        }
        return Promise.resolve();
      } catch (err) {
        dispatch(fetchZonesFailed(err.toString()));
        return Promise.reject(err)
      }
    }
