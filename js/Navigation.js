import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import store from './store/index.js';
import LandingPage from './components/LandingPage';
import AddEksCluster from './components/AddEksCluster';
import Launch from './components/Launch';
import Pods from './components/Pods';
import PodInfo from './components/PodInfo';

const initialRoute = AsyncStorage.getItem('AWSCredentials') ? 'AddEksCluster' : 'ShipM8';

const MainNavigator = createStackNavigator(
  {
    ShipM8: Launch,
    Login: LandingPage, // Login Page
    AddEksCluster: AddEksCluster, // Landing Page
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
