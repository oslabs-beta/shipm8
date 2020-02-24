import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Login from './Login';

const CloudLogin = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Login navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default React.memo(CloudLogin);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: '2rem',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
