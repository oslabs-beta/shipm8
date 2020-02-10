import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loading from '../common/Loading';
import { setCurrentPod, fetchPods } from '../Pods/PodsSlice';
import { fetchNamespaces, setCurrentNamespace } from '../Clusters/ClustersSlice';

const Pods = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.Pods.isLoading);
  const currentCluster = useSelector(state => state.Clusters.byUrl[state.Clusters.current]);

  const pods = useSelector(state => {
    return state.Pods.byCluster[currentCluster.url]
      ? Object.values(state.Pods.byCluster[currentCluster.url])
      : null;
  });

  useEffect(() => {
    dispatch(fetchPods(currentCluster));
    dispatch(fetchNamespaces(currentCluster));
  }, []);

  const handleNamespaceChange = namespace => {
    dispatch(setCurrentNamespace({ currentCluster, namespace }))
  };

  const handlePodPress = pod => {
    dispatch(setCurrentPod(pod))
    navigation.navigate('Pod Details');
  };

  const createNamespaceList = namespaces => {
    const namespaceList = namespaces.map(namespace => {
      return { value: namespace }
    });
    return [{ value: 'All Namespaces' }, ...namespaceList];
  }

  const renderPods = () => {
    const namespace = currentCluster.currentNamespace;
    if (pods) {
      return pods
        .filter(pod => {
          if (!namespace || namespace === 'All Namespaces') { return true; }
          return pod.metadata.namespace === namespace;
        })
        .map((pod, idx) => {
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
    }
    return [];
  }

  const checkStatus = text => {
    if (text === 'Running') {
      return 'success';
    } else if (text === 'Pending') {
      return 'warning';
    } else {
      return 'error';
    }
  };

  if (isLoading) { return <Loading /> }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.dropDownView}>
          <Dropdown
            label="Select a Namespace"
            data={createNamespaceList(currentCluster.namespaces)}
            value={
              currentCluster.currentNamespace
                ? currentCluster.currentNamespace
                : 'All Namespaces'
            }
            itemCount={4}
            dropdownOffset={styles.dropDownOffset}
            style={styles.dropDown}
            onChangeText={(text) => handleNamespaceChange(text)}
          />
        </View>
        <ScrollView style={styles.podScroll}>
          {renderPods().length > 0 && renderPods()}
          {renderPods().length === 0 && (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 150,
                fontSize: 20,
                color: 'gray',
              }}>No Pods Found</Text>
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
  scrollView: {
    marginHorizontal: 0,
    marginTop: 30,
  },
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
