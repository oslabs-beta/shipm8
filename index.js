/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppContainer from './js/Navigation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);
