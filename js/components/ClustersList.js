//this will be our landing page we can use this to work with the MVP data we are trying to get
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';

import Regions from '../Regions';
import { fetchEksClusters } from '../reducers/clustersSlice';

const ClustersList = ({ navigation, cloudProvider }) => {
  const dispatch = useDispatch();

  /*** To be used once we integrate GKE ***/
  // const clusters = useSelector(state =>
  //   cloudProvider === 'AWS'
  //   ? state.clusters.EksClusters
  //   : state.clusters.GkeClusters
  //   );

  const clusters = useSelector(state => state.clusters.EksClusters);
  const clusterList = [];

  const handleClusterPress = async cluster => {
    dispatch(addCluster)
    navigation.navigate('Pods');
  }

  const checkStatus = (text) => {
    if (text === 'ACTIVE') {
      return 'success'
    }
    else {
      return 'error'
    }
  };
  clusters.length > 0 ? clusters.forEach((cluster, idx) => {
    clusterList.push(
      <TouchableOpacity
        key={cluster.name + idx}
        style={styles.clusterContainer}
        activeOpacity={0.7}
        cluster={cluster.name}
        onPress={() => handleClusterPress(cluster)}>
        <Text
          numberOfLines={1}
          style={styles.clusterText}>
          {cluster.name}
        </Text>
        <Text style={styles.statusText}>{cluster.status}</Text>
        <Badge status={checkStatus(cluster.status)} badgeStyle={styles.badge} />
        <Icon
          name="chevron-right"
          size={15}
          color="gray"
          style={styles.arrow}
        />
      </TouchableOpacity>,
    );
  }) : null;

  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <Dropdown
            label="Select a Region"
            data={Regions}
            itemCount={4}
            dropdownOffset={{ top: 15, left: 0 }}
            style={styles.dropDown}
            onChangeText={text => dispatch(fetchEksClusters(text))}
          />
          <ScrollView style={styles.clusterScroll}>{
            clusterList.length > 0 ? clusterList : <Text>No Clusters Found in this Region</Text>
          }</ScrollView>
          <Button
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
            }}
            color='red'
            title="Sign Out"
            onPress={() => navigation.navigate('Login')}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default React.memo(ClustersList);

const styles = StyleSheet.create({
  clusterButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    height: '100%',
  },
  scrollView: {
    marginHorizontal: 0,
    marginTop: 30,
  },
  regionPickText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  clusterContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 2,
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
  clusterText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 100,
    width: 165,
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: 16,
    backgroundColor: 'white',
    color: 'gray',
    marginRight: 3,
  },
  clusterScroll: {
    marginTop: 10,
    height: 580,
    borderRadius: 5,
  },
  arrow: {
    marginLeft: 6,
    marginTop: 4,
  },
  badge: {
    marginLeft: 6,
    marginTop: 7,
    marginRight: 3,
  },
});
