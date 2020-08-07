import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
const fetch = require("node-fetch");



export default function SampleDetails(props) {
    // The data for the sample itself is provided via navigation parameters.
    let sampleID = props.route.params.sampleID;
    let machine = props.route.params.system;
    const [growths, setGrowths] = useState([]);
    const [recipes, setRecipes] = useState([]);

    //get the list of growths associated with this sample ID
    useEffect(() => {
        let load = async () => {
            let response = []
            response = await fetch(`${BASE_URL}/machine/${machine}/growths?sampleID=${sampleID}`).then(r => r.json());
            setGrowths(response.results)
        }
        load();
    }, [sampleID]);

    //get the list of recipies associated with this sample ID
    useEffect(() => {
        let load = async () => {
            let response = []
            response = await fetch(`${BASE_URL}/machine/${machine}/recipe/${sampleID}`).then(r => r.json());
            setRecipes(response.recipes)
        }
        load();
    }, [sampleID]);
    console.log(sampleID)

    return (
        <ScrollView>
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


            <View style={{paddingLeft: 10}}>
                <Text  style={{fontSize: 16, fontWeight: '400', paddingBottom: 15}}>The following recipes are associated with Sample ID {sampleID}:</Text>

                <FlatList
                        style={styles.list}
                        data={recipes}
                        keyExtractor={item => item.id.toString()}
                        initialNumToRender={10}
                        renderItem={({item}) => (
                            <View style={styles.growthRow}>
                                <View>
                                    <Text style={styles.rowText}>{item.recipe}</Text>
                                </View>
                            </View>
                        )}/>

            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 50, marginTop: -15}}>
            <Button
                title="ADD A NEW GROWTH TO THE DATABASE"
                onPress={() => props.navigation.navigate("Add Growth", {sampleID: sampleID})}
            />
            </View>
        </View>
        </ScrollView>

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
        margin:10,
        marginBottom: 30,
        marginTop: -15,
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
        paddingLeft: 10,

    },
    filterControls: {
        backgroundColor: "red",
    }
});
