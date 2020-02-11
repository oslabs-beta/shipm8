import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import GoogleCloudApi from '../api/GoogleCloudApi';
import { checkCredentials } from '../components/AwsSlice';

// Load FontAwesome icons
Icon.loadFont();

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });

  const checkLogin = async () => {
    if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
      const isValidCredentials = await dispatch(checkCredentials(loginState));
      isValidCredentials
        ? navigation.navigate('Add Cluster')
        : alert('The Security Token Included in the Request Is Invalid');
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Add Cluster from Provider</Text>
      <Image
        source={require('../../assets/google.png')}
        style={styles.googleLogo}
      />
      <View style={styles.googleButtonView}>
        <GoogleSigninButton
          style={styles.googleSignin}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={GoogleCloudApi.signIn}
          disabled={false}
        />
      </View>
      <View style={styles.divider}>
        <Divider />
      </View>
      <Image source={require('../../assets/aws.png')} style={styles.awsLogo} />
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
      <View style={styles.awsButtonView}>
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.7}
          onPress={checkLogin}>
          <Text style={styles.buttonText}>Sign in with AWS</Text>
        </TouchableOpacity>
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
  divider: {
    width: 320,
    marginBottom: -40,
  },
  awsButtonView: {
    paddingTop: 30,
  },
  googleButtonView: {
    paddingTop: 3,
  },
  textStyle: {
    textAlign: 'center',
    color: '#151B54',
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 10,
    backgroundColor: 'white',
  },
  formTwoView: {
    width: 325,
  },
  buttonContainer: {
    backgroundColor: '#1589FF',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    width: 220,
    height: 48,
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
  googleLogo: {
    width: 175,
    height: 175,
  },
  awsLogo: {
    width: 225,
    height: 220,
    marginBottom: -50,
  },
  googleSignin: {
    width: 225,
    height: 55,
    marginBottom: 30,
    borderRadius: 15,
  },
});
