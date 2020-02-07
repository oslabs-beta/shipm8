import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import AwsApi from '../api/AwsApi';

// Load FontAwesome icons
Icon.loadFont();

const Login = ({ addApi, navigation }) => {
  const [loginState, setLoginState] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });

  const saveData = async () => {
    await AsyncStorage.setItem('AWSCredentials', JSON.stringify(loginState));
  };

  const checkLogin = () => {
    if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
      saveData()
      AwsApi.fetchEksClusters('us-west-2').then(data => {
        if (data) {
          navigation.navigate('Clusters');
        }
        else {
          alert('The Security Token Included in the Request Is Invalid')
        }
      })
    } else {
      alert('Please Input Your AWS Access and Secret Information');
    }
  };
  return (
    <View style={styles.container}>
      <Input
        onChangeText={text => setLoginState({ ...loginState, accessKeyId: text })}
        style={{ marginBottom: 20 }}
        label="Access Key ID"
        placeholder="Enter Access Key ID Here"
        leftIcon={{
          type: 'font-awesome',
          name: 'chevron-right',
          marginRight: 10,
          color: 'gray',
        }}
      />
      <Input
        onChangeText={text => setLoginState({ ...loginState, secretAccessKey: text })}
        style={{ marginTop: 20 }}
        label="Secret Access Key"
        placeholder="Enter Secret Access Key Here"
        leftIcon={
          <Icon
            name="lock"
            size={24}
            style={{ marginRight: 10, color: 'gray' }}
          />
        }
      />
      <View style={{ paddingTop: 30 }}>
        <TouchableOpacity style={styles.buttonContainer} activeOpacity={.7} onPress={checkLogin}>
          <Text style={styles.buttonText}>Sign in w/ AWS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 325,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
    paddingTop: 35,
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
    width: 175
  },
  addText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
