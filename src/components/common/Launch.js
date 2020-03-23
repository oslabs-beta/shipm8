import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

const Launch = ({ navigation }) => {
  const getStarted = () => {
    navigation.navigate('Cloud Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/shipm8.png')} style={styles.logo} />
        <Text style={styles.bannerLineOne}>Mobile Kubernetes Monitoring</Text>
        <View style={styles.cloudLogoContainer}>
          <Image
            style={styles.googleCloud}
            source={require('../assets/googleCloud.png')}
          />
          <Text style={styles.textStyle}>+</Text>
          <View style={styles.awsLogoContainer}>
            <Image
              style={styles.awsLogo}
              source={require('../assets/aws_logo.png')}
              resizeMode="contain"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => getStarted()}>
          <View >
            <Text style={styles.getStartedText}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(Launch);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: '1.2rem',
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '70%',
    borderStyle: 'solid',
    borderColor: '#151B54',
    borderWidth: '.2rem',
    borderRadius: '.5rem',
    padding: '.7rem',
    backgroundColor: '#1589FF',
    marginBottom: '3rem',
  },
  bannerLineOne: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#151B54',
  },
  cloudLogoContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '85%',
    alignItems: 'center',
  },
  textStyle: {
    color: '#151B54',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logo: {
    flex: 4,
    justifyContent: 'center',
    width: '100%',
    borderColor: '#151B54',
    borderWidth: '.2rem',
    borderRadius: '.5rem',
    marginTop: '8%',
    marginBottom: '5%',
  },
  googleCloud: {
    flex: 1,
    width: '2.2rem',
    height: '2.2rem',
    marginLeft: 15,
    marginRight: 15,
  },
  awsLogoContainer: {
    flex: 1,
    height: '2.3rem',
    marginBottom: '1rem',
  },
  awsLogo: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
