import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';

mapStateToProps = state => ({});

const Pods = props => {
  let namespaces = [
    {
      value: 'default',
      pod: 'pod1',
      status: 'running',
    },
    {
      value: 'namespace1',
      pod: 'pod2',
      status: 'running',
    },
    {
      value: 'namespace2',
      pod: 'pod3',
      status: 'inactive',
    },
    {
      value: 'namespace3',
      pod: 'pod4',
      status: 'running',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.test}>Select Namespace to View Pods</Text>
        <Dropdown
          label="namespaces"
          data={namespaces}
          style={styles.dropDown}
        />
        <ScrollView style={styles.podScroll}>
          <Text>
            This will be where individual pods names and statuses will render
          </Text>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            title="Sign Out"
            onPress={() => props.navigation.navigate('ShipM8')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  test: {
    textAlign: 'center',
    fontSize: 20,
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    height: '100%',
  },
  scrollView: { marginHorizontal: 20, marginTop: 30 },
  namespacePickText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  buttonView: {
    marginTop: 20,
  },
  dropDown: {
    textAlign: 'center',
    alignItems: 'center',
    width: 20,
  },
  podScroll: {
    backgroundColor: 'pink',
    height: 590,
  },
});

export default connect(mapStateToProps)(React.memo(Pods));
