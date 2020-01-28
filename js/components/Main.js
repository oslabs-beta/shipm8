import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';

mapStateToProps = state => ({});

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
  ];

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView style={{ marginHorizontal: 20, marginTop: 80 }}>
        {/* <Text style={styles.namespacePickText}>Pick a Namespace</Text> */}
        <Dropdown
          label="Select Namespace"
          data={namespaces}
          style={{
            textAlign: 'center',
            alignItems: 'center',
            width: 20,
          }}
        />

        <Text style={styles.test}>Pods Page</Text>
        <Button
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
          title="Next Page"
          onPress={() => props.navigation.navigate('Pods')}
        />
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
    fontSize: 50,
    marginTop: 300,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    height: '100%',
  },
  namespacePickText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default connect(mapStateToProps)(React.memo(Main));
