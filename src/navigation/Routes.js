import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import PodInfo from '../components/Pods/PodInfo';
import Loading from '../components/common/Loading';
import Welcome from '../components/common/Welcome';
import PodsDisplay from '../components/Pods/PodsDisplay';
import CloudLogin from '../components/common/CloudLogin';
import AddCluster from '../components/Clusters/AddCluster';
import ClustersIndex from '../components/Clusters/ClustersIndex';

const RootStack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const RootStackScreen = ({ navigation, route }) => {
  const isReady = useSelector(state => state.clusters.isReady);
  const gcpSignedIn = useSelector(state => state.gcp.user !== null);
  const awsSignedIn = useSelector(state => state.aws.credentials !== null);

  const INITIAL_ROUTE_NAME = awsSignedIn || gcpSignedIn ? 'ShipM8' : 'Welcome';

  if (!isReady) {
    return (
      <Loading />
    );
  }

  return (
    <RootStack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#151B54',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}>
      <RootStack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          title: 'Welcome to ShipM8!',
          cardStyleInterpolator: forFade,
        }}
      />
      <RootStack.Screen
        name="ShipM8"
        component={ClustersIndex}
        options={{
          cardStyleInterpolator: forFade,
        }}
      />
      <RootStack.Screen
        name="Cloud Login"
        component={CloudLogin}
        options={{ title: 'Cloud Login' }}
      />
      <RootStack.Screen
        name="Add Cluster"
        component={AddCluster}
        options={{
          title: 'Add Cluster',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <RootStack.Screen name="Pods" component={PodsDisplay} />
      <RootStack.Screen name="Pod Details" component={PodInfo} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
