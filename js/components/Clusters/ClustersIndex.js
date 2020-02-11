import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Badge, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';

import { setCurrentCluster, setCurrentProvider } from './ClustersSlice';
import CloudProviders from '../../data/CloudProviders';

const ClustersIndex = ({ navigation }) => {
  const dispatch = useDispatch();
  const clusters = useSelector(state => Object.values(state.Clusters.byUrl));
  const [clustersList, setClustersList] = useState(clusters);
  const provider = useSelector(state => state.Clusters.selectedProvider);

  const handleProviderChange = provider => {
    const clustersForProvider = clusters.filter(
      cluster => cluster.cloudProvider === provider,
    );
    setClustersList(clustersForProvider);
    setCurrentProvider(provider);
  };

  const handleClusterPress = cluster => {
    dispatch(setCurrentCluster(cluster));
    navigation.navigate('Pods');
  };

  const checkStatus = text => {
    if (text === 'ACTIVE') {
      return 'success';
    } else if (text === 'CREATING') {
      return 'warning';
    }
    {
      return 'error';
    }
  };

  const clustersDisplay =
    clustersList && clustersList.length > 0
      ? clustersList.map((cluster, idx) => {
          return (
            <TouchableOpacity
              key={cluster.name + idx}
              style={styles.clusterContainer}
              activeOpacity={0.7}
              cluster={cluster.name}
              onPress={() => handleClusterPress(cluster)}>
              <Text numberOfLines={1} style={styles.clusterText}>
                {cluster.name}
              </Text>
              <Text style={styles.statusText}>{cluster.status}</Text>
              <Badge
                status={checkStatus(cluster.status)}
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
    <View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dropDownView}>
          <Dropdown
            label="Select Cloud Provider"
            data={CloudProviders}
            value={provider}
            itemCount={4}
            dropdownPosition={0}
            // dropdownMargins={{ min: 50, max: 50 }}
            dropdownOffset={styles.dropDownOffset}
            style={styles.dropDown}
            onChangeText={text => handleProviderChange(text)}
          />
        </View>
        <ScrollView style={styles.clusterScroll}>
          {clustersDisplay && clustersDisplay}
          {!clustersDisplay && (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 150,
                fontSize: 20,
                color: 'gray',
              }}>
              No Clusters
            </Text>
          )}
        </ScrollView>
        <View
          style={{
            marginBottom: 20,
            width: 200,
            alignSelf: 'center',
          }}>
          <Button
            type="solid"
            title="Add Cluster +"
            onPress={() => navigation.navigate('Add Cluster')}
          />
        </View>
        <Button
          buttonStyle={{
            borderColor: 'red',
            fontWeight: 'bold',
            borderStyle: 'solid',
            color: 'red',
          }}
          titleStyle={{
            color: 'red',
          }}
          type="raised"
          title="Sign Out"
          onPress={() => navigation.navigate('Cloud Login')}
        />
      </SafeAreaView>
    </View>
  );
};

export default React.memo(ClustersIndex);

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
  dropDown: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  dropDownView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'white',
  },
  dropDownOffset: {
    top: 15,
    left: 0,
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
    backgroundColor: 'white',
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
    paddingLeft: 8,
    borderStyle: 'solid',
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignContent: 'center',
  },
  clusterText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 60,
    width: 165,
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: 16,
    textAlign: 'right',
    backgroundColor: 'white',
    width: 90,
    color: 'gray',
    marginRight: 3,
  },
  clusterScroll: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  arrow: {
    marginLeft: 6,
    marginTop: 3,
  },
  badge: {
    marginLeft: 6,
    marginTop: 6,
    marginRight: 3,
  },
});
