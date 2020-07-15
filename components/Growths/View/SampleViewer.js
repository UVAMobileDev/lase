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

// //Loads all Echo growths in an array
// const GetAllEchoGrowths = async () => {
//     let page = 0;
//     let echogrowths = []
//     let parsed = {echogrowths: []};
//
//     do {
//         let response = await fetch(`${BASE_URL}/machine/Echo/growths?page=${page}`);
//         parsed = await response.json();
//         echogrowths = echogrowths.concat(parsed.echogrowths);
//         page++;
//     } while(parsed.echogrowths.length > 0)
//     return echogrowths;
// }
//
// //Loads all Bravo growths in an array
// const GetAllBravoGrowths = async () => {
//     let page = 0;
//     let bravogrowths = []
//     let parsed = {bravogrowths: []};
//
//     do {
//         let response = await fetch(`${BASE_URL}/machine/Bravo/growths?page=${page}`);
//         parsed = await response.json();
//         bravogrowths = bravogrowths.concat(parsed.bravogrowths);
//         page++;
//     } while(parsed.bravogrowths.length > 0)
//     return bravogrowths;
// }


export default function SampleViewer(props) {
  const [text, setText] = useState('');
  const [echogrowths, setEchoGrowths] = useState({loaded: false, items: []});
  const [bravogrowths, setBravoGrowths] = useState({loaded: false, items: []});

  return (
    <View>
        <Text style={{padding: 15}}>Enter a sample ID to view all growths associated with the sample:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onSubmitEditing={
              () => (props.navigation.navigate("Sample Details", {sample: item}))
          }
        />

    </View>
  );
}
