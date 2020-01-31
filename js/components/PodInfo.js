import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

mapStateToProps = state => ({});

const PodInfo = ({ navigation }) => {
  const [currentPod, setCurrentPod] = useState({});

  useEffect(() => {
    getCurrentPod();
  }, []);

  const getCurrentPod = async () => {
    const currentPod = await AsyncStorage.getItem('currentPod').then(data => JSON.parse(data));
    setCurrentPod(currentPod);
    console.log('currentpod:', currentPod)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.podScroll}>
        {currentPod ? (<View style={styles.outerTextView}>
          <View style={styles.innerTextView}>
            <Text style={styles.text}>
              apiVersion: <Text style={styles.innerText}>v1</Text>
            </Text>
            <Text style={styles.text}>
              Kind: <Text style={styles.innerText}>Pod</Text>
            </Text>
            <Text style={styles.text}>
              Name: <Text style={styles.innerText}>{currentPod.metadata ? currentPod.metadata.name : 'Loading'}</Text>
            </Text>
            <Text style={styles.text}>
              Status: <Text style={styles.innerText}>{currentPod.metadata ? currentPod.status.phase : 'Loading'}</Text>
            </Text>
            <Text style={styles.text}>
              Time Created:{' '}
              <Text style={styles.innerText}>{currentPod.metadata ? currentPod.metadata.creationTimestamp : 'Loading'}</Text>
            </Text>
            <Text style={styles.text}>
              Self-Link:{' '}
              <Text style={styles.innerText}>
                /api/v1/namespaces/default/pods/shipm8
              </Text>{' '}
            </Text>
            <Text style={styles.text}>
              UID:{' '}
              <Text style={styles.innerText}>
                287db3d7-422e-11ea-a037-02b853562b6a
              </Text>{' '}
            </Text>
            {/* <Text style={styles.text}>Labels: </Text> */}
            <Text style={styles.text}>Host IP: <Text style={styles.innerText}>{currentPod.metadata ? currentPod.status.hostIP : 'Loading'}</Text></Text>
          </View>
        </View>)
          : <Text>Loading...</Text>}
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          style={styles.signOut}
          title="Sign Out"
          color="red"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  podScroll: {
    backgroundColor: '#D0D3D4',
    borderStyle: 'solid',
    borderColor: 'navy',
    borderWidth: 2,
    borderRadius: 3,
    marginTop: 10,
    height: 583,
    color: 'white',
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    height: '90%',
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
    overflow: 'scroll',
  },
  outerTextView: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  innerTextView: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    height: '100%',
    overflow: 'scroll',
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 20,
  },
  innerText: {
    color: 'black',
  },
});

export default connect(mapStateToProps)(React.memo(PodInfo));
