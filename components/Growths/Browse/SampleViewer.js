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



export default function SampleViewer(props) {
  let [text, setText] = useState('');

  return (
    <View style={styles.container}>
        <Text style={{padding: 40, fontSize: 16, fontWeight: '500'}}>Enter a Sample ID to view all growths associated with the sample:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 300, padding: 15, marginLeft: 40, marginTop: -20}}
          onChangeText={text => setText(text)}
          onSubmitEditing={() => {props.navigation.navigate("Sample Details", {sampleID: text})}
          }
        />
    </View>
  );
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "flex-start",
    },

})
