/*this tab allows users to input a sampleID and, if valid, be redirected to the sample details page
This page displays the following:
    all growths that correspond to that sample
    all recipies that correspond to that sample
    a button that allows a growth to be added to that sample

once on the sample details page, users can click on a specific growth and view the GROWTH details page

*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API.js';

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

//helper functions to determine if the sampleID already exists
function existsEcho(sampleID) {
    for (let item = 0; item < GetEchoSamples.length; item++) {
        if (sampleID === item.sampleID) {
            return true;
        }
        else {return false};
    }
}
function existsBravo(sampleID) {
    for (let item = 0; item < GetBravoSamples.length; item++) {
        if (sampleID === item.sampleID) {
            return true;
        }
        else {return false};
    }
}


export default function SampleViewer(props) {
  let [text, setText] = useState('');

  // Samples are fetched asynchronously and stored using a hook.
  let [bravoSamples, setBravoSamples] = useState({loaded: false, items: []});
  let [echoSamples, setEchoSamples] = useState({loaded: false, items: []});

  return (
    <View>
        <Text style={{padding: 15}}>Enter a sample ID to view all growths associated with the sample:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onSubmitEditing={
              /*(text) => (existsBravo(text) || existsEcho(text)) ? props.navigation.navigate("Sample Details", {sample: text}) : <Text>no</Text>*/
              (text) => {props.navigation.navigate("Sample Details", {sample: text})}
          }
        />
    </View>
  );
}
