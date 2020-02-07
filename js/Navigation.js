import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import store from './store';
import LandingPage from './components/LandingPage';
import ClustersList from './components/ClustersList';
import Launch from './components/Launch';
import Pods from './components/Pods';
import PodInfo from './components/PodInfo';

const initialRoute = AsyncStorage.getItem('AWSCredentials') ? 'Clusters' : 'ShipM8';
console.log('ASDASJKDASKHJDASHJLDHJKLASD', initialRoute)

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
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
