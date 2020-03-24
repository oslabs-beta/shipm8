import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Dimensions,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GoogleSigninButton } from '@react-native-community/google-signin';

import { checkAwsCredentials } from '../../reducers/AwsSlice';
import { setCurrentProvider } from '../../reducers/ClustersSlice';
import { googleSignIn, fetchGcpProjects } from '../../reducers/GoogleCloudSlice';

Icon.loadFont();
EStyleSheet.build();

const { height, width } = Dimensions.get('window');

const CloudLogin = ({ navigation }) => {
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });

  const handleAwsLoginPress = async () => {
    if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
      const isValidCredentials = await dispatch(
        checkAwsCredentials(loginState)
      );
      if (isValidCredentials) {
        dispatch(setCurrentProvider('aws'));
        navigation.navigate('Add Cluster');
      } else {
        Alert.alert('Invalid Credentials', 'Please enter valid access keys and ensure you have correct permissions.');
      }
    } else {
      Alert.alert('Invalid Entry', 'Please enter Access Key ID and Secret Access Key.');
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
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.textStyle}>Add Cluster from Provider</Text>
        <View style={styles.googleLogoContainer}>
          <Image
            source={require('../../assets/google.png')}
            style={styles.googleLogo}
          />
        </View>
        <View style={styles.googleSignInContainer}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSigninPress}
          />
        </View>
        <View style={styles.divider}>
          <Divider />
        </View>
        <View style={styles.awsLogoContainer}>
          <Image source={require('../../assets/aws_logo.png')} style={styles.awsLogo} />
        </View>
        <View style={styles.awsInputView}>
          <View style={styles.accessKeyIdInput}>
            <Input
              style={styles.accessKeyIdInput}
              onChangeText={text =>
                setLoginState({ ...loginState, accessKeyId: text })
              }
              label="Access Key ID"
              placeholder="Enter Access Key ID Here"
              leftIcon={<Icon name="chevron-right" size={24} style={styles.icon} />}
            />
          </View>
          <View style={styles.secretAccessKeyIdInput} >
            <Input
              style={styles.secretAccessKeyIdInput}
              onChangeText={text =>
                setLoginState({ ...loginState, secretAccessKey: text })
              }
              label="Secret Access Key"
              placeholder="Enter Secret Access Key Here"
              leftIcon={<Icon name="lock" size={24} style={styles.icon} />}
            />
          </View>
        </View>
        <View style={styles.awsButtonContainer} >
          <TouchableHighlight
            style={styles.awsButton}
            underlayColor={'#1621CF'}
            onPress={() => handleAwsLoginPress()}>
            <Text style={styles.buttonText}>Sign in with AWS</Text>
          </TouchableHighlight>
        </View>
      </View>
    </KeyboardAvoidingView >
  );
};

export default React.memo(CloudLogin);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: width,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  textStyle: {
    textAlign: 'center',
    color: '#151B54',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '2 rem',
  },
  googleLogoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  googleSignInContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  awsLogoContainer: {
    flex: 1,
    width: '35%',
  },
  divider: {
    width: '85%',
  },
  icon: {
    marginRight: '0.8rem',
    color: 'gray',
  },
  awsInputView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  accessKeyIdInput: {
    flex: 1,
    width: width - (0.15 * width),
    paddingBottom: '1.5rem',
  },
  secretAccessKeyIdInput: {
    flex: 1,
    width: width - (0.15 * width),
    paddingTop: '1rem',
  },
  awsButtonContainer: {
    flex: 1,
    paddingBottom: '2rem',
    paddingTop: '2.5rem',
  },
  awsButton: {
    backgroundColor: '#1589FF',
    justifyContent: 'center',
    borderRadius: '.2rem',
    width: 250,
    height: 43,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  googleLogo: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  awsLogo: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
});
