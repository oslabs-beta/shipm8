import AwsApi from './AwsApi';
import GoogleCloudApi from './GoogleCloudApi';
import RNFetchBlob from 'rn-fetch-blob';

class BaseApi {

  static apiFetch = ({ url, method, clusterName, body = {}, cloudProvider = 'Aws' }) => {
    const token = cloudProvider === 'Aws'
      ? await AwsApi.getAuthToken(clusterName)
      : await GoogleCloudApi.getAccessToken();

    const authHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await RNFetchBlob.config({
        trusty: true,
      })
        .fetch(method, url, authHeader, body);
      return res.json();
    }
    catch (err) {
      console.log(err);
    }
  };

  static post(url, clusterName, cloudProvider, body) {
    return this.apiFetch({ method: 'post', url, body, clusterName, cloudProvider });
  }

  static get(url, clusterName, cloudProvider) {
    return this.apiFetch({ method: 'get', url, clusterName, cloudProvider });
  }

  static put(url, clusterName, cloudProvider, body) {
    return this.apiFetch({ method: 'put', url, body, clusterName, cloudProvider });
  }

  static patch(url, clusterName, cloudProvider, body) {
    return this.apiFetch({ method: 'patch', url, body, clusterName, cloudProvider });
  }

  static delete(url, clusterName, cloudProvider, body) {
    return this.apiFetch({ method: 'delete', url, body, clusterName, cloudProvider });
  }
}

export default BaseApi;