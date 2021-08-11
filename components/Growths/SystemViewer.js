import React, { useState, useReducer, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../constants/API.js';
import GrowthContext from './GrowthContext';

import KeyContext from '../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';

const QueryString = filter => `${Object.keys(filter).reduce((acc, cur) => `${acc}&${cur}=${filter[cur]}`, "")}`;
const fetch = require('node-fetch');

export default function SystemViewer(props) {
    // Gets the name of the machine we're watching through props.route.params.system
    // Current filter state is in props.route.params.filter
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const context = useContext(GrowthContext);
    const [growths, setGrowths] = useState({loaded: false, contents: [], page: 0, more: true});

    // const nextPage = () => growths.more ? setGrowths(growths
    //     {key: "page", value: "increment"}
    // ]) : null;

    useEffect(() => {
        let load = async () => {
            let response = await fetch(`${BASE_URL}/machine/${context.systems[props.route.params.sysIndex]}/growths?${QueryString(context.filter)}`).then(r => r.json());
            setGrowths({loaded: true, contents: response.results});
        }
        load();
    }, [context.filter]);

    return (
        <View style={styles.componentBackground}>
            <Text style={styles.lblSecondaryHeading}>Select a growth's ID to view associated growths and recipes:</Text>
            {growths.loaded && growths.contents.length > 0 ? (
                <View style={styles.listContainer}>
                    <FlatList
                        style={styles.list}
                        data={growths.contents}
                        keyExtractor={item => item.id.toString()}
                        initialNumToRender={10}
                        // onEndReached={nextPage}
                        // onEndReachedThreshold={0.3}
                        renderItem={({item}) => (
                            <View style={styles.growthRow}>
                                <View style={{width: 80, marginRight:10}}>
                                    <TouchableOpacity style={styles.openGrowthButton}
                                        onPress={() => props.navigation.navigate("Sample Details", {sampleID: item.sampleID, system: context.systems[props.route.params.sysIndex]})}>
                                        <Text style={{width: 80, fontSize: 16, color: 'blue'}}>{item.sampleID}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.lblSecondaryHeading, {width: 150}]}>{item.grower}</Text>
                                <Text style={[styles.lblSecondaryHeading, {width: 100}]}>{item.substrate}</Text>
                                <View style={{flex: 1}}>
                                    <Text style={[styles.lblColorized, styles.rowText]}>{item.Description}</Text>
                                </View>
                            </View>
                        )}/>
                </View>
            ) : growths.loaded ? (
                <View style={{margin: 50}}>
                    <Text style={{fontSize: 16}}>No matching growths</Text>
                </View>
            ) : (
                <View style={{marginTop: 50}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )}
        </View>
    )
}


// StyleSheet
const LocalStyles = {
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
        padding: 9,
        margin: 4,
    },
    openGrowthButton: {
        padding: 4,
        margin: 4,
        borderRadius: 5,
        backgroundColor: "white",
    },
    rowText: {
        fontSize: 16,
    },
}
