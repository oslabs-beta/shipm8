import AwsApi from './AwsApi';
import GoogleCloudApi from './GoogleCloudApi';
import RNFetchBlob from 'rn-fetch-blob';

class K8sApi {

  static apiFetch = ({ apiUrl, cluster, method = 'get', body = {} }) => {
    const { name: clusterName, url, cloudProvider } = cluster;

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
        .fetch(method, `${url}${apiUrl}`, authHeader, body);
      return res.json();
    }
    catch (err) {
      console.log(err);
    }
  };

  static post(apiUrl, cluster, body) {
    return this.apiFetch({ method: 'post', apiUrl, body, cluster });
  }

  static get(apiUrl, cluster) {
    return this.apiFetch({ method: 'get', apiUrl, cluster });
  }

  static put(apiUrl, cluster, body) {
    return this.apiFetch({ method: 'put', apiUrl, body, cluster });
  }

  static patch(apiUrl, cluster, body) {
    return this.apiFetch({ method: 'patch', apiUrl, body, cluster });
  }

  static delete(apiUrl, cluster, body) {
    return this.apiFetch({ method: 'delete', apiUrl, body, cluster });
  }
}

export default K8sApi;
