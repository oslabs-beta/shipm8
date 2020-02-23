import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  checkClusters,
  fetchNamespaces,
  setCurrentCluster,
  setCurrentProvider,
} from './ClustersSlice';
import SwipeableList from '../common/SwipeableList';
import CloudProviders from '../../data/CloudProviders';

const ClustersIndex = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentProvider = useSelector(state => state.Clusters.currentProvider);

  const clusters = useSelector(state => {
    return Object.values(state.Clusters.byUrl)
      .filter(cluster => cluster.cloudProvider === currentProvider);
  });

  useEffect(() => {
    dispatch(checkClusters());
  }, [dispatch]);

  const handleProviderChange = provider => {
    dispatch(setCurrentProvider(provider));
  };

  const handleClusterPress = cluster => {
    dispatch(setCurrentCluster(cluster));
    dispatch(fetchNamespaces(cluster));
    navigation.navigate('Pods');
  };

  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dropDownView}>
          <Dropdown
            label={'Select Cloud Provider'}
            data={CloudProviders}
            value={currentProvider}
            itemCount={4}
            dropdownPosition={0}
            dropdownOffset={styles.dropDownOffset}
            style={styles.dropDown}
            onChangeText={handleProviderChange}
          />
        </View>
        {clusters.length > 0 && (
          <SwipeableList
            listData={clusters}
            handleItemPress={handleClusterPress}
            handleDeletePress={null}
          />
        )}
        {!clusters.length && (
          <ScrollView style={styles.clusterScroll}>
            <Text style={styles.noContentText}>No Clusters Found</Text>
          </ScrollView>
        )}
        < View >
          <TouchableOpacity onPress={() => navigation.navigate('Add Cluster')}>
            <Icon
              style={styles.addClusterIcon}
              name="plus-circle"
              size={50}
              color="#1589FF"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signOut}>
          <Button
            color="red"
            title="Sign Out"
            onPress={() => navigation.navigate('Cloud Login')}
          />
        </View>
      </SafeAreaView>
    </View >
  );
};

export default React.memo(ClustersIndex);

const styles = EStyleSheet.create({
  noContentText: {
    textAlign: 'center',
    marginTop: '9rem',
    fontSize: '1.3rem',
    color: 'gray',
  },
  dropDown: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: '1.1rem',
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
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: '3%',
    height: '100%',
  },
  clusterScroll: {
    marginTop: '3%',
    borderRadius: 5,
    marginBottom: '.2rem',
    backgroundColor: 'white',
  },
  signOut: {
    marginTop: '3rem',
    backgroundColor: 'white',
    width: '30%',
    alignSelf: 'center',
  },
  addClusterIcon: {
    alignSelf: 'center',
    marginBottom: '-1.7rem',
  },
});
