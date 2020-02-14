import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import Loading from '../common/Loading';
import { setCurrentPod, fetchPods } from '../Pods/PodsSlice';
import {
  fetchNamespaces,
  setCurrentNamespace,
} from '../Clusters/ClustersSlice';

const Pods = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.Pods.isLoading);
  const currentCluster = useSelector(
    state => state.Clusters.byUrl[state.Clusters.current],
  );

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
    dispatch(setCurrentNamespace({ currentCluster, namespace }));
  };

  const handlePodPress = pod => {
    dispatch(setCurrentPod(pod));
    navigation.navigate('Pod Details');
  };

  const createNamespaceList = namespaces => {
    const namespaceList = namespaces.map(namespace => {
      return { value: namespace };
    });
    return [{ value: 'All Namespaces' }, ...namespaceList];
  };

  const renderPods = () => {
    const namespace = currentCluster.currentNamespace;
    if (pods) {
      return pods
        .filter(pod => {
          if (!namespace || namespace === 'All Namespaces') {
            return true;
          }
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
        });
    }
    return [];
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
          onChangeText={text => handleNamespaceChange(text)}
        />
      </View>
      {!pods && isLoading && (
        <ScrollView style={styles.podScroll}>
          <Loading />
        </ScrollView>
      )}
      <ScrollView style={styles.podScroll}>
        {renderPods().length > 0 && renderPods()}
        {renderPods().length === 0 && (
          <Text style={styles.noPodsFound}>No Pods Found</Text>
        )}
      </ScrollView>
      <View style={styles.signOut}>
        <Button
          color="red"
          title="Sign Out"
          onPress={() => navigation.navigate('Cloud Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Pods);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: '3%',
    height: '100%',
  },
  dropDownView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '8%',
    backgroundColor: 'white',
  },
  dropDownOffset: {
    top: 15,
    left: 0,
  },
  dropDown: {
    textAlign: 'center',
    alignItems: 'center',
  },
  noPodsFound: {
    textAlign: 'center',
    marginTop: '9rem',
    fontSize: '1.3rem',
    color: 'gray',
  },
  podScroll: {
    marginTop: '3%',
    borderRadius: 5,
    marginBottom: '.2rem',
    backgroundColor: 'white',
    marginBottom: '1.2rem',
  },
  podContainer: {
    marginTop: '.7rem',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: '3rem',
    width: '96%',
    paddingLeft: '1%',
    borderStyle: 'solid',
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: '2.4rem',
    height: '2.4rem',
  },
  podText: {
    fontSize: '1rem',
    marginLeft: '.5rem',
    width: '12.2rem',
    marginRight: '1.2rem',
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: '1rem',
    backgroundColor: 'white',
    color: 'gray',
    textAlign: 'right',
  },
  badge: {
    marginLeft: '.6rem',
    marginTop: '.1rem',
    marginRight: '.2rem',
  },
  arrow: {
    marginLeft: '.4rem',
    marginTop: '.2rem',
  },
  signOut: {
    marginTop: '1.2rem',
    backgroundColor: 'white',
    width: '30%',
    alignSelf: 'center',
  },
});
