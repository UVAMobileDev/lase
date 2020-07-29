// Displays a single sample's record with all it's information, and fetches
//  the corresponding sources asynchronously.

// Imports
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Ionicons } from '@expo/vector-icons';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");

import UserContext from './UserContext';


export default function SampleDetails(props) {
    // The data for the sample itself is provided via navigation parameters.
    let sampleID = props.route.params.sampleID;
    const [growths, setGrowths] = useState([]);
    console.log(sampleID);



    //get the list of growths associated with this sample ID
    useEffect(() => {
        let load = async () => {
            let response = []
            response = await fetch(`${BASE_URL}/machine/Echo/growths?sampleID=${sampleID}`).then(r => r.json());
            setGrowths(response.results)
        }
        load();
    }, []);


    return (
        <View>
            <Text>The following growths are associated with Sample ID {sampleID}:</Text>
            <FlatList
                style={styles.list}
                data={growths}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={10}
                renderItem={({item}) => (
                    <View style={styles.recordRow}>
                        <View>
                            <TouchableOpacity   style={styles.openRecordButton}
                                                onPress={() => props.navigation.navigate("Growth Details", {growth: item})}>
                                <Ionicons name="md-open" size={16} color="blue" style={{position: "relative", left: 3, top: 1}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 75}}>
                            <Text style={styles.rowText}>{item.sampleID}</Text>
                        </View>
                        <View style={{width: 75}}>
                            <Text style={styles.rowText}>{item.id}</Text>
                        </View>
                        <View style={{width: 75}}>
                            <Text style={styles.rowText}>{item.machine}</Text>
                        </View>
                        <View style={{width: 150}}>
                            <Text style={styles.rowText}>{item.grower}</Text>
                        </View>
                    </View>
                )}/>
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
