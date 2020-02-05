import React from 'react';
import { Button } from 'react-native';

const SignOut = ({ navigation }) => {
  navigationOptions = {
    headerTitle: () => <Clusters />,
    headerRight: () => (
      <Button
        onPress={() => alert('Sign Out')}
        title="Info"
        color="#fff"
      />
    ),
  };
}

export default React.memo(SignOut);