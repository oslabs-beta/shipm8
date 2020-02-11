import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from 'react-navigation-stack';

import Launch from './components/Launch';
import Pods from './components/Pods/Pods';
import PodInfo from './components/Pods/PodInfo';
import CloudLogin from './components/CloudLogin';
import AddCluster from './components/Clusters/AddCluster';
import ClustersIndex from './components/Clusters/ClustersIndex';

// const onBeforeLift = () => {
//   const state = store.getState();
//   Object.keys(state.Clusters.byUrl).length > 0
//     ? 'Custers'
//     : 'ShipM8';
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
    initialRouteName: 'Welcome',

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

const AppContainer = createAppContainer(MainNavigator);

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
