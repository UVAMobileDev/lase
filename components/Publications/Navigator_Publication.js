// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import InsertTab from './Insert/InsertTab';
import ViewPublication from './View/ViewPublication.js';
import ViewTab from './View/ViewTab.js';

// Create the stack navigator
const Stack = createStackNavigator();
function ViewStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="View Tab" component={ViewTab} options={{headerShown: false}}/>
            <Stack.Screen name="Details" component={ViewPublication}/>
        </Stack.Navigator>
    )
}

// Create the tab navigator which separates the Browse and Create sections.
const Tab = createMaterialTopTabNavigator();

export default function Navigator_Publication(props) {

    return (
        <View style={{flex: 1, backgroundColor: "#0AA"}}>
            <Tab.Navigator currentBrowser="All publications" style={{marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight}}>
                <Tab.Screen name="All publications" component={ViewStack}/>
                <Tab.Screen name="Insert new" component={InsertTab}/>
            </Tab.Navigator>
        </View>
    )
}







const styles = StyleSheet.create({
    title: {
        width: 500,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",

    },
    author: {
        width: 600,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",
    },
    id: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    listContainer: {
        flex: 1,
    },
    list: {
        margin: 10,
        marginBottom: 30,
    },
    recordRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 4,
        borderRadius: 8,
        borderLeftWidth: 3,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 4,
    },
    openRecordButton: {
        width: 18,
        margin: 4,
        borderRadius: 5,
    },
    rowText: {
        fontSize: 16,
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    publicTab: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});
