//Top-level component, tab navigator for the Growths screen

import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SampleViewer from './SampleViewer';

import SampleDetails from './SampleDetails';
import FilterGrowths from './Filter';
import GrowthDetails from './GrowthDetails';
import AddGrowth from './Insert';

//separates the Growth page into two sections: Sample viewer and Growth browser
const Tab = createMaterialTopTabNavigator();

// Allows us to switch between the different screens we need in the Browsing area
const Stack = createStackNavigator();

// Navigator for the Sample Viewing and creation area
const CreatorStack = createStackNavigator();

function GrowthStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Filter Growths" component={FilterGrowths} options={{headerShown: false}}/>
            <Stack.Screen name="Sample Details" component={SampleDetails}/>
            <Stack.Screen name="Growth Details" component={GrowthDetails}/>
            <Stack.Screen name="Add Growth" component={AddGrowth}/>
        </Stack.Navigator>
    );
}

function ViewerStack(props) {
    return (
        <CreatorStack.Navigator>
            <CreatorStack.Screen name="View Sample" component={SampleViewer} />
            <CreatorStack.Screen name="Sample Details" component={SampleDetails}/>
            <CreatorStack.Screen name="Growth Details" component={GrowthDetails}/>
            <CreatorStack.Screen name="Add Growth" component={AddGrowth}/>
        </CreatorStack.Navigator>
    );
}

export default function Growths(props) {
    return (
        <View style={{flex: 1, backgroundColor: "#0AA"}}>
            <Tab.Navigator initialRouteName="Browse Growths" style={{marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight,}}>
                <Tab.Screen name="Browse Growths" component={GrowthStack}/>
                <Tab.Screen name="View Sample" component={ViewerStack}/>
            </Tab.Navigator>
        </View>
    )
}
