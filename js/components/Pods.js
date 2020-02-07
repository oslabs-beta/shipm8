import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwsApi from '../api/AwsApi';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const Pods = ({ navigation }) => {
  const [namespaces, setNamespaces] = useState([]);
  const [podsList, setPodsList] = useState([]);

  useEffect(() => {
    getNamespaces();
  }, []);

  const getNamespaces = async () => {
    const currentCluster = await AsyncStorage.getItem(
      'currentCluster',
    ).then(data => JSON.parse(data));
    const clusters = await AsyncStorage.getItem('ClustersStore').then(data =>
      JSON.parse(data),
    );
    const namespaces = clusters[currentCluster.name].namespaces;
    const namespaceList = namespaces.map(namespace => {
      return {
        value: namespace,
      };
    });
    setNamespaces(namespaceList);
    handleNamespaceChange(namespaces[0]);
  };

  const handleNamespaceChange = async text => {
    const currentCluster = await AsyncStorage.getItem(
      'currentCluster',
    ).then(cluster => JSON.parse(cluster));
    const pods = await AwsApi.fetchAllPodsInfo(
      currentCluster.name,
      currentCluster.endpointUrl,
      text,
    );
    setPodsList(pods.items);
    await AsyncStorage.setItem(
      'currentCluster',
      JSON.stringify({
        ...currentCluster,
        pods,
      }),
    );
  };

  const handlePodPress = async pod => {
    await AsyncStorage.setItem('currentPod', JSON.stringify(pod));
    navigation.navigate('Details');
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

  const podsDisplay = [];

  podsList.length > 0
    ? podsList.forEach((pod, idx) => {
        podsDisplay.push(
          <TouchableOpacity
            key={pod.metadata.name + idx}
            style={styles.podContainer}
            activeOpacity={0.7}
            onPress={e => handlePodPress(pod)}>
            <Image
              source={require('../../assets/pod.png')}
              style={styles.logo}
            />
            <Text style={styles.podText} numberOfLines={1}>
              {pod.metadata.name}
            </Text>
            <Text style={styles.statusText}>{pod.status.phase}</Text>
            <Badge
              status={checkStatus(pod.status.phase)}
              badgeStyle={styles.badge}
            />
            <Icon
              name="chevron-right"
              size={15}
              color="gray"
              style={styles.arrow}
            />
          </TouchableOpacity>,
        );
      })
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Dropdown
          label="Select a Namespace"
          value={namespaces.length > 0 ? namespaces[0].value : ''}
          data={namespaces}
          itemCount={3}
          dropdownOffset={styles.dropDownOffset}
          style={styles.dropDown}
          onChangeText={handleNamespaceChange}
        />
        <ScrollView style={styles.podScroll}>
          {podsDisplay.length > 0 ? podsDisplay : <Text>Loading...</Text>}
        </ScrollView>

        <View style={styles.buttonView}>
          <Button
            style={styles.signOut}
            color="red"
            title="Sign Out"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Pods);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  test: {
    textAlign: 'center',
    fontSize: 20,
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    height: '100%',
    marginTop: -11,
  },
  scrollView: { marginHorizontal: 0, marginTop: 30 },
  namespacePickText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signOut: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  buttonView: {
    marginTop: 20,
  },
  dropDown: {
    textAlign: 'center',
    alignItems: 'center',
    width: 20,
    fontSize: 18,
  },
  podScroll: {
    borderRadius: 5,
    marginTop: 10,
    height: 600,
  },
  podContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: 6,
    height: 48,
    width: '96%',
    paddingVertical: 12,
    paddingLeft: 6,
    borderStyle: 'solid',
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignContent: 'center',
  },
  podText: {
    fontSize: 16,
    marginLeft: 7,
    width: 200,
    marginRight: 25,
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: 16,
    backgroundColor: 'white',
    color: 'gray',
  },
  arrow: {
    marginLeft: 8,
    marginTop: 4,
  },
  badge: {
    marginLeft: 8,
    marginTop: 7,
  },
  logo: {
    width: 38,
    height: 38,
    marginTop: -7,
  },
});
