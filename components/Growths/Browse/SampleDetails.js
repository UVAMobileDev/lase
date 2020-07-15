// Displays a single sample's record with all it's information, and fetches
//  the corresponding sources asynchronously.

// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
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
            <Text>{sample.sampleID}</Text>
        </View>
    )
}
