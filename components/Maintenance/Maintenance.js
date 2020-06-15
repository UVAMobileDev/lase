// Simple top level component for the Maintenance screen. Essentially just wraps
//  a tab navigator which holds most of the content.

// Imports
import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Browse from './Find/Browse';
import Insert from './Insert/Insert';

// Create the tab navigator which separates the Browse and Create sections.
const Tab = createMaterialTopTabNavigator();

export default function Maintenance(props) {
    return (
        <Tab.Navigator initialRouteName="Create">
            <Tab.Screen name="Browse" component={Browse}/>
            <Tab.Screen name="Create" component={Insert}/>
        </Tab.Navigator>
    )
}
