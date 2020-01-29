import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';


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

export default React.memo(SignOut)