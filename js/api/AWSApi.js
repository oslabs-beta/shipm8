import { sign } from '../utils/aws4';
import RNFetchBlob from 'rn-fetch-blob';
import { Base64 } from 'js-base64';

class AWSApi {

  /*
  * AWS Kubernetes API Authorization from Outside a Cluster:
  * https://github.com/kubernetes-sigs/aws-iam-authenticator#api-authorization-from-outside-a-cluster
  *
  */

  static getAuthToken() {

    /* Declare options for STS API Query */
    const queryOptions = {
      host: 'sts.amazonaws.com',
      service: 'sts',
      path: `/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Expires=60`,
      headers: {
        'x-k8s-aws-id': 'newClusterOne',
      },
      signQuery: true
    }

    /* Hard coded credentials during development */
    const CREDENTIALS = {
      accessKeyId: `AKIA4V7DDZOOX5SEMB7A`,
      secretAccessKey: `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`,
    }

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
  }

  static apiFetch(url) {
    const authHeader = {
      Authorization: `Bearer ${this.getAuthToken()}`
    }
    return RNFetchBlob.config({
      trusty: true /* prevents self-signed certificate rejection */
    })
      .fetch('GET', url, authHeader)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  static getNamespaces = url => {
    const namespacesURL = `/api/v1/namespaces/`;
    const requestURL = url + namespacesURL;

    this.apiFetch(requestURL)
      .then(namespacesObj => {
        return namespacesObj.items.map(namespace => namespace.metadata.name);
      })
      .catch(err => console.log('err: ', err))
  }
}

export default AWSApi;
