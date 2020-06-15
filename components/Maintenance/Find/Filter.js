// Filter serves two purposes: display the maintenance records in a readable,
//  abbreviated list form; allow the user to select and view a second record.

// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Jet, Platinum, Gainsboro, InternationalOrange, EgyptianBlue } from '../../../constants/Colors.js';
import { Ionicons } from '@expo/vector-icons';

// Helper method which retrieves all the maintenance records from the API. It's not
//  just as straightforward as a single API call, though, since the results are paginated
//  in sets of 100 records.
const GetAllRecords = async () => {
    let page = 0;
    let records = []
    let parsed = {records: []};

    do {
        let response = await fetch(`${BASE_URL}/maintenance?page=${page}`);
        parsed = await response.json();
        records = records.concat(parsed.records);
        page++;
    } while(parsed.records.length > 0)
    return records;
}

// The strucutre of this class, excluding the tools to filter, is more or less
//  technically identical to the portion of the Overview subpage in the Landing
//  folder which deals with retrieving the list of recent publications.
export default function Filter(props) {
    let [records, setRecords] = useState({loaded: false, items: []});

    useEffect(() => {
        let load = async () => {
            let allRecords = await GetAllRecords();
            setRecords({loaded: true, items: allRecords});
        }
        load();
    }, [0]);

    return (
        <View style={styles.container}>
            {
                records.loaded ? (
                    <View style={styles.listContainer}>
                        <ScrollView>
                            {/* FlatLists are easily one of the most power components in React. Learning how to make good use of them is a must! */}
                            <FlatList   style={styles.list}
                                        data={records.items}
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={({item}) => (
                                            <View   style={styles.recordRow}>
                                                <View>
                                                    <TouchableOpacity   style={styles.openRecordButton}
                                                                        onPress={() => props.navigation.navigate("Record", {record: item})}>
                                                        <Ionicons name="md-open" size={16} color={EgyptianBlue} style={{position: "relative", left: 3, top: 1}}/>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{width: 60}}>
                                                    <Text style={styles.rowText}>{item.system}</Text>
                                                </View>
                                                <View style={{width: 75}}>
                                                    <Text style={styles.rowText}>{item.date}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.rowText}>{item.summary}</Text>
                                                </View>
                                            </View>
                                        )}/>
                        </ScrollView>
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
        backgroundColor: Jet,
    },
    listContainer: {
        flex: 1,
    },
    list: {
        margin: 10,
        marginBottom: 30,
    },
    recordRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 4,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderColor: InternationalOrange,
    },
    openRecordButton: {
        width: 18,
        margin: 4,
        borderRadius: 5,
        backgroundColor: Platinum,
    },
    rowText: {
        fontSize: 16,
        color: Gainsboro,
    }
});
