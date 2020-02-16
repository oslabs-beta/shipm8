import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import EStyleSheet from 'react-native-extended-stylesheet';

import CloudProviders from '../../data/CloudProviders';
import {
  setCurrentCluster,
  setCurrentProvider,
  fetchNamespaces,
} from './ClustersSlice';

const ClustersIndex = ({ navigation }) => {
  const dispatch = useDispatch();
  const clusters = useSelector(state => Object.values(state.Clusters.byUrl));
  const currentProvider = useSelector(state => state.Clusters.currentProvider);

  const handleProviderChange = provider => {
    dispatch(setCurrentProvider(provider));
  };

  const handleClusterPress = cluster => {
    dispatch(setCurrentCluster(cluster));
    dispatch(fetchNamespaces(cluster));
    navigation.navigate('Pods');
  };

  const checkStatus = text => {
    if (text === 'ACTIVE' || text === 'RUNNING') {
      return 'success';
    } else if (text === 'CREATING') {
      return 'warning';
    }
    return 'error';
  };

  const renderClusters = () => {
    if (clusters.length) {
      return clusters
        .filter(cluster => cluster.cloudProvider === currentProvider)
        .map((cluster, idx) => {
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
        });
    }
    return [];
  };

  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dropDownView}>
          <Dropdown
            label="Select Cloud Provider"
            data={CloudProviders}
            value={currentProvider}
            itemCount={4}
            dropdownPosition={0}
            dropdownOffset={styles.dropDownOffset}
            style={styles.dropDown}
            onChangeText={text => handleProviderChange(text)}
          />
        </View>
        <ScrollView style={styles.clusterScroll}>
          {renderClusters().length > 0 && renderClusters()}
          {renderClusters().length === 0 && (
            <Text style={styles.noContentText}>No Clusters Found</Text>
          )}
          {renderClusters().length === 0 && (
            <Text style={styles.noContentText}>No Clusters Found</Text>
          )}
        </ScrollView>
        <View>
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
    </View>
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
  clusterContainer: {
    marginTop: '3%',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: '3rem',
    width: '96%',
    paddingLeft: 8,
    borderStyle: 'solid',
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
  },
  clusterText: {
    fontSize: '1rem',
    marginRight: '3.8rem',
    width: '46%',
    height: '50%',
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: '1rem',
    textAlign: 'right',
    backgroundColor: 'white',
    width: '5.65rem',
    height: '50%',
    color: 'gray',
    marginRight: '.18rem',
  },
  clusterScroll: {
    marginTop: '3%',
    borderRadius: 5,
    marginBottom: '.2rem',
    backgroundColor: 'white',
  },
  arrow: {
    marginLeft: '.4rem',
    marginTop: '-.6rem',
  },
  badge: {
    marginLeft: '.4rem',
    marginTop: '-.6rem',
    marginRight: '.2rem',
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
