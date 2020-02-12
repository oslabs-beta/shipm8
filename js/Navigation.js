import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import store from './store/index.js';
import CloudLogin from './components/CloudLogin';
import AddEksCluster from './components/AddEksCluster';
import Launch from './components/Launch';
import Pods from './components/Pods';
import PodInfo from './components/PodInfo';
import YourClusters from './components/YourClusters.js';

let initialRoute;

const findRoute = async () => {
  try {
    let value = await AsyncStorage.getItem('AWSCredentials')
    console.log('THIS IS VALUE', value)
    if (value != null) {
      initialRoute = 'Your Clusters'
      return initialRoute
    }
    else {
      initialRoute = 'ShipM8'
    }
  }
  catch (error) {
    return alert(error)
  }
}
findRoute()
console.log("this is the route", initialRoute)



// const initialRoute = AsyncStorage.getItem('AWSCredentials')
//   ? 'Your Clusters'
//   : 'ShipM8';

const MainNavigator = createStackNavigator(
  {
    ShipM8: Launch,
    'Cloud Login': CloudLogin,
    'Add EKS Cluster': AddEksCluster,
    'Your Clusters': YourClusters,
    Pods: Pods,
    'Pod Details': PodInfo,
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
