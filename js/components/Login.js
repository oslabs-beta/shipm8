import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Icon as Icon5 } from 'react-native-vector-icons/FontAwesome5';

import EStyleSheet from 'react-native-extended-stylesheet';
import { GoogleSigninButton } from '@react-native-community/google-signin';

import { checkAwsCredentials } from '../reducers/AwsSlice';
import { setCurrentProvider } from '../components/Clusters/ClustersSlice';
import { googleSignIn, fetchGcpProjects } from '../reducers/GoogleCloudSlice';

// Load FontAwesome icons
Icon.loadFont();
EStyleSheet.build();

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });

  const handleAwsLoginPress = async () => {
    if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
      const isValidCredentials = await dispatch(
        checkAwsCredentials(loginState),
      );
      if (isValidCredentials) {
        dispatch(setCurrentProvider('aws'));
        navigation.navigate('Add Cluster');
      } else {
        Alert.alert('The Security Token Included in the Request Is Invalid');
      }
    } else {
      Alert.alert('Please Enter Valid AWS Credentials');
    }
  };

  const handleGoogleSigninPress = async () => {
    const signInStatus = await dispatch(googleSignIn());
    if (signInStatus === true) {
      dispatch(setCurrentProvider('gcp'));
      dispatch(fetchGcpProjects());
      navigation.navigate('Add Cluster');
    } else {
      Alert.alert(signInStatus);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Add Cluster from Provider</Text>
      <Image
        source={require('../../images/google.png')}
        style={styles.googleLogo}
      />
      <View>
        <GoogleSigninButton
          style={styles.googleSignin}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => handleGoogleSigninPress()}
          disabled={false}
        />
      </View>
      <View style={styles.divider}>
        <Divider />
      </View>
      <Image source={require('../../images/aws.png')} style={styles.awsLogo} />
      <View style={styles.formOneView}>
        <Input
          onChangeText={text =>
            setLoginState({ ...loginState, accessKeyId: text })
          }
          label="Access Key ID"
          placeholder="Enter Access Key ID Here"
          leftIcon={<Icon name="chevron-right" size={24} style={styles.icon} />}
        />
      </View>
      <View style={styles.formTwoView}>
        <Input
          onChangeText={text =>
            setLoginState({ ...loginState, secretAccessKey: text })
          }
          label="Secret Access Key"
          placeholder="Enter Secret Access Key Here"
          leftIcon={<Icon name="lock" size={24} style={styles.icon} />}
        />
      </View>
      <View style={styles.awsButtonView}>
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.7}
          onPress={() => handleAwsLoginPress()}>
          <Text style={styles.buttonText}>Sign in with AWS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(Login);

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '135%',
    marginBottom: '-15%',
  },
  awsButtonView: {
    marginTop: '8%',
  },
  icon: {
    marginRight: '1rem',
    color: 'gray',
  },
  textStyle: {
    textAlign: 'center',
    color: '#151B54',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '1%',
    marginBottom: '10%',
  },
  formOneView: {
    width: '135%',
    marginBottom: '1rem',
    backgroundColor: 'white',
  },
  formTwoView: {
    width: '135%',
  },
  buttonContainer: {
    backgroundColor: '#1589FF',
    paddingVertical: '.9rem',
    borderRadius: '.4rem',
    marginTop: '8%',
    width: '13.8rem',
    height: '3rem',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '.95rem',
  },
  googleLogo: {
    width: '60%',
    height: '20%',
    marginBottom: '4%',
  },
  awsLogo: {
    width: '72%',
    height: '34%',
    marginBottom: '-16%',
  },
  googleSignin: {
    width: '14rem',
    height: '3.2rem',
    marginBottom: '1.5rem',
    borderRadius: '.3rem',
  },
});
