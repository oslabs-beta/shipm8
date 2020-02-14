import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

const googleInfo = {
  iosClientId: '535704856722-soaqblnbbcf050at58k7bhbenk9fui5p.apps.googleusercontent.com',
  webClientId: '535704856722-bkjtacpeoclh9is24uuddft3mujs9h5u.apps.googleusercontent.com',
  webClientSecret: 'avRYeo9c9VYDGk9SgGJarvO-',
}

class GoogleCloudApi {
  static configureGoogleSignin = () => {
    GoogleSignin.configure({
      offlineAccess: true,
      iosClientId: googleInfo.iosClientId,
      webClientId: googleInfo.webClientId,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
  };

  static signIn = async () => {
    try {
      this.configureGoogleSignin();
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      const tokens = await this.getAuthTokens(user.serverAuthCode);
      user.accessToken = tokens.access_token;
      user.refreshToken = tokens.refresh_token;
      return user;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        return false;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        return false;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        return false;
      } else {
        // some other error happened
        return false;
      }
    }
  };

  static refreshAccessToken = async refreshToken => {
    const url = `https://oauth2.googleapis.com/token?` +
      `client_id=${googleInfo.webClientId}&` +
      `client_secret=${googleInfo.webClientSecret}&` +
      `refresh_token=${refreshToken}&` +
      `grant_type=refresh_token`

    const newAccessToken = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.json());

    return newAccessToken.access_token;
  }

  static getAuthTokens = async serverAuthCode => {
    try {
      const url = 'https://oauth2.googleapis.com/token?' +
        `client_id=${googleInfo.webClientId}&` +
        `client_secret=${googleInfo.webClientSecret}&` +
        `code=${serverAuthCode}&` +
        `grant_type=authorization_code&` +
        `redirect_uri=`

      const tokens = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json());

      return tokens;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err)
    }
  };

  static gcpFetch = async ({ url, method = 'get', body, refreshToken }) => {
    const accessToken = await this.refreshAccessToken(refreshToken);

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

  static fetchProjects = async ({ pageToken, refreshToken }) => {
    const url = pageToken
      ? `https://cloudresourcemanager.googleapis.com/v1/projects?pageSize=50&pageToken=${pageToken}`
      : `https://cloudresourcemanager.googleapis.com/v1/projects?pageSize=50`;

    try {
      const projects = await this.gcpFetch({ url, refreshToken });

      if (projects.error) {
        return alert(projects.error.message)
      }
      return projects;

    } catch (err) {
      Promise.reject(err);
    }
  }

  static fetchZones = async ({ projectId, pageToken, refreshToken }) => {
    const url = pageToken
      ? `https://compute.googleapis.com/compute/v1/projects/${projectId}/zones?pageToken=${pageToken}`
      : `https://compute.googleapis.com/compute/v1/projects/${projectId}/zones`;

    try {
      const zones = await this.gcpFetch({ url, refreshToken });
      if (zones.error) {
        return alert(zones.error.message)
      }
      return zones;

    } catch (err) {
      return Promise.reject(err);
    }
  }

  static fetchGkeClusters = async ({ projectId, zone = '-', refreshToken }) => {
    try {
      const url = `https://container.googleapis.com/v1/projects/${projectId}/locations/${zone}/clusters`
      const clusters = await this.gcpFetch({ url, refreshToken });
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
