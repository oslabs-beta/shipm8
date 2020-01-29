import { sign } from '../utils/aws4';
import RNFetchBlob from 'rn-fetch-blob';
import { Base64 } from 'js-base64';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  accessKeyId: state.app.accessKeyId,
  secretAccessKey: state.app.secretAccessKey,

});

class AWSApi {

  /**
   * 
   * AWS Kubernetes API Authorization from Outside a Cluster:
   * https://github.com/kubernetes-sigs/aws-iam-authenticator#api-authorization-from-outside-a-cluster
   *
   */

  static getAuthToken(clusterId) {
    /* Declare options for STS API Query */
    const queryOptions = {
      host: 'sts.amazonaws.com',
      service: 'sts',
      path: `/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Expires=60`,
      headers: {
        'x-k8s-aws-id': clusterId,
      },
      signQuery: true,
    };
    /* Hard coded credentials during development */
    const CREDENTIALS = {
      accessKeyId: this.props.accessKeyId,
      secretAccessKey: this.props.secretAccessKey,
    };
    /* Sign STS API Query with AWS4 Signature */
    const signedQuery = sign(queryOptions, CREDENTIALS);
    /* Pull out signed host & path */
    const signedURL = `https://${signedQuery.host}${signedQuery.path}`;
    /* Base64 encode signed URL */
    const encodedURL = Base64.encodeURI(signedURL);
    /* Remove any Base64 encoding padding */
    const token = encodedURL.replace(/=+$/, ``);
    /* Prepend result with required string */
    const authToken = `k8s-aws-v1.${token}`;
    return authToken;
  };

  static apiFetch = (url, clusterId) => {
    const authHeader = {
      Authorization: `Bearer ${this.getAuthToken(clusterId)}`,
    };
    return RNFetchBlob.config({
      trusty: true, /* prevents self-signed certificate rejection */
    })
      .fetch('GET', url, authHeader)
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  static eksFetch = (region, method, path) => {
    const queryOptions = {
      host: `eks.${region}.amazonaws.com`,
      path: path,
    };
    /* Hard coded credentials during development */
    const CREDENTIALS = {
      accessKeyId: ``,
      secretAccessKey: ``,
    };
    const query = sign(queryOptions, CREDENTIALS);
    return fetch(`https://eks.${region}.amazonaws.com${path}`, {
      method: method,
      headers: query.headers,
    })
      .then(res => res.json())
      .catch(err => console.log('err: ', err));
  };

  // step 1, retrieve list of all AWS clusters in the selected region
  static getEksClusters = region => {
    return this.eksFetch(region, `GET`, `/clusters`)
      .then(clustersObj => clustersObj)
      .catch(err => console.log('err: ', err))
  };

  // step 2, retrieve all info about the selected cluster, need to pull out the api URL
  static describeEksCluster = (region, clusterName) => {
    return this.eksFetch(region, `GET`, `/clusters/${clusterName}`)
      .then(clusterObj => clusterObj)
      .catch(err => console.log('err: ', err));
  };

  // step 3, get all namespaces for the selected cluster
  static fetchNamespaces = (url, clusterId) => {
    return this.apiFetch(`${url}/api/v1/namespaces`, clusterId)
      .then(namespacesObj => namespacesObj.items.map(namespace => namespace.metadata.name))
      .catch(err => console.log('err: ', err));
  };
  //

  // step 4, get a list of pods for the selected cluster & namespace
  static fetchPods = (url, namespace, clusterId) => {
    return this.apiFetch(`${url}/api/v1/namespaces/${namespace}/pods`, clusterId)
      .then(podsObj => podsObj.items.map(pod => pod.metadata.name))
      .catch(err => console.log('err: ', err));
  };

  // step 5, when a pod is clicked, retrive info about that specific pod
  static fetchPodInfo = (url, namespace, pod, clusterId) => {
    return this.apiFetch(`${url}/api/v1/namespaces/${namespace}/pods/${pod}`, clusterId)
      .then(podObj => podObj)
      .catch(err => console.log('err: ', err));
  };
}

export default connect(mapStateToProps)(AWSApi);
