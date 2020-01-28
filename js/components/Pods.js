import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

mapStateToProps = state => ({});

const Pods = props => {
  let content = (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <DropdownMenu data={data} />

        <Text style={styles.test}>Pods Page</Text>
        <Button
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
          title="Sign Out"
          onPress={() => props.navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
    backgroundColor: 'red',
    marginHorizontal: 5,
  },
});

export default connect(mapStateToProps)(React.memo(Pods));
