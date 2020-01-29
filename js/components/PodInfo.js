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
        <View style={styles.outerTextView}>
          <View style={styles.innerTextView}>
            <Text style={styles.text}>Name: </Text>
            <Text style={styles.text}>Status: </Text>
            <Text style={styles.text}>Time Created: </Text>
            <Text style={styles.text}>Host IP: </Text>
            <Text style={styles.text}>Pod IP: </Text>
            <Text style={styles.text}>Labels</Text>
            <Text style={styles.text}>Containers</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          style={styles.signOut}
          title="Sign Out"
          color="red"
          onPress={() => props.navigation.navigate('Login')}
        />
      </View>
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
    height: '90%',
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  outerTextView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  innerTextView: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    height: '100%',
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default connect(mapStateToProps)(React.memo(PodInfo));
