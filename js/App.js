import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from 'react-native';
import AWSApi from './api/AWSApi';
import Login from './components/Login';

AWSApi.apiFetch(
  'https://64A4A753714D2EBFF419B6C287DDE8C9.yl4.us-west-2.eks.amazonaws.com/api/v1/namespaces',
);

const App = props => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/shipm8_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.textStyle}>Monitor You K8s Cluster Anywhere!</Text>
        <View style={styles.formContainer}>
          <Login />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: '#151B54',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  logo: {
    width: 175,
    height: 175,
    borderStyle: 'solid',
    borderColor: '#151B54',
    borderWidth: 3,
    marginBottom: 25,
  },
});
