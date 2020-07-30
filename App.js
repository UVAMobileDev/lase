// UT Austin LASE Database interaction application
// Designed to support web and native

// G. Michael Fitzgerald

// Written with IPP Summer 2020 interns!
// Sam Kim
// Hien (Taylor) Truong
// Julia Shea

// Import the necessary components
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';


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
    const [privileged, setPriviledged] = useState(false);
    const [key, setKey] = useState("");

    const update = ({verified, key}) => {
        setPriviledged(verified);
        setKey(key);
    }

    const ScreenParams = {
        Settings: {update}
    }

    useEffect(() => {
        const read = async () => {
            try {
                let key = await AsyncStorage.getItem('lase-api-key');
                key = key ? JSON.parse(key) : null;
                if(key && key.verified) {
                    setPriviledged(true);
                    setKey(key.key);
                }
            } catch(e) { console.log("Failed to load stored key from AsyncStorage") }
        }
        read();
    }, []);

    return (
        <NavigationContainer style={{flex: 1}}>
            {/* A NavigationContainer is required to wrap the top level navigator. */}
            <Drawer.Navigator initialRouteName="Home"
                        drawerType={Platform.OS === "web" ? "permanent" : "slide"}
                        drawerStyle={{backgroundColor: "#0AA"}}
                        drawerContentOptions={{
                            activeTintColor: "#fff",
                            inactiveTintColor: "#000",
                        }}>
                {/* Each screen has a name to appear in the UI and a component which it displays when selected. */}
                {
                    Screens.filter(screen => privileged ? true : !screen.privileged)
                    .map((screen, i) => (
                        <Drawer.Screen key={i}
                                name={screen.name}
                                component={screen.component}
                                initialParams={ScreenParams[screen.name] || {}}/>
                    ))
                }
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
