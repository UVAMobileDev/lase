// UT Austin LASE Database interaction application
// Designed to support web and native

// G. Michael Fitzgerald

// Written with IPP Summer 2020 interns!
// Sam Kim
// Hien (Taylor) Truong
// Julia Shea

// Import the necessary components
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


// Import our custom screen components.
import Landing from './components/Landing/Landing.js';
import Maintenance from './components/Maintenance/Maintenance';
import Utilities from './components/Utilities/Utilities';
import Public from './components/Publications/Navigator_Publication';
import Growths from './components/Growths/Growths'

// Create left side drawer navigator. For this application, this drawer is the
//  top level navigator.
const Drawer = createDrawerNavigator();

// Top level component for the application.
export default function App() {
    return (
        <NavigationContainer>
            {/* A NavigationContainer is required to wrap the top level navigator. */}
            <Drawer.Navigator   initialRouteName="Home"
                                drawerType={Platform.OS === "web" ? "permanent" : "slide"}>
                {/* Each screen has a name to appear in the UI and a component which it displays when selected. */}
                <Drawer.Screen name="Home" component={Landing}/>
                <Drawer.Screen name="Growths" component={Growths}/>
                <Drawer.Screen name="Maintenance" component={Maintenance}/>
                <Drawer.Screen name="Publications" component={Public}/>
                <Drawer.Screen name="Utilities" component={Utilities}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

// Create the stylesheet for the root component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
