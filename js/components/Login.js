import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import AsyncStorage from '@react-native-community/async-storage';

import AWSApi from '../api/AWSApi';

// Load FontAwesome icons
Icon.loadFont();

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addApi: (obj) => {
    dispatch(actions.addApi(obj))
  },
});

const url =
  'https://64A4A753714D2EBFF419B6C287DDE8C9.yl4.us-west-2.eks.amazonaws.com';




// state for the changing input fields
const Login = (props) => {
  const [loginState, setLoginState] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });

  const saveData = () => {
    AsyncStorage.setItem('AWSCredentials', JSON.stringify(loginState))
  };

  // this will be verifying the login obviously logic will change (currently any input will login)
  const checkLogin = () => {
    if (loginState.accessKeyId !== '' && loginState.secretAccessKey !== '') {
      saveData()
      props.addApi({
        accessKeyId: loginState.accessKeyId,
        secretAccessKey: loginState.secretAccessKey,
      })
      AWSApi.getEksClusters('us-west-2')
        .then(data => {
          if (data.clusters) {
            props.navigation.navigate('Clusters');
          }
          else {
            alert(data.message)
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
        label="Cluster Info"
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
        label="Api Key"
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(React.memo(Login)));

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
