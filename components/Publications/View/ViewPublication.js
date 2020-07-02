// Displays a single maintenance record with all it's information, and fetches
//  the corresponding sources asynchronously.

// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");

// This function is to get the fetch the URL for getting information based on the sample ID

const GetSources = async sampleID => {
    let response = await fetch(`${BASE_URL}/publications/${sampleID}`);
    let parsed = await response.json();
    return parsed.sources;
}

export default function ViewPublication(props) {
    // The data for the record itself is provided via navigation parameters.
    // This is a variable that contains a single item that passed from ViewTab.js
    let publication = props.route.params.publication;

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

    // If record is undefined, the standard record render cannot be executed because
    //  it will encounter "cannot read property __ of undefined" errors. So we verify
    //  that the record exists first.
    // This check uses the fact that undefined, null, etc. are "falsy" values and
    //  equate to false when used as conditions.
    if(publication) return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.recordArea}>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>ID</Text>
                        <Text style={styles.fieldData}>{publication.id}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>jabref_eid</Text>
                        <Text style={styles.fieldData}>{publication.jabref_eid}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>typeID</Text>
                        <Text style={styles.fieldData}>{publication.typeID}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>citeKey</Text>
                        <Text style={styles.fieldData}>{publication.citeKey}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Author</Text>
                        <Text style={styles.fieldData}>{publication.author}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Title</Text>
                        <Text style={styles.fieldData}>{publication.title}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>Journal</Text>
                        <Text style={styles.fieldData}>{publication.journal}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>day</Text>
                        <Text style={styles.fieldData}>{publication.day}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>dayFiled</Text>
                        <Text style={styles.fieldData}>{publication.dayFiled}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>month</Text>
                        <Text style={styles.fieldData}>{publication.month}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>monthFiled</Text>
                        <Text style={styles.fieldData}>{publication.monthFiled}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>year</Text>
                        <Text style={styles.fieldData}>{publication.year}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>volume</Text>
                        <Text style={styles.fieldData}>{publication.volume}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>pages</Text>
                        <Text style={styles.fieldData}>{publication.pages}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>number</Text>
                        <Text style={styles.fieldData}>{publication.number}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>eid</Text>
                        <Text style={styles.fieldData}>{publication.eid}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>note</Text>
                        <Text style={styles.fieldData}>{publication.note}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>crossref</Text>
                        <Text style={styles.fieldData}>{publication.crossref}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>keywords</Text>
                        <Text style={styles.fieldData}>{publication.keywords}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>doi</Text>
                        <Text style={styles.fieldData}>{publication.doi}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>url</Text>
                        <Text style={styles.fieldData}>{publication.url}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>file</Text>
                        <Text style={styles.fieldData}>{publication.file}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>citeseeurl</Text>
                        <Text style={styles.fieldData}>{publication.citeseeurl}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>pdf</Text>
                        <Text style={styles.fieldData}>{publication.pdf}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>abstract</Text>
                        <Text style={styles.fieldData}>{publication.abstract}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>comment</Text>
                        <Text style={styles.fieldData}>{publication.comment}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>owner</Text>
                        <Text style={styles.fieldData}>{publication.owner}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>timestamp</Text>
                        <Text style={styles.fieldData}>{publication.timestamp}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>review</Text>
                        <Text style={styles.fieldData}>{publication.review}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>search</Text>
                        <Text style={styles.fieldData}>{publication.search}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>publisher</Text>
                        <Text style={styles.fieldData}>{publication.publisher}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>editor</Text>
                        <Text style={styles.fieldData}>{publication.editor}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>series</Text>
                        <Text style={styles.fieldData}>{publication.series}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>address</Text>
                        <Text style={styles.fieldData}>{publication.address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>edition</Text>
                        <Text style={styles.fieldData}>{publication.edition}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>howPublished</Text>
                        <Text style={styles.fieldData}>{publication.howPublished}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>lastChecked</Text>
                        <Text style={styles.fieldData}>{publication.lastChecked}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>bookTitle</Text>
                        <Text style={styles.fieldData}>{publication.bookTitle}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>organization</Text>
                        <Text style={styles.fieldData}>{publication.organization}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>language</Text>
                        <Text style={styles.fieldData}>{publication.language}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>chapter</Text>
                        <Text style={styles.fieldData}>{publication.chapter}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>type</Text>
                        <Text style={styles.fieldData}>{publication.type}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>school</Text>
                        <Text style={styles.fieldData}>{publication.school}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>nationality</Text>
                        <Text style={styles.fieldData}>{publication.nationality}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>assignee</Text>
                        <Text style={styles.fieldData}>{publication.assignee}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>institution</Text>
                        <Text style={styles.fieldData}>{publication.institution}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.fieldName}>revisor</Text>
                        <Text style={styles.fieldData}>{publication.revisor}</Text>
                    </View>

                </View>
                {
                    /*
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
                    */
                }
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
