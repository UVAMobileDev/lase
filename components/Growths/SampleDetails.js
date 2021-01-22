import React, { useContext, useReducer, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Platform, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../constants/API.js';
import { Entypo } from '@expo/vector-icons';
const fetch = require("node-fetch");

import KeyContext from '../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';

export default function SampleDetails(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    // The data for the sample itself is provided via navigation parameters.
    let sampleID = props.route.params.sampleID;
    let machine = props.route.params.system;
    const [state, setState] = useState({growths: [], recipes: [], loading: true});

    // Load growths and recipes
    useEffect(() => {
        let load = async () => {
            let urls = [
                `${BASE_URL}/machine/${machine}/growths?sampleID=${sampleID}`,
                `${BASE_URL}/machine/${machine}/recipe/${sampleID}`,
            ]
            let responses = await Promise.all(urls.map(async url => await fetch(url).then(r => r.json())))
            setState({
                loading: false,
                growths: responses[0].results || [],
                recipes: responses[1].recipes || [],
            });
        }
        load();
    }, [sampleID]);

    return (
        <ScrollView style={styles.componentBackground}>
            <View>
                <View style={{paddingLeft: 10, paddingTop: 10}}>
                    <Text style={styles.lblPrimaryHeading}>Growths from Sample {sampleID}. Select a growth's ID to view individual growth details.</Text>
                </View>

                <View style={styles.growthList}>
                    {state.loading ? (<ActivityIndicator size={24}/>) :
                    state.growths.map(growth => (
                        <View key={growth.id} style={styles.growthRow}>
                            <TouchableOpacity
                                style={{paddingLeft: 10}}
                                onPress={() => props.navigation.navigate("Growth Details", {growth: growth, sampleID: growth.sampleID})}>
                                <Text style={styles.firstRowItem}>{growth.id}</Text>
                            </TouchableOpacity>
                            <Text style={[styles.lblSecondaryHeading, {paddingLeft: 10}]}>{growth.sampleID}</Text>
                            <Text style={[styles.lblSecondaryHeading, {paddingLeft: 10}]}>{growth.machine}</Text>
                            <Text style={[styles.lblSecondaryHeading, {paddingLeft: 10}]}>{growth.grower}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={[styles.growthRow, styles.addButton]}
                            onPress={() => props.navigation.navigate("Add Growth", {sampleID, machine})}>
                        <View style={{paddingLeft: 10}}>
                            <Entypo name="add-to-list"
                                    size={20}
                                    style={styles.firstRowItem}
                                    color="blue" />
                        </View>
                        <Text style={styles.lblSecondaryHeading}>Add new growth</Text>
                    </TouchableOpacity>
                </View>

                <View style={{paddingLeft: 10}}>
                    <Text  style={styles.lblPrimaryHeading}>Recipes from Sample {sampleID}:</Text>

                    {
                        state.loading ? (<ActivityIndicator size={24} />) :
                        state.recipes.map(({id, recipe}) => (
                            <Text key={id} style={[styles.lblColorized, styles.mono]}>{recipe}</Text>
                        ))
                    }
                </View>

            </View>
        </ScrollView>

    )
}

// StyleSheet
const LocalStyles = {
    growthList: {
        margin: 10,
        marginBottom: 30,
    },
    growthRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 4,
    },
    firstRowItem: {
        marginRight: 10,
        padding: 5,
        fontSize: 16,
        backgroundColor: "white",
        borderRadius: 5,
        color: "blue",
    },
    mono: {
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    },
}
