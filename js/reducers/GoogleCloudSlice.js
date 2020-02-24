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
    fetchGcpProjectsStart: startLoading,
    fetchGcpProjectsFailed: loadingFailed,
    fetchGcpProjectsSuccess(state, action) {
      const projects = action.payload;
      state.projects = projects;
      state.isLoading = false;
    },
    fetchGcpZonesStart: startLoading,
    fetchGcpZonesFailed: loadingFailed,
    fetchGcpZonesSuccess(state, action) {
      const zones = action.payload;
      state.zones = zones;
      state.isLoading = false;
    },
    fetchGkeClustersStart: startLoading,
    fetchGkeClustersFailed: loadingFailed,
    fetchGkeClustersSuccess(state, action) {
      const clusters = action.payload;
      state.clusters = clusters;
      state.isLoading = false;
    },
    googleSignInStart: startLoading,
    googleSignInFailed: loadingFailed,
    googleSignInSuccess(state, action) {
      const user = action.payload;
      state.user = user;
      state.isLoading = false;
    },
    googleSignOutStart: startLoading,
    googleSignOutFailed: loadingFailed,
    googleSignOutSuccess(state, action) {
      state.user = null;
      state.isLoading = false;
    },
  }
});

export const {
  fetchGcpProjectsStart,
  fetchGcpProjectsFailed,
  fetchGcpProjectsSuccess,
  fetchGcpZonesStart,
  fetchGcpZonesFailed,
  fetchGcpZonesSuccess,
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
      if (!user) {
        dispatch(googleSignInFailed('Sign in Canceled'));
        return Promise.resolve('Sign in Canceled');
      }
      dispatch(googleSignInSuccess(user));
      return Promise.resolve(true);
    } catch (err) {
      dispatch(googleSignInFailed(err.toString()));
      return Promise.reject(err);
    }
  }

export const googleSignOut = () =>
  async dispatch => {
    try {
      dispatch(googleSignOutStart());
      await GoogleCloudApi.signOut();
      dispatch(googleSignOutSuccess());
      return Promise.resolve();
    } catch (err) {
      dispatch(googleSignOutFailed(err.toString()));
      return Promise.reject(err);
    }
  }

export const fetchGkeClusters = (projectId, zone) =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch(fetchGkeClustersStart());
      const refreshToken = state.gcp.user.refreshToken;
      const clusters = await GoogleCloudApi.fetchGkeClusters({ projectId, zone, refreshToken });
      dispatch(fetchGkeClustersSuccess(clusters));
      return Promise.resolve();
    } catch (err) {
      dispatch(fetchGkeClustersFailed(err.toString()));
      return Promise.reject(err);
    }
  }

export const fetchGcpProjects = pageToken =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch(fetchGcpProjectsStart());
      const refreshToken = state.gcp.user.refreshToken;
      const projects = await GoogleCloudApi.fetchProjects({ pageToken, refreshToken });
      if (projects.error) {
        dispatch(fetchGcpProjectsFailed(projects.error.toString()));
        return Promise.reject(projects.error.message);
      }
      dispatch(fetchGcpProjectsSuccess(projects.projects));
      if (projects.nextPageToken) { return dispatch(fetchGcpProjects(projects.nextPageToken)); }
      return Promise.resolve();
    } catch (err) {
      dispatch(fetchGcpProjectsFailed(err.toString()));
      return Promise.reject(err);
    }
  }

export const fetchGcpZones = (projectId, pageToken) =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchGcpZonesStart());
      const state = getState();
      const refreshToken = state.gcp.user.refreshToken;
      const zones = await GoogleCloudApi.fetchZones({ projectId, pageToken, refreshToken });
      dispatch(fetchGcpZonesSuccess(zones.zones));
      if (zones.nextPageToken) {
        return dispatch(fetchGcpZones(projectId, zones.nextPageToken));
      }
      return Promise.resolve();
    } catch (err) {
      dispatch(fetchGcpZonesFailed(err.toString()));
      return Promise.reject(err);
    }
  };
