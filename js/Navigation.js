import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from 'react-navigation-stack';

import Pods from './components/Pods/Pods';
import Launch from './components/Launch';
import PodInfo from './components/Pods/PodInfo';
import CloudLogin from './components/CloudLogin';
import AddEksCluster from './components/Clusters/AddClusters';
import ClustersIndex from './components/Clusters/ClustersIndex';
import Contents from './components/MainPage/Contents';
// import Services from './components/Services/Services';
// import ServiceInfo from './components/Services/ServiceInfo';
// import Nodes from './components/Nodes/Nodes';
// import NodeInfo from './components/Nodes/NodeInfo';

// const onBeforeLift = () => {
//   const state = store.getState();
//   Object.keys(state.Clusters.byUrl).length > 0
//     ? 'Custers'
//     : 'ShipM8';
// }

const MainNavigator = createStackNavigator(
  {
    ShipM8: Launch,
    'Cloud Login': CloudLogin,
    'Add Cluster': AddEksCluster,
    Clusters: ClustersIndex,
    Main: Contents,
    Pods: Pods,
    'Pod Details': PodInfo,
    // Services: Services,
    // 'Service Details': ServiceInfo,
    // Nodes: Nodes,
    // 'Node Details': NodeInfo
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
