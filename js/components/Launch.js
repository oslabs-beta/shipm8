import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Launch = ({ navigation }) => {
  const getStarted = () => {
    navigation.navigate('Cloud Login');
  };
  return (
    <View style={styles.container} behavior="padding" enabled>
      <Image source={require('../../assets/SHIPM8.png')} style={styles.logo} />
      <Text style={styles.banner}>Kubernetes Mobile Monitoring</Text>
      <Text style={styles.banner}>with</Text>

      <View style={styles.logoContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image
            style={styles.googleCloud}
            source={require('../../assets/googleCloud.png')}
          />
          <Text style={styles.textStyle}>+</Text>
          <Image
            style={{
              width: 150,
              height: 40,
              backgroundColor: 'white',
              marginTop: 15,
              marginRight: 5,
            }}
            source={require('../../assets/aws.png')}
          />
        </View>
        <View style={styles.formContainer} />
        <View style={{ alignItems: 'center' }}>
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
  },
  buttonContainer: {
    backgroundColor: '#1589FF',
    paddingVertical: 15,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#151B54',
    width: 300,
    marginBottom: 650,
    alignItems: 'center',
  },
  banner: {
    fontSize: 18,
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
    marginTop: 24,
  },
  logo: {
    width: 350,
    height: 400,
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#151B54',
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 580,
    marginBottom: 50,
  },
  formContainer: {
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleCloud: {
    width: 150,
    height: 40,
    backgroundColor: 'white',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 6,
  },
});
