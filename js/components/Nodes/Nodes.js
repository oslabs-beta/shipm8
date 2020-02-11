import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Badge } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AwsApi from '../../api/AwsApi';
import AsyncStorage from '@react-native-community/async-storage';
import getNameSpaces from '../MainPage/Contents';
import handleNamespaceChange from '../MainPage/Contents';


mapStateToProps = state => ({});

const Nodes = ({ navigation }) => {
  const [nodesList, setNodesList] = useState([]);

  useEffect(() => {
    getNameSpaces();
  }, []);

  const handlenodesPress = async nodes => {
    await AsyncStorage.setItem('currentnodes', JSON.stringify(nodes));
    navigation.navigate('Node Details');
  }

  const checkStatus = text => {
    if (text === 'Running') {
      return 'success'
    }
    else {
      return 'error'
    }
  };

  const nodesDisplay = [];

  nodesList.length > 0 ? nodesList.forEach((nodes, idx) => {
    nodesDisplay.push(
      <TouchableOpacity
        key={nodes.metadata.name + idx}
        style={styles.nodesContainer}
        activeOpacity={0.7}
        onPress={e => handlenodesPress(nodes)}>
        <Image source={require('../../../assets/pod.png')} style={styles.logo} />
        <Text style={styles.nodesText} numberOfLines={1}>
          {nodes.metadata.name}
        </Text>
        <Text style={styles.statusText}>{nodes.status.phase}</Text>
        <Badge status={checkStatus(nodes.status.phase)} badgeStyle={styles.badge} />
        <Icon
          name="chevron-right"
          size={15}
          color="gray"
          style={styles.arrow}
        />
      </TouchableOpacity>
    );
  }) : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <ScrollView style={styles.nodescroll}>{nodesDisplay.length > 0 ? nodesDisplay : <Text>Loading...</Text>}</ScrollView>
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
    marginHorizontal: 10,
    height: '100%',
    marginTop: -11,
  },
  scrollView: { marginHorizontal: 0, marginTop: 30 },
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
    color: 'red',
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
  nodeScroll: {
    borderRadius: 5,
    marginTop: 10,
    height: 600,
  },
  nodesContainer: {
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
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignContent: 'center',
  },
  nodesText: {
    fontSize: 16,
    marginLeft: 7,
    width: 200,
    marginRight: 25,
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
  logo: {
    width: 38,
    height: 38,
    marginTop: -7,
  },
});

export default connect(mapStateToProps)(React.memo(Nodes));