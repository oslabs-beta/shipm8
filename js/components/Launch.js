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
      <Image source={require('../../images/SHIPM8.png')} style={styles.logo} />
      <Text style={styles.bannerLineOne}>Mobile Kubernetes Monitoring</Text>
      <View style={styles.cloudLogoContainer}>
        <Image
          style={styles.googleCloud}
          source={require('../../images/googleCloud.png')}
        />
        <Text style={styles.textStyle}>+</Text>
        <Image
          style={styles.awsLogo}
          source={require('../../images/aws.png')}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => getStarted()}>
        <View >
          <Text style={styles.getStartedText}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Launch);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
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
  awsLogo: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
});
