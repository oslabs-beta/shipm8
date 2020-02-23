import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  fetchGkeClusters,
  fetchGcpProjects,
} from '../../reducers/GoogleCloudSlice';
import Loading from '../common/Loading';
import Regions from '../../data/Regions';
import { fetchEksClusters } from '../../reducers/AwsSlice';
import { addCluster, setCurrentProvider } from './ClustersSlice';

const AddCluster = ({ navigation }) => {
  const dispatch = useDispatch();
  const [valueSelected, setValueSelected] = useState(false);

  const currentProvider = useSelector(state => state.clusters.currentProvider);
  const isLoading = useSelector(state => state[currentProvider].isLoading);
  const clusters = useSelector(state => state[currentProvider].clusters);

  const gcpProjects = useSelector(state => {
    if (state.gcp.projects) {
      return state.gcp.projects.map(project => {
        return {
          label: project.name,
          value: project.projectId,
        };
      });
    }
    return null;
  });

  useEffect(() => {
    currentProvider === 'gcp' && dispatch(fetchGcpProjects());
  }, [currentProvider, dispatch]);

  const handleDropdownChange = value => {
    setValueSelected(true);
    currentProvider === 'aws'
      ? dispatch(fetchEksClusters(value))
      : dispatch(fetchGkeClusters(value));
  };

  const setDropDownValues = () => {
    return currentProvider === 'aws'
      ? Regions
      : gcpProjects || [{ value: 'Loading' }];
  };

  const regionOrProjectLabel = currentProvider === 'aws' ? 'Region' : 'Project';

  const setNoValueSelectedText = () => {
    return `Please select a ${regionOrProjectLabel} to view
    available clusters`;
  };

  const setDropdownLabel = () => {
    return `Select a ${regionOrProjectLabel}`;
  };

  const handleClusterPress = cluster => {
    dispatch(addCluster(cluster));
    dispatch(setCurrentProvider(cluster.cloudProvider));
    navigation.navigate('ShipM8');
  };

  const checkStatus = text => {
    if (text === 'ACTIVE' || text === 'RUNNING') {
      return 'success';
    } else if (text === 'CREATING') {
      return 'warning';
    } else {
      return 'error';
    }
  };

  const clusterList =
    clusters && clusters.length > 0
      ? clusters.map((cluster, idx) => {
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
            label={setDropdownLabel()}
            data={setDropDownValues()}
            itemCount={4}
            dropdownPosition={0}
            dropdownOffset={styles.dropDownOffset}
            style={styles.dropDown}
            onChangeText={text => handleDropdownChange(text)}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {isLoading ? (
            <ScrollView style={styles.clusterScroll}>
              <Loading />
            </ScrollView>
          ) : (
              <ScrollView style={styles.clusterScroll}>
                {valueSelected && clusterList}
                {valueSelected && !clusterList && (
                  <Text style={styles.noContentText}>No Clusters Found</Text>
                )}
                {!valueSelected && (
                  <Text style={styles.noContentText}>
                    {setNoValueSelectedText()}
                  </Text>
                )}
              </ScrollView>
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
    </View>
  );
};

export default React.memo(AddCluster);

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
    paddingVertical: 12,
    paddingLeft: 8,
    borderStyle: 'solid',
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  clusterText: {
    fontSize: '1rem',
    marginRight: '3.8rem',
    width: '46%',
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: '1rem',
    textAlign: 'right',
    backgroundColor: 'white',
    width: '5.65rem',
    color: 'gray',
    marginRight: '.18rem',
  },
  clusterScroll: {
    marginTop: '3%',
    height: '36rem',
    backgroundColor: 'white',
  },
  arrow: {
    marginLeft: '.4rem',
    marginTop: '.2rem',
  },
  badge: {
    marginLeft: '.4rem',
    marginTop: '.37rem',
    marginRight: '.2rem',
  },
  signOut: {
    marginTop: '4rem',
  },
});
