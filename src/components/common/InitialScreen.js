import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, Text, Dimensions } from 'react-native';

import { setFirstLaunchStatus } from '../../reducers/ClustersSlice';
import Logo from '../../../images/SHIPM8_LogoLight.png';
import EStyleSheet from 'react-native-extended-stylesheet';

const { height, width } = Dimensions.get('window');

const InitialScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isReady = useSelector(state => state.clusters.isReady);
  const isFirstLaunch = useSelector(state => state.clusters.isFirstLaunch);

  useEffect(() => {
    _bootstrap();
  }, [_bootstrap, isReady]);

  const _bootstrap = useCallback(() => {
    if (isReady) {
      navigation.reset({
        index: 0,
        routes: [{ name: isFirstLaunch ? 'Launch' : 'ShipM8' }],
      });

      if (isFirstLaunch) {
        dispatch(setFirstLaunchStatus());
      }
    }
  }, [dispatch, isFirstLaunch, isReady, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>ShipM8</Text>
        <Image style={styles.logo} source={Logo} />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'navy',
    // backgroundColor: '#01183A',
  },
  innerContainer: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // height: height * 0.85,
    // width: width * 0.85,
  },
  logo: {
    flex: 1,
    height: '5rem',
    width: '5rem',
    resizeMode: 'contain',
    borderRadius: '5rem',
  },
  text: {
    color: 'white',
    fontSize: '2rem',
    fontWeight: '500',
    fontFamily: 'Georgia',
  },
});
export default InitialScreen;
