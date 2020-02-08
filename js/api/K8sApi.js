import AwsApi from './AwsApi';
import GoogleCloudApi from './GoogleCloudApi';
import RNFetchBlob from 'rn-fetch-blob';

class K8sApi {

  static apiFetch = async ({ apiUrl, cluster, method = 'get', body }) => {
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

  static fetchNamespaces = async cluster => {
    const res = await this.get(`/api/v1/namespaces`, cluster);
    return res.items.map(namespace => namespace.metadata.name);
  }

  static fetchPods = async cluster => {
    return await this.get(`/api/v1/pods`, cluster);
  }

  static fetchNodes = async cluster => {
    return await this.get(`/api/v1/nodes`, cluster);
  }

  static fetchServices = async cluster => {
    return await this.get(`/api/v1/services`, cluster);
  }

  static fetchDeployments = async cluster => {
    return await this.get(`/apis/apps/v1/deployments`, cluster);
  }

  static fetchReplicaSets = async cluster => {
    return await this.get(`/apis/apps/v1/replicasets`, cluster);
  }

  static fetchReplicationControllers = async cluster => {
    return await this.get(`/api/v1/replicationcontrollers`, cluster);
  }

  static fetchIngresses = async cluster => {
    return await this.get(`/apis/networking.k8s.io/v1beta1/ingresses`, cluster);
  }

  static fetchEndpoints = async cluster => {
    return await this.get(`/api/v1/endpoints`, cluster);
  }

  static fetchSecrets = async cluster => {
    return await this.get(`/api/v1/secrets`, cluster);
  }

  static fetchEndpoints = async cluster => {
    return await this.get(`/api/v1/endpoints`, cluster);
  }

  static fetchEndpoints = async cluster => {
    return await this.get(`/api/v1/endpoints`, cluster);
  }

  static fetchEndpoints = async cluster => {
    return await this.get(`/api/v1/endpoints`, cluster);
  }





}

export default K8sApi;
