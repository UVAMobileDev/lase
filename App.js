// UT Austin LASE Database interaction application
// Designed to support web and native

// Import the necessary components
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Jet, InternationalOrange } from './constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Import our custom screen components.
import Landing from './components/Landing/Landing.js';
import Maintenance from './components/Maintenance/Maintenance';

// Create left side drawer navigator. For this application, this drawer is the
//  top level navigator.
const Drawer = createDrawerNavigator();

// Basic screen with nothing but a blurb of text saying the sceen is todo.
function TodoScreen(props) {
    return (
        <View style={styles.container}>
            <Text>This screen has not been implemented yet.</Text>
        </View>
    )
}

// This function is currently unused, but will hopefully have an eventual purpose
//  once we figure out how to place icons in the drawer.
// The reason for a switch is because the name of a drawer item, supplied to the
//  function here as "name", is unlikely to be the name of the icon we want that
//  item to have.
function IconGenerator(name) {
    switch(name) {
        default:
            return ({focused, color, size}) => (<Ionicons color={color} size={size} name={focused ? 'md-home' : 'md-home'}/>)
    }
}

// Experimental. Used to style the drawer.
const drawerStyle = {
    // backgroundColor: Jet,
    color: InternationalOrange
}

// Expiermental. Used to specify certain options to the drawer.
const drawerOptions = {}

// Top level component for the application.
export default function App() {
    return (
        <NavigationContainer>
            {/* A NavigationContainer is required to wrap the top level navigator. */}
            <Drawer.Navigator   initialRouteName="Maintenance"
                                drawerType={Platform.OS === "web" ? "permanent" : "slide"}
                                contentOptions={drawerOptions}
                                drawerStyle={drawerStyle}>
                {/* Each screen has a name to appear in the UI and a component which it displays when selected. */}
                <Drawer.Screen name="Home" component={Landing}/>
                <Drawer.Screen name="Growths" component={TodoScreen}/>
                <Drawer.Screen name="Maintenance" component={Maintenance}/>
                <Drawer.Screen name="Publications" component={TodoScreen}/>
                <Drawer.Screen name="Utilities" component={TodoScreen}/>
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
