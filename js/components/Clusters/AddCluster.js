import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';

import Loading from '../common/Loading';
import Regions from '../../data/Regions';
import { fetchEksClusters } from '../../reducers/AwsSlice';
import { addCluster, setCurrentProvider } from './ClustersSlice';
import { fetchGkeClusters, fetchGcpProjects } from '../../reducers/GoogleCloudSlice';

const AddCluster = ({ navigation }) => {
  const dispatch = useDispatch();
  const [valueSelected, setValueSelected] = useState(false);

  const currentProvider = useSelector(state => state.Clusters.currentProvider);
  const isLoading = useSelector(state => state[currentProvider].isLoading);
  const clusters = useSelector(state => state[currentProvider].clusters);

  const gcpProjects = useSelector(state => {
    if (state.Gcp.projects) {
      return state.Gcp.projects.map(project => {
        return {
          label: project.name,
          value: project.projectId
        }
      });
    }
    return null;
  });

  useEffect(() => {
    currentProvider === 'Gcp' &&
      dispatch(fetchGcpProjects());
  }, [])

  const handleDropdownChange = value => {
    setValueSelected(true);
    currentProvider === 'Aws'
      ? dispatch(fetchEksClusters(value))
      : dispatch(fetchGkeClusters(value));
  };

  const setDropDownValues = () => {
    return currentProvider === 'Aws'
      ? Regions
      : gcpProjects || [{ value: 'Loading' }];
  }

  const regionOrProjectLabel = currentProvider === 'Aws'
    ? 'Region'
    : 'Project';

  const setNoValueSelectedText = () => {
    return `Please select a ${regionOrProjectLabel} to view
    available clusters`;
  }

  const setDropdownLabel = () => {
    return `Select a ${regionOrProjectLabel}`;
  }

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
        <ScrollView style={styles.scrollView}>
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
          {isLoading ?
            (
              <ScrollView style={styles.clusterScroll}>
                <Loading />
              </ScrollView>
            )
            :
            (
              <ScrollView style={styles.clusterScroll}>
                {valueSelected && clusterList}
                {valueSelected && !clusterList &&
                  <Text style={styles.noContentText}>No Clusters Found</Text>}
                {!valueSelected &&
                  <Text style={styles.noContentText}>{setNoValueSelectedText()}</Text>}
              </ScrollView>
            )
          }
          <View style={{ marginTop: 60 }}>
            <Button
              color="red"
              title="Sign Out"
              onPress={() => navigation.navigate('Cloud Login')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default React.memo(AddCluster);

const styles = StyleSheet.create({
  clusterButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContentText: {
    textAlign: 'center',
    marginTop: 150,
    fontSize: 20,
    color: 'gray',
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
    height: 580,
    borderRadius: 5,
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
