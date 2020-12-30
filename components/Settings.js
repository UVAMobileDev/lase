import React, { useEffect, useState, useReducer, useContext } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, ActivityIndicator, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../constants/API';
import { Entypo, Foundation } from '@expo/vector-icons';

import { LightStyles, DarkStyles, Colors } from '../constants/globalStyle';
import KeyContext from '../KeyContext';

export default function Settings(props) {
    const context = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(context.dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [context.dark]);

    const [verifying, setVerifying] = useState(false);
    const [localKey, setLocalKey] = useState(context.key);

    async function AttemptActivation() {
        setVerifying(true);
        let verification = await fetch(`${BASE_URL}/verify`, {
            method: "GET",
            headers: { "x-api-key": localKey }
        }).catch(() => false);

        let verified = verification && verification.status === 200;

        context.setState({
            ...context.state,
            key: localKey,
            verified,
            dark: context.dark,
        });
        setVerifying(false);
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
                            value={localKey}
                            onChangeText={val => setLocalKey(val)}/>
                </View>

                <View style={styles.buttonRow}>
                    {verifying ? (
                        <View style={styles.button}>
                            <ActivityIndicator />
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.button}
                                onPress={AttemptActivation}>
                            <Text style={{textAlign: "center"}}>Update Key</Text>
                        </TouchableOpacity>
                    )}
                    <View style={[styles.button, context.verified ? {} : {backgroundColor: "red"}]}>
                        <Text style={{textAlign: "center"}}>{context.verified ? "Key has been verified!" : "Unverified key."}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={[styles.bold, styles.lblSecondaryHeading]}>Light and Dark Mode</Text>
                <View style={styles.horiztonalItemWrapper}>
                    <Foundation name="lightbulb" size={24} color="#fcbb4b" />
                    <Switch style={{margin: 10}}
                        value={context.dark}
                        onValueChange={() => context.setState({...context, dark: !context.dark})}
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

const onWeb = Platform.OS === "web";
const LocalStyles = {
    buttonRow: {
        flexDirection: onWeb ? "row" : "column",
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
        width: onWeb ? "40%" : "80%",
        height: 45,
        justifyContent: "center",
        backgroundColor: "#53ff23",
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: onWeb ? 0 : Constants.statusBarHeight,
    }
};
