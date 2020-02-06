import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const PodInfo = ({ navigation }) => {
  const [currentPod, setCurrentPod] = useState({});

  useEffect(() => {
    getCurrentPod();
  }, []);

  const getCurrentPod = async () => {
    const currentPod = await AsyncStorage.getItem('currentPod').then(data =>
      JSON.parse(data),
    );
    setCurrentPod(currentPod);
  };

  const checkStatus = text => {
    if (text === 'Running') {
      return 'success';
    } else if (text === 'Pending') {
      return 'warning';
    } else {
      return 'error';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.podScroll}>
        {currentPod ? (
          <View style={styles.outerTextView}>
            <View style={styles.innerTextView}>
              <Image
                source={require('../../assets/podDetails.png')}
                style={styles.logo}
              />
              <Text style={styles.text}>
                apiVersion: <Text style={styles.innerText}>v1</Text>
              </Text>
              <Text style={styles.text}>
                Kind: <Text style={styles.innerText}>Pod</Text>
              </Text>
              <Text style={styles.text}>
                Name:{' '}
                <Text style={styles.innerText}>
                  {currentPod.metadata ? currentPod.metadata.name : 'Loading'}
                </Text>
              </Text>
              <Text style={styles.text}>
                Status:{' '}
                <Text style={styles.innerText}>
                  {currentPod.metadata ? currentPod.status.phase : 'Loading'}
                </Text>
                <Badge
                  status={checkStatus(currentPod.phase)}
                  badgeStyle={styles.badge}
                />
              </Text>
              <Text style={styles.text}>
                Time Created:{' '}
                <Text style={styles.innerText}>
                  {currentPod.metadata
                    ? currentPod.metadata.creationTimestamp
                    : 'Loading'}
                </Text>
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
              <Text style={styles.text}>
                Host IP:{' '}
                <Text style={styles.innerText}>
                  {currentPod.metadata ? currentPod.status.hostIP : 'Loading'}
                </Text>
              </Text>
              <Text style={styles.text}>
                Pod IP:{' '}
                <Text style={styles.innerText}>
                  {currentPod.metadata ? currentPod.status.podIP : 'Loading'}
                </Text>
              </Text>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
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
  );
};

export default React.memo(PodInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  podScroll: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'navy',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20,
    height: 590,
    color: 'white',
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    height: '90%',
    marginTop: 40,
  },
  text: {
    fontSize: 18,
    marginBottom: 30,
    color: 'gray',
    overflow: 'scroll',
    borderStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  outerTextView: {
    marginHorizontal: 10,
    marginTop: -15,
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
  badge: {
    marginLeft: 8,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 250,
    marginTop: 20,
    marginBottom: -50,
  },
});
