//this will be our landing page we can use this to work with the MVP data we are trying to get
import React from 'react';
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
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';

mapStateToProps = state => ({
  totalCluster: state.app.totalCluster,
  clusterName: state.app.clusterName,
  pods: state.app.totalPods,
});

// where <Badge> is created we need to determine the error cases for clusters
// so we can determine the status of the cluster and perhaps real time updates
const Main = props => {
  let regions = [
    {
      value: 'USA Central',
    },
    {
      value: 'USA Pacific',
    },
    {
      value: 'USA Eastern',
    },
    {
      value: 'United Kingdom',
    },
    {
      value: 'South Africa',
    },
    {
      value: 'Madagascar',
    },
    {
      value: 'Luxembourg',
    },
    {
      value: 'Tattoine',
    },
  ];

  let clusterList = [
    'cluster1',
    'cluster2',
    'cluster3',
    'cluster4',
    'cluster5',
    'cluster6',
    'cluster7',
    'cluster8',
    'cluster9',
    'cluster10',
    'cluster11',
    'cluster12',
    'cluster13',
    'cluster14',
    'cluster15',
    'cluster16',
  ];
  const clusterArr = [];

  clusterList.forEach(cluster => {
    clusterArr.push(
      <TouchableOpacity
        style={styles.podContainer}
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate('Pods')}>
        <Text style={styles.podText}>
          {' '}
          Name: {props.clusterName} Pods: {props.totalPods}{' '}
        </Text>
        <Text style={styles.statusText}>Status:</Text>
        <Badge status="success" badgeStyle={{ marginLeft: 13, marginTop: 6 }} />
      </TouchableOpacity>,
    );
  });

  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* <Text style={styles.test}>Select Namespace to View Pods</Text> */}
          <Dropdown
            label="Select a Region"
            data={regions}
            itemCount={3}
            dropdownOffset={{ top: 15, left: 0 }}
            style={styles.dropDown}
          />
          <ScrollView style={styles.podScroll}>{clusterArr}</ScrollView>
          {/* <TouchableOpacity
            style={styles.clusterButton}
            behavior="padding"
            enabled
            onPress={() => props.navigation.navigate('Pods')}>
            <Text>
              {' '}
              Cluster: {props.clusterName} Pods: {props.totalPods}{' '}
            </Text>
          </TouchableOpacity> */}
          <Button
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
            }}
            title="Sign Out"
            onPress={() => props.navigation.navigate('ShipM8')}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default connect(mapStateToProps)(React.memo(Main));

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
    marginHorizontal: 30,
    height: '100%',
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 30,
  },

  namespacePickText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  podContainer: {
    marginTop: 10,
    backgroundColor: 'gray',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
    height: 40,
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 6,
  },
  podText: {
    fontSize: 16,
    marginRight: 22,
    width: 200,
    backgroundColor: 'white',
  },
  statusText: {
    fontSize: 16,
    backgroundColor: 'white',
  },
  podScroll: {
    backgroundColor: 'pink',
    marginTop: 10,
    height: 580,
  },
});
