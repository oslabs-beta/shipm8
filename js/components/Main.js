// this will be our landing page we can use this to work with the MVP data we are trying to get
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

mapStateToProps = state => ({
  totalCluster: state.app.totalCluster,
});

const Main = props => {
  let content = (
    <View
      style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center' }}>
      <Text>{props.totalCluster}</Text>
      <TouchableOpacity
        style={styles.buttonsContainer}
        behavior="padding"
        enabled
        onPress={alert('Hello')}>
        <Text style={styles.buttonsText}>Cluster Name</Text>
      </TouchableOpacity>
      <Button
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
        title="Add Additional Cluster"
      />
      <Button
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
        title="Sign Out"
        onPress={() => props.navigation.goBack()}
      />
    </View>
  );
  return content;
};

export default connect(mapStateToProps)(React.memo(Main));

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonsText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
