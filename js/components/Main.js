// this will be our landing page we can use this to work with the MVP data we are trying to get
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Badge, Icon, withBadge } from 'react-native-elements';
import { } from 'react-native-material';
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

  // const clusters = [
  //   'cluster1',
  //   'cluster2',
  //   'cluster3',
  //   'cluster4',
  //   'cluster5',
  //   'cluster6',
  //   'cluster7',
  //   'cluster8',
  //   'cluster9',
  //   'cluster10',
  //   'cluster11',
  //   'cluster12'
  // ]
  // clustArr = [];

  // clusArr.forEach(clusters => {

  // });

  let content = (
    <View
      style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center' }}>
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
