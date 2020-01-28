// this will be our landing page we can use this to work with the MVP data we are trying to get 
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

mapStateToProps = state => ({
  totalCluster: state.app.totalCluster,
});

const Main = (props) => {
  let content = (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Kubernetes Cluster</Text>

        </View>
        <View style={styles.clusterContainer}>
          <Text>Hey</Text>

        </View>

        <View style={styles.buttonContainer}>

        </View>

      </View>
    </ScrollView>

  )
  return content
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterContainer: {
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: 'blue',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    alignSelf: "flex-start",
    alignSelf: 'center',



  },
  titleText: {
    fontSize: 40,



  }
});


export default connect(mapStateToProps)(React.memo(Main));
