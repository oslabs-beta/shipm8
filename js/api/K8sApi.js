import RNFetchBlob from 'rn-fetch-blob';

class K8sApi {

  static apiFetch = async ({ apiUrl, cluster, method = 'get', body }) => {
    const { url: endpoint, token } = cluster;

    const url = endpoint.indexOf('https') !== -1
      ? endpoint
      : `https://${endpoint}`;

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
      return Promise.reject(err);
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
    const res = await this.get('/api/v1/namespaces', cluster);
    return res.items.map(namespace => namespace.metadata.name);
  }

  static checkCluster = async cluster => {
    try {
      const response = await this.get('/api/v1', cluster);
      return Promise.resolve({ up: true, response });
    } catch (err) {
      if (err.message.indexOf('Unauthorized') !== -1) {
        return Promise.resolve({ up: true, response: 'Unauthorized' });
      }
      return Promise.resolve({ up: false });
    }
  }

  static fetchPods = async cluster => {
    const podsList = await this.get('/api/v1/pods', cluster);
    return podsList.items;
  }

  static deleteEntity = async (cluster, entity) => {
    const entityType = entity.kind.toLowerCase();
    const url = `/api/v1/namespaces/${entity.metadata.namespace}/${entityType}/${entity.metadata.name}`;
    return await this.delete(url, cluster);
  }

  static fetchNodes = async cluster => {
    return await this.get('/api/v1/nodes', cluster);
  }

  static fetchServices = async cluster => {
    return await this.get('/api/v1/services', cluster);
  }

  static fetchDeployments = async cluster => {
    return await this.get('/apis/apps/v1/deployments', cluster);
  }

  static fetchReplicaSets = async cluster => {
    return await this.get('/apis/apps/v1/replicasets', cluster);
  }

  static fetchReplicationControllers = async cluster => {
    return await this.get('/api/v1/replicationcontrollers', cluster);
  }

  static fetchIngresses = async cluster => {
    return await this.get('/apis/networking.k8s.io/v1beta1/ingresses', cluster);
  }

  static fetchEndpoints = async cluster => {
    return await this.get('/api/v1/endpoints', cluster);
  }

  static fetchSecrets = async cluster => {
    return await this.get('/api/v1/secrets', cluster);
  }

}

export default K8sApi;
