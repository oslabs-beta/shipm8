import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingPage from './components/LandingPage';
import ClustersList from './components/ClustersList';
import Launch from './components/Launch';
import Pods from './components/Pods';
import PodInfo from './components/PodInfo';
import AsyncStorage from '@react-native-community/async-storage';

const initialRoute = AsyncStorage.getItem('AWSCredentials') ? 'Clusters' : 'ShipM8';

const MainNavigator = createStackNavigator(
  {
    ShipM8: Launch,
    Login: LandingPage, // Login Page
    Clusters: ClustersList, // Landing Page
    Pods: Pods,
    Details: PodInfo,
  },
  {
    initialRouteName: initialRoute,

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1589FF',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    },
  },
);
const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return (
    <AppContainer />
  );
};

export default App;
