import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Platform, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../constants/API.js';
import { Entypo } from '@expo/vector-icons';
const fetch = require("node-fetch");

export default function SampleDetails(props) {
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
        <ScrollView style={styles.container}>
            <View>
                <View style={{paddingLeft: 10, paddingTop: 10}}>
                    <Text  style={styles.headerText}>Growths from Sample {sampleID}. Select a growth's ID to view individual growth details.</Text>
                </View>

                <View style={styles.growthList}>
                    {
                        state.loading ? (<ActivityIndicator size={24}/>) :
                        state.growths.map(growth => (
                            <View key={growth.id} style={styles.growthRow}>
                                <TouchableOpacity   style={{paddingLeft: 10}}
                                        onPress={() => props.navigation.navigate("Growth Details", {growth: growth})}>
                                    <Text style={styles.firstRowItem}>{growth.id}</Text>
                                </TouchableOpacity>
                                <Text style={styles.rowText}>{growth.sampleID}</Text>
                                <Text style={styles.rowText}>{growth.machine}</Text>
                                <Text style={styles.rowText}>{growth.grower}</Text>
                            </View>
                        ))
                    }
                    <TouchableOpacity style={[styles.growthRow, styles.addButton]}
                            onPress={() => props.navigation.navigate("Add Growth", {sampleID: sampleID})}>
                        <View style={{paddingLeft: 10}}>
                            <Entypo name="add-to-list"
                                    size={20}
                                    style={styles.firstRowItem}
                                    color="blue" />
                        </View>
                        <Text style={styles.rowText}>Add new growth</Text>
                    </TouchableOpacity>
                </View>

                <View style={{paddingLeft: 10}}>
                    <Text  style={styles.headerText}>Recipes from Sample {sampleID}:</Text>

                    {
                        state.loading ? (<ActivityIndicator size={24} />) :
                        state.recipes.map(({id, recipe}) => (
                            <Text key={id} style={[styles.rowText, styles.mono]}>{recipe}</Text>
                        ))
                    }
                </View>

            </View>
        </ScrollView>

    )
}

// StyleSheet
const styles = StyleSheet.create({
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 15,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
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
    rowText: {
        fontSize: 16,
        color: "black",
        paddingLeft: 10,
    },
    firstRowItem: {
        width: 40,
        fontSize: 16,
        color: 'blue',
    },
    mono: {
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    },
    addButton: {
        // borderColor: "#CCC",
        // borderWidth: 1,
        // borderRadius: 5,
        // width: "50%",
    },
});
