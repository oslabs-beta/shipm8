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
import Icon from 'react-native-vector-icons/FontAwesome';
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
    'pod1sslasdjflkajsdflkjsdlfkjlsdkfjlksjdflkjsdf',
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
      <TouchableOpacity
        style={styles.podContainer}
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate('Details')}>
        <Text style={styles.podText} numberOfLines={1}>
          {pod}
        </Text>
        <Text style={styles.statusText}>Status:</Text>
        <Badge status="success" badgeStyle={styles.badge} />
        <Icon
          name="chevron-right"
          size={15}
          color="gray"
          style={styles.arrow}
        />
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
          dropdownOffset={styles.dropDownOffset}
          style={styles.dropDown}
        />
        <ScrollView style={styles.podScroll}>{pods}</ScrollView>

        <View style={styles.buttonView}>
          <Button
            style={styles.signOut}
            title="Sign Out"
            onPress={() => props.navigation.navigate('Login')}
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
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 20,
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
    fontWeight: 'bold',
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
    backgroundColor: '#D0D3D4',
    borderStyle: 'solid',
    borderColor: 'navy',
    borderWidth: 2,
    borderRadius: 3,
    marginTop: 10,
    height: 602,
  },
  podContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: 6,
    height: 48,
    width: '96%',
    paddingVertical: 12,
    paddingLeft: 6,
    borderStyle: 'solid',
    borderColor: 'navy',
    borderWidth: 1,
    borderRadius: 8,
    alignContent: 'center',
  },
  podText: {
    fontSize: 16,
    marginRight: 12,
    marginLeft: 2,
    width: 200,
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  statusText: {
    fontSize: 16,
    backgroundColor: 'white',
    color: 'gray',
  },
  arrow: {
    marginLeft: 8,
    marginTop: 4,
  },
  badge: {
    marginLeft: 8,
    marginTop: 7,
  },
  dropDownOffset: {
    top: 15,
    left: 0,
  },
});

export default connect(mapStateToProps)(React.memo(Pods));
