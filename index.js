/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppContainer from './js/Navigation';
import { name as appName } from './app.json';
import EStyleSheet from 'react-native-extended-stylesheet';

AppRegistry.registerComponent(appName, () => AppContainer);

EStyleSheet.build();
