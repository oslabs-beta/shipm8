import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  StatusBar,
  View,
} from 'react-native';

import Loading from './Loading';

const LaunchLoading = ({ navigation }) => {
  const isReady = useSelector(state => state.Clusters.isReady);
  const clusters = useSelector(state => Object.keys(state.Clusters.byUrl));

  useEffect(() => {
    _bootstrap();
  }, [isReady]);

  const _bootstrap = () => {
    if (isReady) {
      navigation.navigate(clusters.length > 0 ? 'App' : 'FirstLaunch');
    }
  };

  return (
    <View>
      <Loading />
      <StatusBar barStyle="default" />
    </View>
  );
}

export default LaunchLoading;
