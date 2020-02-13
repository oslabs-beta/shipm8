import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from 'react-navigation-stack';

import Launch from './components/Launch';
import Pods from './components/Pods/Pods';
import PodInfo from './components/Pods/PodInfo';
import CloudLogin from './components/CloudLogin';
import AddCluster from './components/Clusters/AddCluster';
import ClustersIndex from './components/Clusters/ClustersIndex';
import AsyncStorage from '@react-native-community/async-storage';
import AuthLoading from './components/AuthLoading';

// let initialRoute = 'Welcome';

// const onBeforeLift = async () => {
//   const state = store.getState();
//   console.log('THIS IS STATE', state.Clusters.byUrl[0])
//   // Object.keys(state.Clusters.byUrl) !== 0
//   //   ? initialRoute = 'Clusters'
//   //   : initialRoute = 'Welcome';
//   if (state.Clusters.byUrl[0] === undefined) {
//     initialRoute = 'Clusters'
//     console.log(initialRoute)
//   }
//   else {
//     initialRoute = 'Welcome'
//   }
//   return initialRoute
// }


const MainNavigator = createStackNavigator(
  {
    Welcome: Launch,
    'Cloud Login': CloudLogin,
    'Add Cluster': AddCluster,
    Clusters: ClustersIndex,
    Pods: Pods,
    'Pod Details': PodInfo,
  },
  {
    // initialRouteName: initialRoute,

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#151B54',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    },
  },
);

const AuthStack = createStackNavigator({ Clusters: ClustersIndex, })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      MainNavigator: MainNavigator,
      AuthStack: AuthStack,
    },
    { initialRoute: 'AuthLoading' }
  )
);

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isReady, setIsReady] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        // onBeforeLift={onBeforeLift}
        persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
