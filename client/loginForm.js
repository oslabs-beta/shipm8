import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Text, Button } from 'react-native';

// state for the changing input fields
const LoginForm = (props) => {
    const [loginState, setLoginState] = useState({
        validIP: '',
        validAPI: '',
    });
    // this will be verifying the login obviously logic will change (currently any input will login) 
    const checkLogin = () => {
        if (loginState.validIP !== '' && loginState.validAPI !== undefined) {
            props.navigate('MainPage')
        }
        else {
            alert('Invalid Cluster and/or API Token')
        }
    }
    // again we use a var to allow for potential conditional rendering
    let content = (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                selectionColor='purple'
                placeholder='Cluster IP'
                onChangeText={(text) => setLoginState({ validIP: text })} />
            <TextInput
                style={styles.input}
                selectionColor='purple'
                placeholder='API Token'
                onChangeText={(text) => setLoginState({ ...loginState, validAPI: text })} />
            <TouchableOpacity style={styles.buttonContainer} onPress={checkLogin}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.awsButton}>
                <Text style={styles.buttonText} onPress={() => alert('AWS Server is Currently Inactive')}   >Sign in w/ AWS</Text>
            </TouchableOpacity>
        </View>
    )

    return content
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
    }
});


export default React.memo(LoginForm);