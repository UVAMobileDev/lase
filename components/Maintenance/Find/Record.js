// Displays a single maintenance record with all it's information, and fetches
//  the corresponding sources asynchronously.

// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");
import { FontAwesome } from '@expo/vector-icons';

// Helper method which fetches the list of sources associated with a given
//  record id.
const GetSources = async recordID => {
    let response = await fetch(`${BASE_URL}/maintenance/${recordID}`);
    let parsed = await response.json();
    return parsed.sources;
}

export default function Record(props) {
    // The data for the record itself is provided via navigation parameters.
    let record = props.route.params.record;

    // Sources are fetched asynchronously and stored using a hook.
    let [sources, setSources] = useState({loaded: false, items: []});

    // This effect functions similarly to many of the other hooks in this project,
    //  aside from the fact that it also sets the title of the navigation tab.
    // The title is set here to reduce unnecessary calls to setOptions when the
    //  component is rerendered but the record id (and therefore title) is the same.
    useEffect(() => {
        props.navigation.setOptions({title: `${record.system} ${record.date}`});
        let get = async () => {
            let sources = await GetSources(record.id);
            setSources({
                loaded: true,
                items: sources,
            });
        }
        get();
    }, [record.id]);

    // If record is undefined, the standard record render cannot be executed because
    //  it will encounter "cannot read property __ of undefined" errors. So we verify
    //  that the record exists first.
    // This check uses the fact that undefined, null, etc. are "falsy" values and
    //  equate to false when used as conditions.
    if(record) return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.recordArea}>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Summary</Text>
                        <Text style={styles.fieldData}>{record.summary}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>P1</Text>
                        <Text style={styles.fieldData}>{record.p1}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>P2</Text>
                        <Text style={styles.fieldData}>{record.p2}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Issues</Text>
                        <Text style={styles.fieldData}>{record.issues}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Future</Text>
                        <Text style={styles.fieldData}>{record.future}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Recorder</Text>
                        <Text style={styles.fieldData}>{record.recorder}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Detailed Notes</Text>
                        <Text style={styles.fieldData}>{record.notes}</Text>
                    </View>
                </View>
                {
                    // Render an activity indicator (loading icon) until the sources
                    //  have been loaded. Then, render the sources appropriately.
                    sources.loaded ? (
                        <View>
                            {
                                // We wrap this with the view tag (opened 2 lines
                                //  above this comment) because React requires some
                                //  help understanding when ternaries are put in
                                //  close proximity to JSX elements with Javascript
                                //  used immediately within them...
                                sources.items.length > 0 ? (
                                    <View>
                                        <Text style={styles.sourcesHeader}>Sources from this record</Text>
                                        <View style={styles.sourcesWrapper}>
                                            {
                                                sources.items.map(item => (
                                                    <View style={styles.sourceContainer} key={`${item.amount}${item.source}`}>
                                                        <View style={styles.sourceRow}>
                                                            <Text style={styles.sourceLabel}>Source</Text>
                                                            <Text style={styles.sourceAmount}>{item.source}</Text>
                                                        </View>
                                                        <View style={styles.sourceRow}>
                                                            <Text style={styles.sourceLabel}>Amount</Text>
                                                            <Text style={styles.sourceAmount}>{item.amount}</Text>
                                                        </View>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    </View>
                                ) : (
                                    <View></View>
                                )
                            }
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color="#0000ff"/>
                    )
                }
                <TouchableOpacity onPress={() => props.navigation.navigate("Utilities", {
                            screen: "Delete",
                            params: {
                                toDelete: {
                                    type: "MaintenanceRecord",
                                    id: record.id,
                                }
                            }
                        })
                        }>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <FontAwesome name="trash-o" size={24} color="black" />
                        <Text>Delete Record</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

    // Backup return which kicks in if, for some reason, a Record component was
    //  asked to be rendered but was not given a record to load.
    return (
        <View style={styles.container}>
            <Text>Something went wrong. No maintenance record was provided.</Text>
        </View>
    )
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Jet,
        padding: 5,
        flexDirection: "column",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    recordArea: {
        flex:  1,
        flexDirection: "column",
    },
    infoRow: {
        margin: 2,
        padding: 2,
        flexDirection: "row",
    },
    fieldName: {
        color: Gainsboro,
        minHeight: 25,
        width: 85,
        marginRight: 15,
        padding: 5,
        borderRightColor: InternationalOrange,
        borderRightWidth: 2,
    },
    fieldData: {
        color: Gainsboro,
        padding: 5,
    },
    sourcesHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        color: Gainsboro,
    },
    sourcesWrapper: {
        flex: 1,
        flexDirection: "row"
    },
    sourceContainer: {
        margin: 5,
        padding: 10,
        minWidth: 150,
        flexDirection: "column",
        borderColor: Platinum,
        borderWidth: 1,
        borderRadius: 5
    },
    sourceRow: {
        flexDirection: "row"
    },
    sourceLabel: {
        width: "60%",
        borderRightColor: InternationalOrange,
        borderRightWidth: 1,
        marginRight: 5,
        color: Gainsboro,
    },
    sourceAmount: {
        color: Gainsboro,
    }
});
