import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import EStyleSheet from 'react-native-extended-stylesheet';

import Loading from '../common/Loading';
import SwipeableList from '../common/SwipeableList';
import AlertUtils from '../../utils/AlertUtils';
import { setCurrentPod, fetchPods, deletePod } from './PodsSlice';
import { setCurrentNamespace } from '../Clusters/ClustersSlice';

const PodsDisplay = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.Pods.isLoading);
  const currentCluster = useSelector(
    state => state.Clusters.byUrl[state.Clusters.current],
  );
  const currentNamespace = useSelector(
    state => state.Clusters.byUrl[state.Clusters.current].currentNamespace
  );

  useEffect(() => {
    dispatch(fetchPods(currentCluster));
  }, [currentCluster, dispatch]);

  const filterPods = podsToFilter => {
    return podsToFilter
      .filter(pod => {
        if (!currentNamespace || currentNamespace === 'All Namespaces') { return true; }
        return pod.metadata.namespace === currentNamespace;
      });
  };

  const pods = useSelector(state => {
    if (state.Pods.byCluster[currentCluster.url]) {
      const allPods = Object.values(state.Pods.byCluster[currentCluster.url]);
      return filterPods(allPods);
    }
    return [];
  }, shallowEqual);

  const handleNamespaceChange = namespace => {
    dispatch(setCurrentNamespace({ currentCluster, namespace }));
  };

  const handlePodPress = useCallback(pod => {
    dispatch(setCurrentPod(pod));
    navigation.navigate('Pod Details');
  }, [dispatch, navigation]);

  const handleTrashPress = useCallback(pod => {
    AlertUtils.deleteEntityPrompt(
      pod.metadata.name,
      () => dispatch(deletePod(currentCluster, pod))
    );
  }, [currentCluster, dispatch]);

  const createNamespaceList = namespaces => {
    const namespaceList = namespaces.map(namespace => {
      return { value: namespace };
    });
    return [{ value: 'All Namespaces' }, ...namespaceList];
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
      <View style={styles.podScroll}>
        {pods.length === 0 && isLoading && (
          <ScrollView>
            <Loading />
          </ScrollView>
        )}
        {pods.length > 0 && (
          <SwipeableList
            entities={pods}
            handleItemPress={handlePodPress}
            handleTrashPress={handleTrashPress}
          />
        )}
        {pods.length === 0 && !isLoading && (
          <ScrollView>
            <Text style={styles.noPodsFound}>No Pods Found</Text>
          </ScrollView>
        )}
      </View>
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

export default React.memo(PodsDisplay);

const styles = EStyleSheet.create({
  safeArea: {
    height: '100%',
    flex: 1,
  },
  dropDownView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '7%',
  },
  loading: {
    alignItems: 'center',
    flex: 1,
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
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    height: '100%',
    width: '94%',
    marginTop: '1%',
    borderRadius: 5,
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
    width: '30%',
    alignSelf: 'center',
  },
});
