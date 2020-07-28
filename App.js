// UT Austin LASE Database interaction application
// Designed to support web and native

// G. Michael Fitzgerald

// Written with IPP Summer 2020 interns!
// Sam Kim
// Hien (Taylor) Truong
// Julia Shea

// Import the necessary components
import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Create left side drawer navigator. For this application, this drawer is the
//  top level navigator.
const Drawer = createDrawerNavigator();

const Screens = [
    {name: "Home", component: require('./components/Landing/Index').default, privileged: false},
    {name: "Growths", component: require('./components/Growths/Index').default, privileged: true},
    {name: "Maintenance", component: require('./components/Maintenance/Index').default, privileged: true},
    {name: "Publications", component: require('./components/Publications/Index').default, privileged: true},
    {name: "Utilities", component: require('./components/Utilities/Index').default, privileged: true},
    {name: "Settings", component: require('./components/Settings').default, privileged: false},
];

// Top level component for the application.
export default function App() {
    const [privileged, setPriviledged] = useState(true);

    return (
        <NavigationContainer>
            {/* A NavigationContainer is required to wrap the top level navigator. */}
            <Drawer.Navigator   initialRouteName="Home"
                                drawerType={Platform.OS === "web" ? "permanent" : "slide"}>
                {/* Each screen has a name to appear in the UI and a component which it displays when selected. */}
                {
                    Screens.filter(screen => privileged ? true : !screen.privileged)
                    .map((screen, i) => (
                        <Drawer.Screen key={i}
                                name={screen.name}
                                component={screen.component}/>
                    ))
                }
            </Drawer.Navigator>
        </NavigationContainer>
    );

    // <Drawer.Screen name="Home" component={Landing}/>
    // {
    //     /* Only display priviledged screens if valid api key is present */
    //     privileged ? (
    //         <Drawer.Screen name="Growths" component={Growths}/>
    //     ) : (<View/>)
    // }
    // <Drawer.Screen name="Maintenance" component={Maintenance}/>
    // <Drawer.Screen name="Publications" component={Public}/>
    // <Drawer.Screen name="Utilities" component={Utilities}/>
    // <Drawer.Screen name="Settings" component={Settings} initialParams={{setPriviledged}}/>
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
