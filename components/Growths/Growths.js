//Top-level component, tab navigator for the Growths screen

import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GrowthBrowser from './Browse/GrowthBrowser';
import SampleViewer from './View/SampleViewer';

//separates the Growth page into two sections: Sample viewer and Growth browser
const Tab = createMaterialTopTabNavigator();

export default function Growths(props) {
    return (
        <View style={{flex: 1, backgroundColor: "#0AA"}}>
            <Tab.Navigator initialRouteName="Browse Growths" style={{marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight,}}>
                <Tab.Screen name="Browse Growths" component={GrowthBrowser}/>
                <Tab.Screen name="View Sample" component={SampleViewer}/>
            </Tab.Navigator>
        </View>
    )
}
