import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

// Load FontAwesome icons
Icon.loadFont();

// state for the changing input fields
const LoginForm = ({ navigation }) => {
  const [loginState, setLoginState] = useState({
    validIP: '',
    validAPI: '',
  });

  // this will be verifying the login obviously logic will change (currently any input will login) 
  const checkLogin = () => {
    if (loginState.validIP !== '' && loginState.validAPI !== '') {
      navigation.navigate('Main')
    }
    else {
      alert('Invalid Cluster and/or API Token')
    }
  }
  return (
    <View style={styles.container}>
      <Input
        onChangeText={(text) => setLoginState({ ...loginState, validIP: text })}
        label='Cluster Info'
        placeholder='Enter Cluster Info Here'
        leftIcon={{
          type: 'font-awesome',
          name: 'chevron-right',
          marginRight: 10,
          color: 'gray',
        }}
      />
      <Input
        onChangeText={(text) => setLoginState({ ...loginState, validAPI: text })}
        style={{ marginTop: 20 }}
        label='Api Key'
        placeholder='Enter API Key Here'
        leftIcon={
          <Icon
            name='lock'
            size={24}
            style={{ marginRight: 10, color: 'gray' }}
          />
        }
      />
      <View style={{ paddingTop: 30 }} >
        <TouchableOpacity style={styles.buttonContainer} onPress={checkLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.awsButton}>
          <Text style={styles.buttonText} onPress={() => alert('AWS Server is Currently Inactive')}  >Sign in w/ AWS</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 325,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
    paddingTop: 50,
  },
  input: {
    height: 40,
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 20,
    width: 200,
    paddingHorizontal: 10,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: "green",
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
  awsButton: {
    paddingTop: 10,
    backgroundColor: 'black',
    paddingVertical: 15,
    marginTop: 10,
    width: 200
  }
});
