import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const Launch = ({ navigation }) => {
  const getStarted = () => {
    navigation.navigate('Cloud Login');
  };
  return (
    <View style={styles.container} behavior="padding" enabled>
      <Text style={styles.banner}>Welcome to ShipM8!</Text>

      <Image
        source={require('../../assets/shipm8_logo.png')}
        style={styles.logo}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.textStyle}>Monitor K8s Clusters Anywhere</Text>
        <View style={styles.formContainer} />
        <View style={{ paddingTop: 5 }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.7}
            behavior="padding"
            enabled
            onPress={getStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Launch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  buttonContainer: {
    backgroundColor: '#1589FF',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  banner: {
    fontSize: 50,
    marginBottom: 50,
    fontWeight: 'bold',
    color: '#151B54',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  textStyle: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#151B54',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  logo: {
    width: 315,
    height: 315,
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#151B54',
    borderWidth: 3,
    marginBottom: 25,
  },
  formContainer: {
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
