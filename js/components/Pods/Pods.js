import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { fetchNamespaces, setCurrentNamespace, setCurrentPod } from '../Clusters/ClustersSlice';

const Pods = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentCluster = useSelector(state => state.Clusters.byUrl[state.Clusters.current]);
  const pods = useSelector(state => Object.values(state.Pods.byCluster[currentCluster.url]));
  const [podsList, setPodsList] = useState(pods);

  useEffect(() => {
    dispatch(fetchNamespaces(currentCluster));
    handleNamespaceChange(currentCluster.currentNamespace);
  }, []);

  const handleNamespaceChange = namespace => {
    dispatch(setCurrentNamespace({ currentCluster, namespace }))
    if (namespace === 'All Namespaces') {
      setPodsList(pods);
    } else {
      setPodsList(pods
        .filter(pod => pod.namespace === namespace))
    }
  };

  const handlePodPress = async pod => {
    dispatch(setCurrentPod(pod))
    navigation.navigate('Pod Details');
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
  console.log('pods: ,', pods)
  const podsDisplay =
    podsList && podsList.length > 0
      ? podsList.map((pod, idx) => {
        return (
          <TouchableOpacity
            key={pod.metadata.name + idx}
            style={styles.podContainer}
            activeOpacity={0.7}
            onPress={() => handlePodPress(pod)}>
            <Image
              source={require('../../../assets/pod.png')}
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
          </TouchableOpacity>
        );
      })
      : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.dropDownView}>
          <Dropdown
            label="Select a Namespace"
            value={'All Namespaces'}
            data={[...currentCluster.namespaces, { value: 'All Namespaces' }]}
            itemCount={4}
            dropdownOffset={styles.dropDownOffset}
            style={styles.dropDown}
            onChangeText={handleNamespaceChange}
          />
        </View>
        <ScrollView style={styles.podScroll}>
          {podsDisplay.length > 0 ? (
            podsDisplay
          ) : (
              <ActivityIndicator size="large" style={{ marginTop: 230 }} />
            )}
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
  },
  dropDownView: {
    width: '90%',
    alignSelf: 'center',
  },
  dropDownOffset: {
    top: 15,
    left: 0,
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
