// this will be our landing page we can use this to work with the MVP data we are trying to get
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Badge, Icon, withBadge } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import Login from './Login';
import SignOut from './SignOut';
// import AddCluster from './AddCluster';

mapStateToProps = state => ({
  totalCluster: state.app.totalCluster,
  clusterName: state.app.clusterName,
  pods: state.app.totalPods,

});

// where <Badge> is created we need to determine the error cases for clusters
// so we can determine the status of the cluster and perhaps real time updates
const Main = props => {
  let namespaces = [
    {
      value: 'default',
    },
    {
      value: 'namespace1',
    },
    {
      value: 'namespace2',
    },
    {
      value: 'namespace3',
    },
    {
      value: 'namespace4',
    },
    {
      value: 'namespace5',
    },
    {
      value: 'namespace6',
    },
    {
      value: 'namespace7',
    },
  ];

  let podList = [
    'pod1',
    'pod2',
    'pod3',
    'pod4',
    'pod5',
    'pod6',
    'pod7',
    'pod8',
    'pod9',
    'pod10',
    'pod11',
    'pod12',
    'pod13',
    'pod14',
    'pod15',
    'pod16',
  ];
  const regions = [];

  podList.forEach(pod => {
    pods.push(
      <TouchableOpacity style={styles.podContainer} activeOpacity={0.7}>
        <Text style={styles.podText}>{pod}</Text>
        <Text style={styles.statusText}>Status:</Text>
        <Badge status="success" badgeStyle={{ marginLeft: 13, marginTop: 6 }} />
      </TouchableOpacity>,
    );
  });

  return (
    let content = (
      <View style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center' }}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView}>
            {/* <Text style={styles.test}>Select Namespace to View Pods</Text> */}
            <Dropdown
              label="Select a Namespace"
              data={namespaces}
              itemCount={3}
              dropdownOffset={{ top: 15, left: 0 }}
              style={styles.dropDown}
            />
            <ScrollView style={styles.podScroll}>{pods}</ScrollView>
        </SafeAreaView>
          <Dropdown>
            Regions
        </Dropdown>
          <TouchableOpacity
            style={styles.clusterButton}
            activeOpacity={.7}
            behavior="padding"
            enabled
            onPress={() => props.navigation.navigate("Pods")}
          >
            <Text> Cluster: {props.clusterName} Pods: {props.totalPods}  </Text>
          </TouchableOpacity>
          {/* <View>
        <TouchableOpacity
        style={styles.buttonsContainer}
        behavior="padding"
        enabled
        onPress={() => props.navigation.navigate('Add')}>
        <Text style={styles.buttonsText}> Add Cluster </Text>
        </TouchableOpacity>
      </View> */}
          <Button
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
            }}
            title="Sign Out"
            onPress={() => props.navigation.navigate('ShipM8')}
          />
        </View >
        );
        return content;
      };

      export default connect(mapStateToProps)(React.memo(Main));

const styles = StyleSheet.create({
          clusterButton: {
          backgroundColor: 'grey',
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
  buttonsContainer: {
          backgroundColor: 'blue',
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
  buttonsText: {
          textAlign: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  });
