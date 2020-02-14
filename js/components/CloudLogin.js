import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Login from './Login';

const CloudLogin = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <Login navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(CloudLogin);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
