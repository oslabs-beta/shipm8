import { Base64 } from 'js-base64';
import { sign } from '../utils/aws4';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

class AwsApi {

  /**
   * 
   * AWS Kubernetes API Authorization from Outside a Cluster:
   * https://github.com/kubernetes-sigs/aws-iam-authenticator#api-authorization-from-outside-a-cluster
   *
   */

  static getAuthToken = async clusterName => {
    /* Declare options for STS API Query */
    try {
      const queryOptions = {
        host: 'sts.amazonaws.com',
        service: 'sts',
        path: `/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Expires=60`,
        headers: {
          'x-k8s-aws-id': clusterName,
        },
        signQuery: true,
      };
      const credentials = await this.getCredentials();
      /* Sign STS API Query with AWS4 Signature */
      const signedQuery = sign(queryOptions, credentials);
      /* Pull out signed host & path */
      const signedURL = `https://${signedQuery.host}${signedQuery.path}`;
      /* Base64 encode signed URL */
      const encodedURL = Base64.encodeURI(signedURL);
      /* Remove any Base64 encoding padding */
      const token = encodedURL.replace(/=+$/, ``);
      /* Prepend result with required string */
      const authToken = `k8s-aws-v1.${token}`;
      return authToken;
    } catch (err) {
      console.log('err: ', err)
    }
  };

  static getCredentials = async () => {
    try {
      const credentials = await AsyncStorage.getItem('AWSCredentials');
      return JSON.parse(credentials);
    } catch (err) {
      console.log(err);
    }
  }

  static apiFetch = async (url, clusterName) => {
    const authHeader = {
      Authorization: `Bearer ${await this.getAuthToken(clusterName)}`,
    };
    try {
      const res = await RNFetchBlob.config({
        trusty: true,
      })
        .fetch('GET', url, authHeader);
      return res.json();
    }
    catch (err) {
      console.log(err);
    }
  };

  static eksFetch = async (region, path) => {
    const queryOptions = {
      host: `eks.${region}.amazonaws.com`,
      path: path,
    };
    const credentials = await this.getCredentials();
    const query = sign(queryOptions, credentials);
    try {
      const res = await fetch(`https://eks.${region}.amazonaws.com${path}`, {
        headers: query.headers,
      });
      return res.json();
    }
    catch (err) {
      return console.log('err: ', err);
    }
  };

  static fetchEksClusterNames = async region => {
    try {
      const clusters = await this.eksFetch(region, `/clusters`);
      return clusters.clusters;
    }
    catch (err) {
      return console.log('err: ', err);
    }
  };

  static describeAllEksClusters = async region => {
    try {
      const clusterNameList = await this.fetchEksClusterNames(region);
      const clusterList = await Promise.all(clusterNameList.map(async clusterName => {
        const cluster = await this.eksFetch(region, `/clusters/${clusterName}`);
        const newCluster = {
          url: cluster.cluster.endpoint,
          name: cluster.cluster.name,
          status: cluster.cluster.status,
          createdAt: cluster.cluster.createdAt,
          cloudProvider: 'Aws',
        }
        return newCluster;
      }));
      return clusterList;
    }
    catch (err) {
      return console.log('err: ', err);
    }
  };
}

export default AwsApi;
