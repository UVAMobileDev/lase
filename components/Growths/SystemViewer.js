import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../constants/API.js';
import GrowthContext from './GrowthContext';

const QueryString = filter => `${Object.keys(filter).reduce((acc, cur) => `${acc}&${cur}=${filter[cur]}`, "")}`;
const fetch = require('node-fetch');

export default function SystemViewer(props) {
    // Gets the name of the machine we're watching through props.route.params.system
    // Current filter state is in props.route.params.filter

    const context = useContext(GrowthContext);
    const [growths, setGrowths] = useState({loaded: false, contents: []});


    useEffect(() => {
        let load = async () => {
            let response = await fetch(`${BASE_URL}/machine/${context.systems[props.route.params.sysIndex]}/growths?${QueryString(context.filter)}`).then(r => r.json());
            setGrowths({loaded: true, contents: response.results});
        }
        load();
    }, [context.filter]);

    return (
        <View style={styles.container}>
            <Text style={{paddingLeft: 20, paddingTop: 20, fontSize: 16}}>Select a growth's ID to view associated growths and recipes:</Text>
            {
                growths.loaded ? (
                    <View style={styles.listContainer}>
                        <FlatList
                            style={styles.list}
                            data={growths.contents}
                            keyExtractor={item => item.id.toString()}
                            initialNumToRender={10}
                            renderItem={({item}) => (
                                <View style={styles.growthRow}>
                                    <View style={{width: 30, marginRight:20}}>
                                        <TouchableOpacity   style={styles.openGrowthButton}
                                                        onPress={() => props.navigation.navigate("Sample Details", {sampleID: item.sampleID, system: context.systems[props.route.params.sysIndex]})}>
                                            <Text style={{width: 40, fontSize: 16, color: 'blue'}}>{item.id}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.rowText, {width: 95}]}>{item.sampleID}</Text>
                                    <Text style={[styles.rowText, {width: 150}]}>{item.grower}</Text>
                                    <Text style={[styles.rowText, {width: 100}]}>{item.substrate}</Text>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.rowText}>{item.Description}</Text>
                                    </View>
                                </View>
                            )}/>
                    </View>
                ) : (
                    <View style={{marginTop: 50}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )
            }
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
        paddingLeft: 30,
    },
    list: {
        margin: 10,
        marginBottom: 30,
    },
    growthRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 9,
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
    },
});
