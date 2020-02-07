import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from 'react-native';
import Login from './Login';

const App = props => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/shipm8_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.textStyle}>Monitor You K8s Cluster Anywhere!</Text>
        <View style={styles.formContainer}>
          <Login navigation={props.navigation.navigate} />
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
    borderColor: '#151B54',
    borderWidth: 3,
    marginBottom: 25,
  },
});
