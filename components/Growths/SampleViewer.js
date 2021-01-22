
import React, { useContext, useReducer, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../constants/API.js';
import SelectSystem from '../lib/forms/SelectSystem';
const fetch = require('node-fetch');

import KeyContext from '../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';

export default function SampleViewer(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const [sampleID, setID] = useState('');
    const [machine, setMachine] = useState('');

    const navigate = () => props.navigation.navigate("Sample Details", {sampleID, system: machine});

    return (
        <View style={[styles.componentBackground, {alignItems: "center"}]}>
            <Text style={styles.lblSecondaryHeading}>Enter a Sample ID to view its details, or to create a new sample if the ID does not yet exist.</Text>
            <View style={{width: 300}}>
                <SelectSystem
                    dark={dark}
                    placeholder={{label: "Select system", value: ""}}
                    update={setMachine}
                    />
            </View>
            <TextInput
                style={[styles.txt, styles.input]}
                onChangeText={text => setID(text)}
                onSubmitEditing={navigate}
                placeholder="Sample ID"
                placeholderTextColor={Colors.neutral1}
                autoCorrect={false}
                />

            <TouchableOpacity style={styles.openButton}
                    onPress={navigate}>
                <Text>Open or create sample</Text>
            </TouchableOpacity>
        </View>
    );
}

// StyleSheet
const LocalStyles = {
    headerText: {
        margin: 10,
        fontSize: 16,
    },
    openButton: {
        margin: 10,
        padding: 10,
        backgroundColor: "#6f6",
        borderRadius: 5,
    },
    input: {
        width: 300,
        margin: 20,
        paddingHorizontal: 5,
    },
}
