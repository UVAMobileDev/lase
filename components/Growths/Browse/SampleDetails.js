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
        <View style={styles.container}>
        <View style={{paddingLeft: 10, paddingTop: 10, paddingBottom: -20}}>
            <Text  style={{fontSize: 16, fontWeight: '400', paddingBottom: 15}}>The following growths are associated with Sample ID {sampleID}. Select a growth's ID to view individual growth details.</Text>
        </View>
        <FlatList
                style={styles.list}
                data={growths}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={10}
                renderItem={({item}) => (
                    <View style={styles.growthRow}>
                        <View style={{width: 30, marginRight:20}}>
                            <TouchableOpacity   style={styles.openGrowthButton}
                                            onPress={() => props.navigation.navigate("Growth Details", {growth: item})}>
                                <Text style={{width: 40, fontSize: 16, color: 'blue'}}>{item.id}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.rowText}>{item.sampleID}</Text>
                        </View>
                        <View>
                            <Text style={styles.rowText}>{item.machine}</Text>
                        </View>
                        <View>
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
    growthRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 4,
    },
    openGrowthButton: {
        width: 18,
        margin: 4,
        borderRadius: 5,
        backgroundColor: "white",
    },
    rowText: {
        fontSize: 16,
        color: "black",
        padding: 10,

    },
    filterControls: {
        backgroundColor: "red",
    }
});
