// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, ScrollView, ActivityIndicator,FlatLsit } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';
import { Ionicons } from '@expo/vector-icons';
import { Jet, InternationalOrange, Platinum, Gainsboro, EgyptianBlue, SpaceCadet, PurpleNavy } from '../../../constants/Colors';

import SelectType from '../../Publications/SelectType';



export default function InsertTab(props){
    const [publication,setPublication] = useState();
    return (
        <View style = {styles.container}>
            <ScrollView>

                <Text style = {styles.title}>
                    Publication creation:
                </Text>

                <Text style = {styles.section}>
                    Type of publication:
                    <SelectType placeholder={{label: "Select type", value: ""}} update={setPublication}/>
                </Text>

                <View style = {styles.submitArea}>
                    <Button title = "Submit publication"
                            color = {Jet}/>
                </View>
            </ScrollView>

        </View>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Platinum,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
    },
    section: {
        fontSize: 18,
        marginLeft: 60,
        fontWeight: "bold",
    },
    submitArea: {
        marginTop: 25,
        margin: 10,
        padding: 20,
        borderColor: Platinum,
        borderTopWidth: 1,
        alignItems: "center",
    },
});
