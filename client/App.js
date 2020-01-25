// hooks might be used in future 
import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, StyleSheet } from 'react-native';


import LoginForm from "./loginForm";


const App = (props) => {
  // by creating a var allows us to conditionally render in the future 
  let content = (
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/squirt.png')} style={styles.logo} />
        <Text style={styles.textStyle}>Monitor You K8s Cluster Anywhere!</Text>
        <View style={styles.formContainer}>
          <LoginForm navigate={props.navigation.navigate} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
  return content
}


export default React.memo(App)
// could be in its own file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
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
    color: 'pink',
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
  }
})