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
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from './constants/API';
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
        key: null,
        verified: false,
        dark: true,
    });

    // RESTORE
    // Load stored data as soon as the app opens
    useEffect(() => {
        const read = async () => {
            try {
                var dark = await AsyncStorage.getItem('dark');
                dark = dark === "true";
            } catch(e) {
                var dark = true;
                console.log("Failed to load stored dark mode setting from AsyncStorage.\nDefaulting to dark color palette.");
            }

            // The initial verification process doesn't take long, but it takes long enough for there to be
            // an uncomfortable color shift as the dark mode setting is restored. Therefore we update the dark
            // mode setting as soon as it's ready, and do the verification things afterwards.
            await setState({
                ...state,
                dark,
            });

            try {
                var key = await AsyncStorage.getItem('lase-api-key');
                key = key === null ? null : JSON.parse(key).key;
                let verification = await (fetch(`${BASE_URL}/verify`, {
                    method: "GET",
                    headers: { "x-api-key": key }
                })
                .then(r => r.json()))
                .catch((err) => false);
                var verified = verification && verification.statusCode === 200;
            } catch(err) {
                var key = "";
                var verified = false;
                console.log("Failed to load stored key from AsyncStorage.\nDefaulting to unverified null-valued key.", err);
            }

            // We have to explicitly include "dark" as a property in this state update because the state variable
            // does NOT reflect the state update made on 58-60.
            setState({
                key: key ? key : "",
                verified,
                dark,
            });
        }
        read();
    }, []);

    // UPDATE
    // When the dark mode setting is modified, save the change to the store.
    useEffect(() => {
        const toggle = async () => {
            try {
                await AsyncStorage.setItem('dark', state.dark ? "true" : "false");
            } catch(err) {
                console.log("Failed to update dark mode setting.", err);
            }
        }
        toggle();
    }, [state.dark]);
    // When the key or verification status is updated, save the change to the store.
    useEffect(() => {
        if(state.key === null && state.verified === false) return;
        console.log(state.key, state.verified);
        async function update() {
            try {
                await AsyncStorage.setItem('lase-api-key', JSON.stringify({
                    key: state.key,
                    verified: state.verified
                }));
            } catch(err) {
                console.log("Failed to update local key store.", err);
            }
        }
        update();
    }, [state.key, state.verified]);

    return (
        <KeyProvider value={{...state, setState}}>
        <NavigationContainer>
        <Drawer.Navigator
            initialRouteName="Home"
            drawerType={Platform.OS === "web" ? "permanent" : "slide"}
            drawerStyle={{
                paddingTop: 15,
                width: 175,
                backgroundColor: state.dark ? Colors.highlightDark : Colors.highlight
            }}
            drawerContentOptions={{
                activeTintColor: "#fff",
                inactiveTintColor: "#000",
            }}
            lazy={true}>

            {/* Each screen has a name to appear in the UI and a component which it displays when selected. */}
            {Screens.filter(screen => state.verified ? true : !screen.privileged)
                .map((screen, i) => (
                    <Drawer.Screen key={i}
                        name={screen.name}
                        component={screen.component}/>
                ))
            }
        </Drawer.Navigator>
        </NavigationContainer>
        </KeyProvider>
    );
}
