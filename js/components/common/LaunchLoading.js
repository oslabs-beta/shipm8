import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  StatusBar,
  View,
} from 'react-native';

import Loading from './Loading';

const LaunchLoading = ({ navigation }) => {
  const isReady = useSelector(state => state.clusters.isReady);
  const clusters = useSelector(state => Object.keys(state.clusters.byUrl));

  useEffect(() => {
    _bootstrap();
  }, [_bootstrap, isReady]);

  const _bootstrap = useCallback(() => {
    if (isReady) {
      navigation.navigate(clusters && clusters.length > 0 ? 'App' : 'FirstLaunch');
    }
  }, [clusters, isReady, navigation]);

  return (
    <View>
      <StatusBar barStyle="default" />
      <Loading />
    </View>
  );
};

export default LaunchLoading;
