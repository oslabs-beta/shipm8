import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Badge, Divider } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const PodInfo = ({ navigation }) => {
  const currentPod = useSelector(
    state => state.pods.byCluster[state.clusters.current][state.pods.current],
  );

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
        <View style={styles.outerTextView}>
          <View style={styles.innerTextView}>
            <Image
              source={require('../../assets/pod.png')}
              style={styles.podLogo}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.text} numberOfLines={2}>
                Name:{' '}
                <Text style={styles.innerText}>{currentPod.metadata.name}</Text>
              </Text>
              <Divider />
              <Text style={styles.text} numberOfLines={2}>
                Namespace:{' '}
                <Text style={styles.innerText}>
                  {currentPod.metadata.namespace}
                </Text>
              </Text>
              <Divider />
              <Text style={styles.text} numberOfLines={1}>
                Status:{' '}
                <Text style={styles.innerText}>{currentPod.status.phase}</Text>
                <View style={{ marginBottom: 2, marginLeft: 10 }}>
                  <Badge status={checkStatus(currentPod.status.phase)} />
                </View>
              </Text>
              <Divider />
              <Text style={styles.text} numberOfLines={2}>
                Host IP:{' '}
                <Text style={styles.innerText}>{currentPod.status.hostIP}</Text>
              </Text>
              <Divider />
              <Text style={styles.text} numberOfLines={2}>
                Pod IP:{' '}
                <Text style={styles.innerText}>{currentPod.status.podIP}</Text>
              </Text>
              <Divider />
              <Text style={styles.text} numberOfLines={2}>
                Time Created:{' '}
                <Text style={styles.innerText}>
                  {currentPod.metadata.creationTimestamp}
                </Text>
              </Text>
              <Divider />
              <Text style={styles.text} numberOfLines={4}>
                Labels:{' '}
                <Text style={styles.innerText}>
                  {Object.keys(currentPod.metadata.labels).length > 0 &&
                    Object.keys(currentPod.metadata.labels).map(label => {
                      return `${label}:${currentPod.metadata.labels[label]}`;
                    })}
                </Text>{' '}
              </Text>
              <Divider />
              <Text style={styles.text} numberOfLines={2}>
                UID:{' '}
                <Text style={styles.innerText}>{currentPod.metadata.uid}</Text>{' '}
              </Text>
              <Divider />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(PodInfo);

const styles = EStyleSheet.create({
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
    marginTop: '5%',
    marginHorizontal: '0%',
    color: 'white',
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: '3%',
    height: '100%',
  },
  text: {
    fontSize: '.95rem',
    marginBottom: '1rem',
    marginTop: '1.4rem',
    color: 'gray',
  },
  outerTextView: {
    marginHorizontal: '3%',
    marginTop: '2%',
  },
  innerTextView: {
    backgroundColor: 'white',
    marginTop: '6%',
    borderRadius: 5,
    height: '100%',
  },
  innerText: {
    color: 'black',
    overflow: 'scroll',
  },

  podLogo: {
    width: '7rem',
    height: '7rem',
    alignSelf: 'center',
    marginTop: '-1rem',
  },
});
