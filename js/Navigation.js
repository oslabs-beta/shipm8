// React and React-Native are imported for future develoment
import React from 'react';
import { View } from 'react-native';
// import navigation tools so we can render new pages (Container: Used to bundle and set Nav settings, Stack: Used to build Nav settings)
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reducers from './reducers/index';

import LandingPage from './components/LandingPage';
import ClustersList from './components/ClustersList';
import Launch from './components/Launch';
import Pods from './components/Pods';
import PodInfo from './components/PodInfo';
import AsyncStorage from '@react-native-community/async-storage';

const store = createStore(reducers, composeWithDevTools());
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
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
