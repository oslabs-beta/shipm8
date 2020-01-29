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
import Main from './components/Main';
import Launch from './components/Launch';
import Pods from './components/Pods';
import PodInfo from './components/PodInfo';

const store = createStore(reducers, composeWithDevTools());

const MainNavigator = createStackNavigator(
  {
    ShipM8: Launch,
    Login: LandingPage, // Login Page
    Clusters: Main, // Landing Page
    Pods: Pods,
    Details: PodInfo,
  },
  {
    initialRouteName: 'ShipM8',

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
