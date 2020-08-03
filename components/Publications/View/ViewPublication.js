// Displays a single maintenance record with all it's information, and fetches
//  the corresponding sources asynchronously.

// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");
import Publication from '../../Publications/Publication.js';
import {Table,Row,Rows} from 'react-native-table-component';

//import {SelectableText} from 'react-native-selectable-text';
// This function is to get the fetch the URL for getting information based on the sample ID

const GetSources = async sampleID => {
    let response = await fetch(`${BASE_URL}/publications/${sampleID}`);
    let parsed = await response.json();
    return parsed.sources;
}

// Helper method to check if a string is null. If it is null, return false. Return true otherwise
function checkIfNull(theString) {
    if (theString !== null) {
        return true;
    } else {
        return false;
    }
}


export default function ViewPublication(props) {
    // The data for the record itself is provided via navigation parameters.
    // This is a variable that contains a single item that passed from ViewTab.js
    let publication = props.route.params.publication;

    let top_title = ['Field name: ', 'Information: '];
    let detail = [];



    // Sources are fetched asynchronously and stored using a hook.
    let [sources, setSources] = useState({loaded: false, items: []});

    // This effect functions similarly to many of the other hooks in this project,
    //  aside from the fact that it also sets the title of the navigation tab.
    // The title is set here to reduce unnecessary calls to setOptions when the
    //  component is rerendered but the record id (and therefore title) is the same.
    useEffect(() => {
        //props.navigation.setOptions({title: `${publication.system} ${publication.date}`});
        let get = async () => {
            // Pass the publication id to identify source and get its data
            let sources = await GetSources(publication.id);
            setSources({
                loaded: true,
                items: sources,
            });
        }
        get();
    }, [publication.id]);

    if (publication) {
        let key_arr = Object.keys(publication);
        for (let key of key_arr) {
            if (publication[key] !== null) {
                detail.push([key,(publication[key])]);
            }
        }
        detail.push(['Citation',(<Publication key = {publication.id} data = {publication}/>)]); //added citations of publication to the array to render
        return (
            <View style = {styles.container}>
                    <ScrollView>
                        <View style = {styles.tableContainer}>
                            <Table borderStyle = {{borderWidth: 0.5, borderColor: '#808080'}}>
                                <Row data = {top_title} style = {styles.top_table} textStyle = {styles.text_table_title}/>
                                <Rows data = {detail} textStyle = {styles.text_table}/>
                            </Table>
                        </View>
                    </ScrollView>
                </View>
        )
    }



    // Backup return which kicks in if, for some reason, a Record component was
    //  asked to be rendered but was not given a record to load.
    return (
        <View style={styles.container}>
            <Text>Something went wrong. No publication was provided.</Text>
        </View>
    )
}

// StyleSheet
const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
    },
    top_table: {
            height: 40,
            backgroundColor: '#a9a9a9',
    },
    text_table_title: {
        margin: 6,
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Cochin',
        color: InternationalOrange,
    },
    text_table: {
        margin: 6,
        fontSize: 16,
        fontFamily: 'Kailasa',
    },
    container: {
        flex: 1,
        backgroundColor: Platinum,
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
        width: 100,
        marginRight: 15,
        padding: 5,
        borderRightColor: '#191970',
        borderRightWidth: 2,
        fontWeight: "bold",
        color: 'black',
        fontFamily: 'Kailasa',

    },
    fieldData: {
        color: Gainsboro,
        padding: 5,
        color: 'black',

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
    },
    citation: {
        flexDirection: "row",
    }
});
