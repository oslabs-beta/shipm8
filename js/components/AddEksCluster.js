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
import { useDispatch } from 'react-redux';
import { Badge } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { addCluster } from '../reducers/ClustersSlice';
import AwsApi from '../api/AwsApi';
import Regions from '../Regions';

const AddEksCluster = ({ navigation }) => {
  const dispatch = useDispatch();
  const [regionSelected, setRegionSelected] = useState(false);
  const [clusters, setClusters] = useState(null);

  const handleRegionChange = async region => {
    setRegionSelected(true);
    const clusters = await AwsApi.describeAllEksClusters(region);
    setClusters(clusters);
  };

  const handleClusterPress = cluster => {
    dispatch(addCluster(cluster));
    navigation.navigate('Pods');
  };

  const checkStatus = text => {
    if (text === 'ACTIVE') {
      return 'success';
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
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <Dropdown
              label="Please Select a Region"
              data={Regions}
              itemCount={3}
              dropdownPosition={0}
              // dropdownMargins={{ min: 50, max: 50 }}
              dropdownOffset={{ top: 15, left: 0 }}
              style={styles.dropDown}
              onChangeText={text => handleRegionChange(text)}
            />
          </View>
          <ScrollView style={styles.clusterScroll}>
            {regionSelected && clusterList}
            {regionSelected && !clusterList && (
              <Text>No Clusters Found in this Region</Text>
            )}
          </ScrollView>
          <Button
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
            }}
            color="red"
            title="Sign Out"
            onPress={() => navigation.navigate('Login')}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default React.memo(AddEksCluster);

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
    marginRight: 96,
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
