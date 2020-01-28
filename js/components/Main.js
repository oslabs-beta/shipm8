// this will be our landing page we can use this to work with the MVP data we are trying to get
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Badge, Icon, withBadge } from 'react-native-elements';
import { connect } from 'react-redux';
import Login from './Login';
import AddCluster from './AddCluster';

mapStateToProps = state => ({
  totalCluster: state.app.totalCluster,
  clusterName: state.app.clusterName,
  pods: state.app.totalPods,

});

const Main = props => {
  let content = (
    <View
      style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center' }}>
      <TouchableOpacity
        style={styles.clusterButton}
        behavior="padding"
        enabled
      // onPress={() => props.navigation.navigate("Pods")}
      >
        <Text> Cluster: {props.clusterName} Pods: {props.totalPods}  </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.buttonsContainer}
        behavior="padding"
        enabled
        onPress={props.validIP}>
        <Text style={styles.buttonsText}>Cluster Name</Text>
      </TouchableOpacity> */}
      <View>
        <TouchableOpacity
          style={styles.buttonsContainer}
          behavior="padding"
          enabled
          onPress={() => props.navigation.navigate('AddCluster')}>
          <Text style={styles.buttonsText}> Add Cluster </Text>
        </TouchableOpacity>
      </View>
      <Button
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
        title="Sign Out"
        onPress={() => props.navigation.navigate('Launch')}
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
