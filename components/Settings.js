import React, { useEffect, useState, useReducer } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, ActivityIndicator, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../constants/API';
import { Entypo, Foundation } from '@expo/vector-icons';

import { LightStyles, DarkStyles, Colors } from '../constants/globalStyle';


const DestroyToken = async () => {
    try {
        await AsyncStorage.removeItem('lase-api-key');
    } catch(e) { console.log(e); }
}

export default function Settings(props) {
    const [verifying, setVerifying] = useState(false);
    const [key, setKey] = useState({});
    const [darkMode, setDarkMode] = useState({loaded: false, value: true});

    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(darkMode.value ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [darkMode.value]);

    // On page load, the root component will attempt to preload the key from
    // storage and look for previous verification. Since this side effect won't
    // run until the Settings tab is selected, we don't need to worry about propagating
    // the loaded key back up the hierarchy on the "initial" loading.
    useEffect(() => {
        const read = async () => {
            try {
                let key = await AsyncStorage.getItem('lase-api-key');
                if(key) setKey(JSON.parse(key));
            } catch(e) { console.log("Failed to load stored key from AsyncStorage") }
            try {
                let dark = await AsyncStorage.getItem('dark');
                setDarkMode({loaded: true, value: dark === "true"});
            } catch(e) { console.log("Failed to load stored dark mode setting from AsyncStorage") }
        }
        read();
    }, []);

    useEffect(() => {
        if(!darkMode.loaded) return;
        if(props.route.params.update) props.route.params.update({...key, dark: darkMode.value});
        const toggle = async () => {
            try {
                await AsyncStorage.setItem('dark', darkMode.value ? "true" : "false");
            } catch(e) { console.log("Failed to update dark mode setting") }
        }
        toggle();
    }, [darkMode.value]);

    async function AttemptActivation() {
        setVerifying(true);
        const update = props.route.params.update;
        let verification = await fetch(`${BASE_URL}/verify`, {
            method: "GET",
            headers: { "x-api-key": key.key }
        }).catch(() => false);

        let verified = verification && verification.status === 200;
        let store = {verified, key: key.key, dark: darkMode.value};

        try {
            await AsyncStorage.setItem('lase-api-key', JSON.stringify(store));
        } catch(e) { console.log(e); }

        if(update) update(store);
        setKey(store);
        setVerifying(false);
    }

    if(!darkMode.loaded) {
        return (
            <View />
        );
    }

    return (
        <View style={styles.screenContainer}>
        <View style={styles.componentBackground}>
            <View style={[styles.section, {borderTopWidth: 0}]}>
                <Text style={[styles.bold, styles.lblPrimaryHeading]}>Access Key</Text>
                <Text style={styles.lblSecondaryHeading}>Entering a valid access key will reveal additional features.</Text>
                <View style={styles.horiztonalItemWrapper}>
                    <Text style={[styles.bold, styles.lblFormLabel]}>Key: </Text>
                    <TextInput style={[styles.txt, styles.input]}
                            value={key.key || ""}
                            onChangeText={val => setKey({verified: key.verified, key: val})}/>
                </View>

                <View style={styles.buttonRow}>
                    {
                        verifying ? (
                            <View style={styles.button}>
                                <ActivityIndicator />
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.button}
                                    onPress={AttemptActivation}>
                                <Text style={{textAlign: "center"}}>Update Key</Text>
                            </TouchableOpacity>
                        )
                    }
                    <View style={[styles.button, key.verified ? {} : {backgroundColor: "red"}]}>
                        <Text style={{textAlign: "center"}}>{key.verified ? "Key has been verified!" : "Unverified key."}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={[styles.bold, styles.lblSecondaryHeading]}>Light and Dark Mode</Text>
                <View style={styles.horiztonalItemWrapper}>
                    <Foundation name="lightbulb" size={24} color="#fcbb4b" />
                    <Switch style={{margin: 10}}
                        value={darkMode.value}
                        onValueChange={() => setDarkMode({...darkMode, value: !darkMode.value})}
                        />
                    <Entypo name="moon" size={24} color="#111" />
                </View>
            </View>
            <View style={{margin: 50, borderColor: "red", borderWidth: 3, width: 156}}>
                <View style={{width: 150, height: 150, backgroundColor: Colors.base}}>
                    <Text style={{color: "black"}}>Base</Text>
                </View>
                <View style={{width: 150, height: 150, backgroundColor: Colors.baseDark}}>
                    <Text style={{color: "white"}}>Base Dark</Text>
                </View>
                <View style={{width: 150, height: 150, backgroundColor: Colors.contrast}}>
                    <Text style={{color: "white"}}>Contrast</Text>
                </View>
                <View style={{width: 150, height: 150, backgroundColor: Colors.contrastDark}}>
                    <Text style={{color: "black"}}>Contrast Dark</Text>
                </View>
                <View style={{width: 150, height: 150, backgroundColor: Colors.highlight}}>
                    <Text style={{color: "white"}}>Highlight</Text>
                </View>
                <View style={{width: 150, height: 150, backgroundColor: Colors.highlightDark}}>
                    <Text style={{color: "white"}}>Highlight Dark</Text>
                </View>
            </View>
        </View>
        </View>
    );
}

const LocalStyles = {
    buttonRow: {
        flexDirection: Platform.OS === "web" ? "row" : "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
    },
    input: {
        width: "90%",
        marginVertical: 5,
        borderWidth: 0,
        borderBottomWidth: .5,
    },
    inputLabel: {
        fontWeight: "bold",
    },
    sectionDescription: {
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 10,
    },
    section: {
        padding: 15,
        borderColor: "black",
        borderTopWidth: 2,
    },
    button: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 2,
        width: Platform.OS === "web" ? "40%" : "80%",
        height: 45,
        justifyContent: "center",
        backgroundColor: "#53ff23",
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight,
    }
};
