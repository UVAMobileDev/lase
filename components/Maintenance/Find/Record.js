// Displays a single maintenance record with all it's information, and fetches
//  the corresponding sources asynchronously.

// Imports
import React, { useContext, useReducer, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
const fetch = require("node-fetch");
import { FontAwesome } from '@expo/vector-icons';
import KeyContext from '../../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../../constants/globalStyle';

// Helper method which fetches the list of sources associated with a given
//  record id.
const GetSources = async recordID => {
    let response = await fetch(`${BASE_URL}/maintenance/${recordID}`);
    let parsed = await response.json();
    return parsed.sources;
}

export default function Record(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

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
        <View style={styles.componentBackground}>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                    }}
                    >
                    <View style={styles.infoRow}>
                        <Text style={[styles.bold, styles.lblTertiaryHeading, styles.fieldName, {borderRightColor: dark ? Colors.contrastDark : Colors.contrast}]}>Summary</Text>
                        <Text style={[styles.lblColorized, {padding: 5}]}>{record.summary}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.bold, styles.lblTertiaryHeading, styles.fieldName, {borderRightColor: dark ? Colors.contrastDark : Colors.contrast}]}>P1</Text>
                        <Text style={[styles.lblColorized, {padding: 5}]}>{record.p1}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.bold, styles.lblTertiaryHeading, styles.fieldName, {borderRightColor: dark ? Colors.contrastDark : Colors.contrast}]}>P2</Text>
                        <Text style={[styles.lblColorized, {padding: 5}]}>{record.p2}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.bold, styles.lblTertiaryHeading, styles.fieldName, {borderRightColor: dark ? Colors.contrastDark : Colors.contrast}]}>Issues</Text>
                        <Text style={[styles.lblColorized, {padding: 5}]}>{record.issues}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.bold, styles.lblTertiaryHeading, styles.fieldName, {borderRightColor: dark ? Colors.contrastDark : Colors.contrast}]}>Future</Text>
                        <Text style={[styles.lblColorized, {padding: 5}]}>{record.future}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.bold, styles.lblTertiaryHeading, styles.fieldName, {borderRightColor: dark ? Colors.contrastDark : Colors.contrast}]}>Recorder</Text>
                        <Text style={[styles.lblColorized, {padding: 5}]}>{record.recorder}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.bold, styles.lblTertiaryHeading, styles.fieldName, {borderRightColor: dark ? Colors.contrastDark : Colors.contrast}]}>Detailed Notes</Text>
                        <Text style={[styles.lblColorized, {padding: 5}]}>{record.notes}</Text>
                    </View>
                </View>
                {
                    // Render an activity indicator (loading icon) until the sources
                    //  have been loaded. Then, render the sources appropriately.
                    sources.loaded ? sources.items.length > 0 ? (
                        <View>
                            <Text style={[styles.lblSecondaryHeading, styles.bold]}>Sources from this record</Text>
                            <View style={styles.horiztonalItemWrapper}>
                                {sources.items.map(item => (
                                    <View style={[styles.sourceContainer, {borderColor: dark ? Colors.contrastDark : Colors.contrast}]} key={`${item.amount}${item.source}`}>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={[styles.sourceLabel, styles.lblColorized, {borderColor: dark ? Colors.contrastDark : Colors.contrast}]}>Source</Text>
                                            <Text style={styles.lblColorized}>{item.source}</Text>
                                        </View>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={[styles.sourceLabel, styles.lblColorized, {borderColor: dark ? Colors.contrastDark : Colors.contrast}]}>Amount</Text>
                                            <Text style={styles.lblColorized}>{item.amount}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <View></View>
                    ) : (
                        <ActivityIndicator size="large" color="#0000ff"/>
                    )
                }
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Utilities", {
                        screen: "Delete",
                        params: {
                            toDelete: {
                                type: "MaintenanceRecord",
                                id: record.id,
                            }
                        }
                    })}
                    >
                    <View style={styles.horiztonalItemWrapper}>
                        <FontAwesome name="trash-o" size={24} color={dark ? Colors.contrastDark : Colors.contrast} />
                        <Text style={styles.lblColorized}>Delete Record</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

    // Backup return which kicks in if, for some reason, a Record component was
    //  asked to be rendered but was not given a record to load.
    return (
        <View style={styles.componentBackground}>
            <Text style={styles.lblPrimaryHeading}>Something went wrong. No maintenance record was provided.</Text>
        </View>
    )
}

// StyleSheet
const LocalStyles = {
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    infoRow: {
        margin: 2,
        padding: 2,
        flexDirection: "row",
    },
    fieldName: {
        minHeight: 25,
        width: 85,
        marginRight: 15,
        padding: 5,
        borderRightWidth: 2,
    },
    sourceContainer: {
        margin: 5,
        padding: 10,
        minWidth: 150,
        flexDirection: "column",
        borderWidth: 1,
        borderRadius: 5
    },
    sourceLabel: {
        width: "60%",
        borderRightWidth: 1,
        marginRight: 5,
    },
}
