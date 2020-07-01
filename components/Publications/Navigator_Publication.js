// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator,FlatLsit } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../constants/API';
import SelectSystem from '../lib/forms/SelectSystem';
import { Ionicons } from '@expo/vector-icons';




// Create the tab navigator which separates the Browse and Create sections.
const Tab = createMaterialTopTabNavigator();
/*
const GetAllPublications = async () => {
    let page = 0;
    let records = []
    let parsed = {records: []};

    do {
        let response = await fetch(`${BASE_URL}/publications?page=${page}`);
        parsed = await response.json();
        records = records.concat(parsed.records);
        page++;
    } while(parsed.records.length > 0)
    return records;
}
*/
const loadPublications = async update => {
    //waiting to load the information from the URL and transform to json format
    let parsed = await fetch(`${BASE_URL}/publications?page=0`).then(r => r.json());
    //Update the new information to the current state
    update(parsed.publications);
}


function ViewTab(){
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        //Calling the subroutine
        loadPublications(setPublications)
    }, []);

    return (

        <View style = {styles.tabContainer}>
            <ScrollView>

                <View style = {styles.top}>
                    <View>
                        <Text style = {styles.title}>
                            Publication Title:
                        </Text>
                    </View>

                    <View>
                        <Text style = {styles.author}>
                            Author:
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.id}>
                            Number
                        </Text>
                    </View>

                </View>


                <FlatList
                style = {styles.list}
                data = {publications}
                renderItem = {({item}) => (
                    <View   style={styles.recordRow}>
                        <View>
                            <TouchableOpacity   style={styles.openRecordButton}>
                                <Ionicons name="md-open" size={16} color={'green'} style={{position: "relative", left: 3, top: 1}}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: 500}}>
                            <Text style={styles.rowText}>{item.title}</Text>
                        </View>
                        <View style={{width: 600}}>
                            <Text style={styles.rowText}>{item.author}</Text>
                        </View>
                        <View>
                            <Text style={styles.rowText}>{item.id}</Text>
                        </View>
                    </View>


                )}/>
                {
                    /*
                    <Text>
                        {
                            //Since the return data from URL is in form of array, we use map to output it out
                            //Pub is all objects that contain different fields such as ID, author, and etc
                            //publications is now the array
                            publications.map(pub => (
                                <TouchableOpacity style = {styles.publicTab}>
                                    <Text> Title: {pub.title} by {pub.author} </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </Text>

                    */
                }

            </ScrollView>
        </View>
    )
}

function InsertTab(){
    return (
        <View style = {styles.tabContainer}>
            <Text>
                This is an insert tab
            </Text>
        </View>
    )
}
export default function Navigator_Publication(props) {



    return (
        <Tab.Navigator currentBrowser="View publications">
            <Tab.Screen name="View publications" component={ViewTab}/>
            <Tab.Screen name="Insert new" component={InsertTab}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    title: {
        width: 500,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",

    },
    author: {
        width: 600,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",
    },
    id: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: 'blue',
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
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        margin: 4,
    },
    openRecordButton: {
        width: 18,
        margin: 4,
        borderRadius: 5,
    },
    rowText: {
        fontSize: 16,
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    publicTab: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});
