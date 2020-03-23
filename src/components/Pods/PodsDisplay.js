import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Loading from '../common/Loading';
import AlertUtils from '../../utils/AlertUtils';
import SwipeableList from '../common/SwipeableList';
import { setCurrentNamespace } from '../../reducers/ClustersSlice';
import { setCurrentPod, fetchPods, deletePod } from '../../reducers/PodsSlice';

const PodsDisplay = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isLoading = useSelector(state => state.pods.isLoading);
  const currentCluster = useSelector(state =>
    state.clusters.byUrl[state.clusters.current]
  );
  const currentNamespace = useSelector(state =>
    state.clusters.byUrl[state.clusters.current].currentNamespace
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
    if (state.pods.byCluster[currentCluster.url]) {
      const allPods = Object.values(state.pods.byCluster[currentCluster.url]);
      return filterPods(allPods);
    }
    return [];
  }, shallowEqual);

  const handleNamespaceChange = useCallback(namespace => {
    dispatch(setCurrentNamespace({ currentCluster, namespace }));
  }, [currentCluster, dispatch]);

  const handlePodPress = useCallback(pod => {
    dispatch(setCurrentPod(pod));
    navigation.navigate('Pod Details');
  }, [dispatch, navigation]);

  const handleDeletePress = useCallback(pod => {
    AlertUtils.deleteEntityPrompt(
      pod,
      () => dispatch(deletePod(currentCluster, pod))
    );
  }, [currentCluster, dispatch]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(fetchPods(currentCluster));
    setIsRefreshing(false);
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
          onChangeText={handleNamespaceChange}
        />
      </View>
      <View style={styles.podScroll}>
        {isLoading && !isRefreshing && !pods.length ? (
          <ScrollView>
            <Loading />
          </ScrollView>
        ) : (
            <SwipeableList
              listData={pods}
              onItemPress={handlePodPress}
              onDeletePress={handleDeletePress}
              onRefresh={handleRefresh}
              emptyValue={'Pods'}
            />
          )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(PodsDisplay);

const styles = EStyleSheet.create({
  safeArea: {
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  dropDownView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '7%',
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
