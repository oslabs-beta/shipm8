import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build(); // need this to be in

const Launch = ({ navigation }) => {
  const getStarted = () => {
    navigation.navigate('Cloud Login');
  };
  return (
    <View style={styles.container} behavior="padding" enabled>
      <Image source={require('../../assets/SHIPM8.png')} style={styles.logo} />
      <Text style={styles.bannerLineOne}>Kubernetes Mobile Monitoring</Text>
      <Text style={styles.bannerLineTwo}>with</Text>

      <View style={styles.cloudLogoContainer}>
        <Image
          style={styles.googleCloud}
          source={require('../../assets/googleCloud.png')}
        />
        <Text style={styles.textStyle}>+</Text>
        <Image
          style={styles.awsLogo}
          source={require('../../assets/aws.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(Launch);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
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
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#1589FF',
    marginBottom: '5.5rem',
  },
  bannerLineOne: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#151B54',
    textAlign: 'center',
  },
  bannerLineTwo: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#151B54',
    textAlign: 'center',
    marginBottom: '-1rem',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: '.3rem',
  },
  cloudLogoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textStyle: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#151B54',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginTop: '8%',
  },
  logo: {
    width: '24rem',
    height: '28rem',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#151B54',
    borderWidth: '.2rem',
    borderRadius: '.2rem',
    marginTop: '8%',
    marginBottom: '10%',
  },
  googleCloud: {
    width: '37%',
    height: '27%',
    backgroundColor: 'white',
    marginRight: '4%',
    marginTop: '8.5%',
    marginLeft: '-.4rem',
  },
  awsLogo: {
    width: '38%',
    height: '39%',
    backgroundColor: 'white',
    marginTop: '1.6rem',
  },
});
