// UT Austin LASE Database interaction application
// Designed to support web and native

// G. Michael Fitzgerald

// Written with IPP Summer 2020 interns!
// Sam Kim
// Hien (Taylor) Truong
// Julia Shea

// NOTE: this change must be implemented manually after yarn installation in
// order for text selection to work as expected on pages with tab navigators.
// https://github.com/software-mansion/react-native-gesture-handler/pull/1037/commits/fa9835063d0017288539fedc65b0b8d3781a5974

// Import the necessary components
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { KeyProvider } from './KeyContext';
import { Colors } from './constants/globalStyle';


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
    const [state, setState] = useState({
        privileged: false,
        key: "",
        dark: false,
    })

    function update({verified, key, dark}) {
        setState({
            privileged: verified,
            key,
            dark,
        });
    }

    const ScreenParams = {
        Settings: {update, dark: state.dark}
    }

    useEffect(() => {
        const read = async () => {
            try {
                var dark = await AsyncStorage.getItem('dark');
                dark = dark === "true";
            } catch(e) { console.log("Failed to load stored dark mode setting from AsyncStorage") }
            try {
                var key = await AsyncStorage.getItem('lase-api-key');
                key = key ? JSON.parse(key) : {};
            } catch(e) { console.log("Failed to load stored key from AsyncStorage") }
            setState({...state, dark, ...key, privileged: key && key.verified});
        }
        read();
    }, []);

    // {/* A NavigationContainer is required to wrap the top level navigator. */}
    return (
        <KeyProvider value={{key: state.key, dark: state.dark}}>
            <NavigationContainer style={{flex: 1, backgroundColor: state.dark ? Colors.baseDark : Colors.base}}>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerType={Platform.OS === "web" ? "permanent" : "slide"}
                    drawerStyle={{backgroundColor: state.dark ? Colors.highlightDark : Colors.highlight}}
                    drawerContentOptions={{
                        activeTintColor: "#fff",
                        inactiveTintColor: "#000",
                    }}
                    lazy={true}>
                    {/* Each screen has a name to appear in the UI and a component which it displays when selected. */}
                    {
                        Screens.filter(screen => state.privileged ? true : !screen.privileged)
                        .map((screen, i) => (
                            <Drawer.Screen key={i}
                                    name={screen.name}
                                    component={screen.component}
                                    initialParams={ScreenParams[screen.name] || {}}/>
                        ))
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        </KeyProvider>
    );
}
