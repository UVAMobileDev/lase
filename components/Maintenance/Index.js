// Simple top level component for the Maintenance screen. Essentially just wraps
//  a tab navigator which holds most of the content.

// Imports
import React from 'react';
import Constants from 'expo-constants';
import { View, Text, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Browse from './Find/Browse';
import Insert from './Insert/Insert';

const onWeb = Platform.OS === "web";

// Create the tab navigator which separates the Browse and Create sections.
const Tab = createMaterialTopTabNavigator();

export default function Maintenance(props) {
    return (
        <Tab.Navigator
                style={{marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight,}}
                initialRouteName="Browse"
                swipeEnabled={!onWeb}>
            <Tab.Screen name="Browse" component={Browse}/>
            <Tab.Screen name="Create" component={Insert}/>
        </Tab.Navigator>
    )
}
