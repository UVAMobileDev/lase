// Filter serves two purposes: display the maintenance records in a readable,
//  abbreviated list form; allow the user to select and view a second record.

// Imports
import React, { useState, useEffect, useReducer } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Ionicons } from '@expo/vector-icons';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';
import SelectDate from '../../lib/forms/SelectDate';
import SortingButton from '../../lib/sort/SortingButton';

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
    return record => {
        for(var key in filter) {
            switch(key) {
                case "minDate":
                if(record.date < filter.minDate) return false;
                break;

                case "maxDate":
                if(record.date > filter.maxDate) return false;
                break;

                default:
                if( filter[key] !== ""
                    && record[key] !== filter[key]) return false;
            }
        }
        return true;
    };
};

// The strucutre of this class, excluding the tools to filter, is more or less
//  technfilterically identical to the portion of the Overview subpage in the Landing
//  folder which deals with retrieving the list of recent publications.
export default function Filter(props) {
    const [records, setRecords] = useState({loaded: false, items: []});
    const [filter, dispatchFilter] = useReducer(FilterReducer, {});

    useEffect(() => {
        let load = async () => {
            let allRecords = await GetAllRecords();
            setRecords({loaded: true, items: allRecords});
        }
        load();
    }, [0]);

    const SortBy = (key, stage) => {
        let invert = stage === "reverse";

        let presort = records.items.concat();
        presort.sort((a, b) => {
            if(a[key] < b[key]) return invert ? 1 : -1;
            if(a[key] > b[key]) return invert ? -1 : 1;
            return 0;
        });

        setRecords({
            loaded: records.loaded,
            items: presort,
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.filterControls}>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>System</Text>
                    <View style={styles.input}>
                        <SelectSystem placeholder={{label: "Select System", value: ""}} update={sys => dispatchFilter({type: "set", payload: {key: "system", value: sys}})}/>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Recorder</Text>
                    <View style={styles.input}>
                        <SelectMember placeholder={{label: "Select Recorder", value: ""}} update={rec => dispatchFilter({type: "set", payload: {key: "recorder", value: rec}})}/>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>P1</Text>
                    <View style={styles.input}>
                        <SelectMember placeholder={{label: "Select P1", value: ""}} update={p1 => dispatchFilter({type: "set", payload: {key: "p1", value: p1}})}/>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>P2</Text>
                    <View style={styles.input}>
                        <SelectMember placeholder={{label: "Select P2", value: ""}} update={p2 => dispatchFilter({type: "set", payload: {key: "p2", value: p2}})}/>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Newer than</Text>
                    <SelectDate minYear={2017}
                        update={date => dispatchFilter({type: "set", payload: {key: "minDate", value: date}})}/>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Older than</Text>
                    <SelectDate minYear={2017}
                        initYear={new Date().getFullYear()}
                        initMonth={new Date().getMonth() + 1}
                        initDay={new Date().getDate()}
                        update={date => dispatchFilter({type: "set", payload: {key: "maxDate", value: date}})}/>
                </View>
            </View>

            <View style={styles.sortControls}>
                <View style={{width: 95}}>
                    <Text style={{fontSize: 15}}>Sort Records</Text>
                </View>
                <View style={{width: 75}}>
                    <SortingButton label="Date" trigger={stage => SortBy("date", stage)}/>
                </View>
            </View>

            <View style={styles.listContainer}>
                {records.loaded ? (
                    <FlatList
                        data={records.items.filter(FilterFx(filter))}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.recordRow}
                                    onPress={() => props.navigation.navigate("Record", {record: item})}>
                                <Text style={[styles.rowText, {width: 60}]}>{item.system}</Text>
                                <Text style={[styles.rowText, {width: 75}]}>{item.date}</Text>
                                <View style={{flex: 1}}>
                                    <Text>{item.summary}</Text>
                                </View>
                            </TouchableOpacity>
                        )}/>
                ) : (
                    <View style={{marginTop: 50}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )}
            </View>
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
    recordRow: {
        flexDirection: "row",
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 7,
        borderWidth: 1,
        borderColor: "#44F",
        borderRadius: 5,
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        borderBottomWidth: 2,
        borderColor: "black",
    },
    inputLabel: {
        fontSize: 18,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        width: 350,
        margin: 2,
    },
    input: {
        flex: 1,
        marginLeft: 5,
        padding: 2,
    },
    sortControls: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        height: 60,
        borderBottomWidth: 2,
        borderColor: "black",
    },
});
