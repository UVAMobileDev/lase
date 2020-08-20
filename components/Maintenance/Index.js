// Simple top level component for the Maintenance screen. Essentially just wraps
//  a tab navigator which holds most of the content.

// Imports
import React from 'react';
import Constants from 'expo-constants';
import { View, Text, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Record from './Find/Record.js';
import Filter from './Find/Filter';
import Insert from './Insert/Insert';

const onWeb = Platform.OS === "web";

// Create the tab navigator which separates the Browse and Create sections.
const Tab = createMaterialTopTabNavigator();

const BrowseStack = createStackNavigator();

// Browse is the component which appears under the Maintenance/Find tab. Since
//  it allows you to look at the list of records in the database, as well as an
//  individual record, the top level component here just creates a stack navigator
//  to wrap the list/filter and creation functionalities.
function Browse(props) {
    return (
        <BrowseStack.Navigator>
            <BrowseStack.Screen name="Filter" component={Filter} options={{headerShown: false}}/>
            <BrowseStack.Screen name="Record" component={Record}/>
        </BrowseStack.Navigator>
    );
}

export default function Maintenance(props) {
    return (
        <View style={{flex: 1, backgroundColor: "#0AA"}}>
            <Tab.Navigator
                    style={{marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight,}}
                    initialRouteName="Browse"
                    swipeEnabled={!onWeb}>
                <Tab.Screen name="Browse" component={Browse}/>
                <Tab.Screen name="Create" component={Insert}/>
            </Tab.Navigator>
        </View>
    )
}
