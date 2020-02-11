import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

const HorizontalScroll = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.buttonView}>
      <ScrollView horizontal={true}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Dummy")}
        >
          <Text style={styles.horizontalScrollText}>
            Pods {"         "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.horizontalScrollText}>
            Services {"        "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.horizontalScrollText}>
            Nodes {"        "}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  horizontalScrollText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
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
  scrollView: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 30,
    marginLeft: -100,
    marginRight: -100
  },
  signOut: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  buttonView: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  scroll: {
    borderRadius: 5,
    marginTop: 10,
    height: 600,
  },
  container: {
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
  renderedText: {
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

export default (React.memo(HorizontalScroll))