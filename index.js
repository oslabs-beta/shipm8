/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppContainer from './src/Navigation';
import { name as appName } from './app.json';
import EStyleSheet from 'react-native-extended-stylesheet';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning:']);
AppRegistry.registerComponent(appName, () => AppContainer);

EStyleSheet.build();
