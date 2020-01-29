import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';

mapStateToProps = state => ({});

const Pods = props => {
  /* Dummy Data for Namespaces and Pods. Will need to have a podList 
     for each Namespace, and render accordingly */
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
  const pods = [];

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

        <View style={styles.buttonView}>
          <Button
            style={styles.signOut}
            title="Sign Out"
            onPress={() => props.navigation.navigate('PodStatus')}
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
  signOut: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    marginTop: 20,
  },
  dropDown: {
    textAlign: 'center',
    alignItems: 'center',
    width: 20,
    fontSize: 18,
  },
  podScroll: {
    backgroundColor: 'pink',
    marginTop: 10,
    height: 580,
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
});

export default connect(mapStateToProps)(React.memo(Pods));
