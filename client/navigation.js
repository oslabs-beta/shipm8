// React and React-Native are imported for future develoment
import React from 'react';
import { View } from 'react-native';
// import navigation tools so we can render new pages (Container: Used to bundle and set Nav settings, Stack: Used to build Nav settings) 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import App from './App'
import MainPage from "./mainPage";


const MainNavigator = createStackNavigator(
    {
        ShipM8: App, // Login Page
        MainPage: MainPage, // Landing Page
    },
    {
        initialRouteName: 'ShipM8',

        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'magenta',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;