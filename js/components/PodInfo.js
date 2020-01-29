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
    <SafeAreaView>
      <Text>This Will be for Specific Pod Info</Text>
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
});

export default connect(mapStateToProps)(React.memo(PodInfo));
