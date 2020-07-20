// Displays a single sample's record with all it's information, and fetches
//  the corresponding sources asynchronously.

// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Ionicons } from '@expo/vector-icons';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");

//gets lists of growths associated with the same sampleID
const GetBravoSamples = async sampleID => {
    let response = await fetch(`${BASE_URL}/machine/Bravo/growths?page=${page}`);
    let parsed = await response.json();
    return parsed.samples;
}
const GetEchoSamples = async sampleID => {
    let response = await fetch(`${BASE_URL}/machine/Echo/growths?page=${page}`);
    let parsed = await response.json();
    return parsed.samples;
}


export default function SampleDetails(props) {
    // The data for the sample itself is provided via navigation parameters.
    let sample = props.route.params.sample;

    // Samples are fetched asynchronously and stored using a hook.
    let [bravoSamples, setBravoSamples] = useState({loaded: false, items: []});
    let [echoSamples, setEchoSamples] = useState({loaded: false, items: []});

    if(sample) return (
        <View>
            <Text>The following growths are associated with sample ID {sample.sampleID}:</Text>
                    <View style={styles.recordRow}>
                    <View>
                        <TouchableOpacity   style={styles.openRecordButton}
                                            onPress={() => props.navigation.navigate("Growth Details")}>
                            <Ionicons name="md-open" size={16} color="blue" style={{position: "relative", left: 3, top: 1}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: 75}}>
                        <Text style={styles.rowText}>{sample.id}</Text>
                    </View>
                    <View style={{width: 75}}>
                        <Text style={styles.rowText}>{sample.machine}</Text>
                    </View>
                    <View style={{width: 150}}>
                        <Text style={styles.rowText}>{sample.grower}</Text>
                    </View>
                    </View>
        </View>
    )
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    listContainer: {
        flex: 1,
    },
    list: {
        margin: 10,
        marginBottom: 30,
    },
    recordRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 4,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderColor: "black",
    },
    openRecordButton: {
        width: 18,
        margin: 4,
        borderRadius: 5,
        backgroundColor: "white",
    },
    rowText: {
        fontSize: 16,
        color: "black",

    },
    filterControls: {
        backgroundColor: "red",
    }
});
