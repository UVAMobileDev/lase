/*this tab allows users to sort through existing growths based on the following criteria:
    Machine
    Researcher who grew it
    Substrate

Clicking on a specific growth in the browser opens it's SAMPLE details page

Object.keys.filter(key => filter[key] !== "").reduce

filter reducer:
switch(action.type) {
    case "set":
        return {...state, [action.payload.key]: action.payload.value}
    defualt:
        return {...state, }
}

dispatchfilter(type: 'set,', payload: {key: 'system', value: sys})

run yarn before git pull
    */
import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native';
const fetch = require('node-fetch');
import { Ionicons } from '@expo/vector-icons';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';
import { BASE_URL } from '../../../constants/API.js';

/*Loads and displays all growths in the database*/
const loadAllGrowths = async (running_list, page, update) => {

    let parsedEcho = await fetch(`${BASE_URL}/machine/Echo/growths?page=${page}`).then(r => r.json());
    let parsedBravo = await fetch(`${BASE_URL}/machine/Bravo/growths?page=${page}`).then(r => r.json());

    if(parsedEcho.results.length === 0) update({loaded: true, contents: running_list});
    else loadAllGrowths(running_list.concat(parsedEcho.results), page + 1, update);

    if(parsedBravo.results.length === 0) update({loaded: true, contents: running_list});
    else loadAllGrowths(running_list.concat(parsedBravo.results), page + 1, update);

}

const FilterReducer = (state, action) => {

    switch(action.type) {
        case "set":
            return {...state, [action.payload.key]: action.payload.value}

        default:
            return state;
    }
}

// Function used to filter the displayed items based on the applied constraints
const FilterFx = filter => {
    return growth => {
        for(var key in filter) {
            if( filter[key] !== ""
                && record[key] !== filter[key]) return false;
            }
        }
        return true;
    }

//let querystrings = Object.keys(filter).reduce((acc, cur) => `${acc}&${cur}=${filter[cur]}`, "");
// This string is "grower=Rasha El-Jaroudi&substrate=As"let url_to_fetch = `${BASE_URL}/growths/Echo?${querystrings}`;

export default function GrowthBrowser(props) {

    const [growths, setGrowths] = useState([{loaded: false, contents: []}]);
    const [filter, dispatchFilter] = useReducer(FilterReducer, {});


    useEffect(() => {
        loadAllGrowths([], 0, setGrowths)
    }, []);

    // set it up so that if you scroll to the bottom of the flatlist they load more

    /*filters results based on input criteria*/
    // useEffect(() => {
    //     setFilter({
    //         system,
    //         recorder,
    //     })
    // }, [system, recorder]);

    return (
        <View style={styles.container}>

        {
            growths.loaded ? (
                <View style={styles.listContainer}>
                    {/*menu options for filtering through growths*/}
                    <View style={styles.filterControls}>
                        <Text>Filter growths:</Text>
                        <SelectSystem placeholder={{label: "Select System", value: ""}} update={sys => dispatchFilter({type: "set", payload: {key: "system", value: sys}})}/>
                        <SelectMember placeholder={{label: "Select Grower", value: ""}} update={rec => dispatchFilter({type: "set", payload: {key: "recorder", value: rec}})}/>
                    </View>

                    {/*displays a flatlist of all the growths */}
                    <ScrollView>
                        <FlatList
                            style={styles.list}
                            data={growths.contents}
                            keyExtractor={item => item.id.toString()}
                            initialNumToRender={10}
                            renderItem={({item}) => (
                                <View style={styles.recordRow}>
                                    <View>
                                        <TouchableOpacity   style={styles.openRecordButton}
                                                            onPress={() => props.navigation.navigate("Sample Details", {sample: item})}>
                                            <Ionicons name="md-open" size={16} color="blue" style={{position: "relative", left: 3, top: 1}}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: 75}}>
                                        <Text style={styles.rowText}>{item.sampleID}</Text>
                                    </View>
                                    <View style={{width: 75}}>
                                        <Text style={styles.rowText}>{item.id}</Text>
                                    </View>
                                    <View style={{width: 75}}>
                                        <Text style={styles.rowText}>{item.machine}</Text>
                                    </View>
                                    <View style={{width: 150}}>
                                        <Text style={styles.rowText}>{item.grower}</Text>
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
        backgroundColor: "white",
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
        borderColor: "black",
    },
    openRecordButton: {
        width: 18,
        margin: 4,
        borderRadius: 5,
        backgroundColor: "white",
    },
    rowText: {
        fontSize: 16,
        color: "black",

    },
    filterControls: {
        backgroundColor: "red",
    }
});
