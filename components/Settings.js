import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, ActivityIndicator, Switch } from 'react-native';
import { BASE_URL } from '../constants/API';
import { API_KEY } from '../keys.js';
import { Entypo, Foundation } from '@expo/vector-icons';

// VALID KEY
// 2yRALZXus73AaKg5c1wWv7qf4DTSx84naQGIGCCf

import AsyncStorage from '@react-native-community/async-storage';

const AttemptActivation = async (key, update, setVerifying, setKey) => {
    setVerifying(true);
    let verification = await fetch(`${BASE_URL}/verify`, {
        method: "GET",
        headers: { "x-api-key": key }
    }).catch(() => false);

    let verified = verification && verification.status === 200;
    let store = {verified, key};

    try {
        await AsyncStorage.setItem('lase-api-key', JSON.stringify(store));
    } catch(e) { console.log(e); }

    update(store);
    setKey(store);
    setVerifying(false);
}

const DestroyToken = async () => {
    try {
        await AsyncStorage.removeItem('lase-api-key');
    } catch(e) { console.log(e); }
}

export default function Settings(props) {
    const [verifying, setVerifying] = useState(false);
    const [key, setKey] = useState({});
    const [darkMode, setDarkMode] = useState({loaded: false, value: false});

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
        props.route.params.update({...key, dark: darkMode.value})
        const toggle = async () => {
            try {
                await AsyncStorage.setItem('dark', darkMode.value);
            } catch(e) { console.log("Failed to update dark mode setting") }
        }
        toggle();
    }, [darkMode.value]);

    return (
        <View style={{flex: 1, backgroundColor: "#0AA"}}>
            <View style={styles.container}>
                <View style={[styles.section, {borderTopWidth: 0}]}>
                    <Text style={styles.sectionTitle}>Access Key</Text>
                    <Text style={styles.sectionDescription}>Entering a valid access key will reveal additional features.</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.inputLabel}>Key: </Text>
                        <TextInput style={styles.input}
                                value={key.key}
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
                                        onPress={() => AttemptActivation(key.key, props.route.params.update, setVerifying, setKey)}>
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
                    <Text style={styles.sectionTitle}>Light and Dark Mode</Text>
                    <Text style={styles.sectionDescription}>Are your eyes on fire from a bright white user experience? Or maybe you're having trouble reading anything with a dark color palette in a bright working environment. Here you can switch between light and dark palettes.</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Foundation name="lightbulb" size={24} color="black" />
                        <Switch style={{margin: 10}}
                            value={darkMode.value}
                            onValueChange={() => setDarkMode({...darkMode, value: !darkMode.value})}
                            />
                        <Entypo name="moon" size={24} color="black" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        borderBottomWidth: .5,
        borderColor: "#999",
    },
    inputLabel: {
        fontWeight: "bold",
    },
    sectionDescription: {
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
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
});
