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

const LoadSamples = async (text) => {
    let page = 0;
    let growths = []
    let parsed = {growths: []};

    do {
        let response = await fetch(`${BASE_URL}/machine/Echo/growths?page=${page}`);
        parsed = await response.json();
        growths = records.concat(parsed.growths);
        page++;
    } while(parsed.records.length > 0)
    return records;
}

export default function SampleViewer() {
  const [value, onChangeText] = React.useState('');

  return (
    <View>
        <Text style={{padding: 15}}>Enter a sample ID to view all growths associated with the sample:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onChangeText={text => onChangeText(text)}
          value={value}
        />

        useEffect 

    </View>
  );
}
