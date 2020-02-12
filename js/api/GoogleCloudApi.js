import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

class GoogleCloudApi {
  static configureGoogleSignin = () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      iosClientId:
        '535704856722-soaqblnbbcf050at58k7bhbenk9fui5p.apps.googleusercontent.com',
    });
  };

  static signIn = async () => {
    try {
      this.configureGoogleSignin();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  static getAccessToken = async () => {
    try {
      const tokens = await GoogleSignin.getTokens();
      const accessToken = tokens.accessToken;
      return accessToken;
    } catch (err) {
      Promise.reject(err);
    }
  };

  static signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  static gcpFetch = async (url, method = 'get', body) => {
    const accessToken = await this.getAccessToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    const res = await fetch(url, {
      headers,
      method,
      body,
    });

    return res.json();
  }

  static fetchProjects = async pageToken => {
    const qs = pageToken
      ? `https://cloudresourcemanager.googleapis.com/v1/projects?pageSize=50&pageToken=${pageToken}`
      : `https://cloudresourcemanager.googleapis.com/v1/projects?pageSize=50`;

    try {
      const projects = await this.gcpFetch(qs);

      if (projects.error) {
        return alert(projects.error.message)
      }
      return projects;

    } catch (err) {
      Promise.reject(err);
    }
  }

  static fetchZones = async (projectId, pageToken) => {
    const qs = pageToken
      ? `&pageToken=${pageToken}`
      : undefined;

    try {
      const zones = await this.gcpFetch(`https://compute.googleapis.com/compute/v1/projects/${projectId}/zones`);
      if (zones.error) {
        return alert(zones.error.message)
      }
      return zones;

    } catch (err) {
      return Promise.reject(err);
    }
  }

  static fetchGkeClusters = async (projectId, zone = '-') => {
    try {
      const clusters = await this.gcpFetch(`https://container.googleapis.com/v1/projects/${projectId}/locations/${zone}/clusters`);
      if (!clusters.clusters) { return []; }
      const clusterList = clusters.clusters.map(cluster => {
        return {
          url: cluster.endpoint,
          name: cluster.name,
          status: cluster.status,
          createdAt: cluster.createTime,
          cloudProvider: 'Gcp',
          namespaces: [],
        }
      });
      if (clusters.error) {
        return alert(clusters.error.message);
      }
      return clusterList;

    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default GoogleCloudApi;
