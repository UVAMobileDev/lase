//Top-level component, tab navigator for the Growths screen

import React, { useContext } from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import KeyContext from '../../KeyContext';
import { Colors } from '../../constants/globalStyle';

import SampleViewer from './SampleViewer';
import SampleDetails from './SampleDetails';
import FilterGrowths from './Filter';
import GrowthDetails from './GrowthDetails';
import AddGrowth from './Insert';

const onWeb = Platform.OS === "web";

//separates the Growth page into two sections: Sample viewer and Growth browser
const Tab = createMaterialTopTabNavigator();

// Allows us to switch between the different screens we need in the Browsing area
const Stack = createStackNavigator();

// Navigator for the Sample Viewing and creation area
const CreatorStack = createStackNavigator();

function GrowthStack(props) {
    const { dark } = useContext(KeyContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: dark ? Colors.highlightDark : Colors.highlight,
                    borderWidth: 3,
                    borderColor: "#000",
                }
            }}
            >
            <Stack.Screen
                name="Filter Growths"
                component={FilterGrowths}
                options={{headerShown: false}}
                />
            <Stack.Screen
                name="Sample Details"
                component={SampleDetails}
                />
            <Stack.Screen
                name="Growth Details"
                component={GrowthDetails}
                />
            <Stack.Screen
                name="Add Growth"
                component={AddGrowth}
                />
        </Stack.Navigator>
    );
}

function ViewerStack(props) {
    const { dark } = useContext(KeyContext);
    return (
        <CreatorStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: dark ? Colors.highlightDark : Colors.highlight,
                    borderWidth: 3,
                    borderColor: "#000",
                }
            }}
            >
            <CreatorStack.Screen
                name="Insert Sample"
                component={SampleViewer}
                />
            <CreatorStack.Screen
                name="Sample Details"
                component={SampleDetails}
                />
            <CreatorStack.Screen
                name="Growth Details"
                component={GrowthDetails}
                />
            <CreatorStack.Screen
                name="Add Growth"
                component={AddGrowth}
                />
        </CreatorStack.Navigator>
    );
}

export default function Growths(props) {
    const { dark } = useContext(KeyContext);
    return (
        <Tab.Navigator
                initialRouteName="Browse Growths"
                style={{marginTop: onWeb ? 0 : Constants.statusBarHeight}}
                swipeEnabled={!onWeb}
                keyboardDismissMode="on-drag"
                tabBarOptions={{
                    labelStyle: {fontWeight: "bold"},
                    inactiveTintColor: "#000000",
                    activeTintColor: "#efefef",
                    style: {
                        backgroundColor: dark ? Colors.highlightDark : Colors.highlight,
                    },
                }}
                >
            <Tab.Screen name="Browse Growths" component={GrowthStack}/>
            <Tab.Screen name="View Sample" component={ViewerStack}/>
        </Tab.Navigator>
    )
}
