import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import AwsApi from '../api/AwsApi';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import GoogleCloudApi from '../api/GoogleCloudApi';

// Load FontAwesome icons
Icon.loadFont();

const Login = ({ navigation }) => {
  const [loginState, setLoginState] = useState({
    accessKeyId: '',
    secretAccessKey: '',

  });

  const saveData = async () => {
    await AsyncStorage.setItem('AWSCredentials', JSON.stringify(loginState));
  };

  const checkLogin = () => {
    if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
      saveData();
      AwsApi.fetchEksClusterNames('us-west-2').then(data => {
        if (data) {
          navigation.navigate('Add EKS Cluster');
        } else {
          alert('The Security Token Included in the Request Is Invalid');
        }
      });
    } else {
      alert('Please Input Your AWS Access and Secret Information');
    }
  };

  const checkGKELogin = async () => {
    try {
      const verifyGKE = await GoogleCloudApi.signIn()
      const getToken = await GoogleCloudApi.getAccessToken()
      const getProject = await GoogleCloudApi.getProjects(getToken)
      console.log('HEYYYYYYYYY', getProject)
      navigation('Clusters')
    }
    catch (error) {
      alert(error)
    }
    // if (verifyGKE) {
    //   navigation.navigate('Clusters')
    // }
    // else {
    //   alert('Something Went Wrong Trying to Validate Your Account')
    // }
  }
  return (
    <View style={styles.container}>
      <View style={styles.formOneView}>
        <Input
          onChangeText={text =>
            setLoginState({ ...loginState, accessKeyId: text })
          }
          style={{ marginBottom: 20 }}
          label="Access Key ID"
          placeholder="Enter Access Key ID Here"
          leftIcon={{
            type: 'font-awesome',
            name: 'chevron-right',
            marginRight: 10,
            color: 'gray',
          }}
        />
      </View>
      <View style={styles.formTwoView}>
        <Input
          onChangeText={text =>
            setLoginState({ ...loginState, secretAccessKey: text })
          }
          style={{ marginTop: 20 }}
          label="Secret Access Key"
          placeholder="Enter Secret Access Key Here"
          leftIcon={
            <Icon
              name="lock"
              size={24}
              style={{ marginRight: 10, color: 'gray' }}
            />
          }
        />
      </View>
      <View style={{ paddingTop: 30 }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.7}
          onPress={checkLogin}>
          <Text style={styles.buttonText}>Sign in w/ AWS</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 3 }}>
        <GoogleSigninButton
          style={{ width: 198, height: 52 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={GoogleCloudApi.getToken}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    paddingTop: 35,
  },
  input: {
    height: 40,
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 20,
    width: 200,
    paddingHorizontal: 10,
    color: 'black',
  },
  formOneView: {
    width: 325,
    marginBottom: 15,
  },
  formTwoView: {
    width: 325,
  },
  buttonContainer: {
    backgroundColor: '#1589FF',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    width: 192,
    height: 52,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  addText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
