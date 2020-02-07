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
import { Badge, Divider } from 'react-native-elements';
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
    console.log(currentPod);
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
                source={require('../../assets/pod.png')}
                style={styles.podLogo}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.text} numberOfLines={2}>
                  apiVersion: <Text style={styles.innerText}>v1</Text>
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={1}>
                  Kind: <Text style={styles.innerText}>Pod</Text>
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={2}>
                  Name:{' '}
                  <Text style={styles.innerText}>
                    {currentPod.metadata ? currentPod.metadata.name : 'Loading'}
                  </Text>
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={2}>
                  Status:{' '}
                  <Text style={styles.innerText}>
                    {currentPod.metadata ? currentPod.status.phase : 'Loading'}
                  </Text>
                  <Badge
                    status={checkStatus(currentPod.status.phase)}
                    badgeStyle={styles.badge}
                  />
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={2}>
                  Time Created:{' '}
                  <Text style={styles.innerText}>
                    {currentPod.metadata
                      ? currentPod.metadata.creationTimestamp
                      : 'Loading'}
                  </Text>
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={2}>
                  Self-Link:{' '}
                  <Text style={styles.innerText}>
                    {currentPod.metadata
                      ? currentPod.metadata.selfLink
                      : 'Loading'}
                  </Text>{' '}
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={2}>
                  UID:{' '}
                  <Text style={styles.innerText}>
                    {currentPod.metadata ? currentPod.metadata.uid : 'Loading'}
                  </Text>{' '}
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={2}>
                  Host IP:{' '}
                  <Text style={styles.innerText}>
                    {currentPod.metadata ? currentPod.status.hostIP : 'Loading'}
                  </Text>
                </Text>
                <Divider />
                <Text style={styles.text} numberOfLines={2}>
                  Pod IP:{' '}
                  <Text style={styles.innerText}>
                    {currentPod.metadata ? currentPod.status.podIP : 'Loading'}
                  </Text>
                </Text>
              </View>
              <Divider />
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
    borderColor: '#063CB9',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 32,
    height: 590,
    width: 380,
    alignSelf: 'center',
    marginHorizontal: 4,
    color: 'white',
  },
  safeArea: {
    backgroundColor: 'white',
    height: '95%',
  },
  text: {
    fontSize: 15.1,
    marginBottom: 15,
    marginTop: 20,
    color: 'gray',
  },
  outerTextView: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  innerTextView: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 5,
    height: '100%',
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 20,
    width: '24%',
    alignSelf: 'center',
  },
  innerText: {
    color: 'black',
    overflow: 'scroll',
  },
  badge: {
    marginLeft: 8,
    marginBottom: 3,
  },
  podLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: -9,
  },
  header: {
    fontSize: 29,
    textAlign: 'left',
    marginTop: -70,
    marginBottom: 45,
  },
});
