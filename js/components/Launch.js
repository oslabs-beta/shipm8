import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { withNavigation } from 'react-navigation';

// Load FontAwesome icons
Icon.loadFont();

// state for the changing input fields
const Launch = ({ navigation }) => {
  // this will be the launch function
  const getStarted = () => {
    navigation.navigate('ShipM8');
  };
  return (
    <View style={styles.container} behavior="padding" enabled>
      <Image
        source={require('../../assets/shipm8_logo.png')}
        style={styles.logo}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.textStyle}>Monitor Your K8s Clusters Anywhere!</Text>
        <View style={styles.formContainer}>
        </View>
        <View style={{ paddingTop: 5 }}>
          <TouchableOpacity style={styles.buttonContainer} behavior="padding" enabled onPress={getStarted}>
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
    marginTop: 10,
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
    borderStyle: 'solid',
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