//Top-level component, tab navigator for the Growths screen

import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GrowthBrowser from './Browse/GrowthBrowser';
import SampleViewer from './View/SampleViewer';

//separates the Growth page into two sections: Sample viewer and Growth browser
const Tab = createMaterialTopTabNavigator();

export default function Growths(props) {
    return (
        <Tab.Navigator initialRouteName="Browse Growths">
            <Tab.Screen name="Browse Growths" component={GrowthBrowser}/>
            <Tab.Screen name="View Sample" component={SampleViewer}/>
        </Tab.Navigator>
    )
}
