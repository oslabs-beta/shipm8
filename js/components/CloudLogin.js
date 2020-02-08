import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from 'react-native';
import Login from './Login';

const CloudLogin = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/shipm8_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.textStyle}>Monitor K8s Clusters Anywhere</Text>
        <View style={styles.formContainer}>
          <Login navigation={navigation} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(CloudLogin);

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
    borderColor: '#151B54',
    borderWidth: 3,
    marginBottom: 25,
  },
});
