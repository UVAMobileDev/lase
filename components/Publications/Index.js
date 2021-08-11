// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, {useContext, useEffect, useReducer} from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import InsertTab from './Insert/InsertTab';
import ViewPublication from './View/ViewPublication.js';
import ViewTab from './View/ViewTab.js';
import Bibliography from './View/Bibliography';
import {LightStyles, DarkStyles, Colors} from "../../constants/globalStyle";
import KeyContext from "../../KeyContext";

const onWeb = Platform.OS === "web";

// Create the stack navigator
const Stack = createStackNavigator();
function ViewStack(props) {
    // const { dark } = useContext(KeyContext);
    // const [styles, updateStyles] = useReducer(() => StyleSheet.create(dark ? DarkStyles : LightStyles,...LocalStyles), {});
    // useEffect(updateStyles, [dark]);

    return (
        <Stack.Navigator>
            <Stack.Screen backgroundColor = "orange" name="View Tab" component={ViewTab} options={{headerShown: false}}/>
            <Stack.Screen  name="Details" component={ViewPublication}/>
            <Stack.Screen  name="Citations" component={Bibliography} />
        </Stack.Navigator>
    )
}

// Create the tab navigator which separates the Browse and Create sections.
const Tab = createMaterialTopTabNavigator();

export default function Navigator_Publication(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create(dark ? DarkStyles : LightStyles), {});
    useEffect(updateStyles, [dark]);

    return (
        <View style={[styles.screenContainer, styles.container]}>
            <Tab.Navigator
                    tabBarOptions={{
                        labelStyle: {fontWeight: "bold"},
                        inactiveTintColor: "#000000",
                        activeTintColor: "#efefef",
                        style: {
                            backgroundColor: dark ? Colors.highlightDark : Colors.highlight,
                        },
                    }}
                    style={styles.tabNavigator}
                    currentBrowser="All publications"
                    swipeEnabled={!onWeb}>
                <Tab.Screen name="All publications" component={ViewStack}/>
                <Tab.Screen name="Insert new" component={InsertTab}/>
            </Tab.Navigator>
        </View>
    )
}

const LocalStyles = {
    tabNavigator: {
        marginTop: onWeb ? 0 : Constants.statusBarHeight,
    },
    container: {
        flex: 1,
        //backgroundColor: "#0AA",
    },
};
