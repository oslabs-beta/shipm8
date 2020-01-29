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
import { connect } from 'react-redux';

mapStateToProps = state => ({});

const PodInfo = props => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.podScroll}>
        <View style={styles.textView}>
          <Text style={styles.text}>Name: </Text>
          <Text style={styles.text}>Status: </Text>
          <Text style={styles.text}>Time Created: </Text>
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
  podScroll: {
    backgroundColor: '#D0D3D4',
    borderStyle: 'solid',
    borderColor: 'navy',
    borderWidth: 2,
    borderRadius: 3,
    marginTop: 10,
    height: 583,
    color: 'white',
  },
  safeArea: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    height: '80%',
    marginTop: 40,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  textView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default connect(mapStateToProps)(React.memo(PodInfo));
