// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect, useReducer } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, TextInput, Image} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import { Ionicons, Entypo, Feather, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { Jet, InternationalOrange, Platinum, Gainsboro, EgyptianBlue, SpaceCadet, PurpleNavy } from '../../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import SelectType from '../../lib/forms/SelectType';

const FilterReducer = (state, action) => {
    switch(action.type) {
        case "set":
            return {...state, [action.payload.key]: action.payload.value};
        default:
            return state;
    }
}

const PublicationReducer = (state, actions) => {
    let nextState = Object.assign({}, state);
    let loaded = true;
    actions.forEach(({key, value}) => {
        switch(key) {
            case "items":
                if(value === "empty") nextState.items = [];
                else nextState.items = state.items.concat(value);
                break;

            case "page":
                loaded = false;
                if(value === "increment") nextState.page++;
                else if(value === "reset") nextState.page = 0;
                break;

            default:
                nextState[key] = value;
        }
    });
    nextState.loaded = loaded;
    return nextState;
}

const ICONS = {
    default: (<Ionicons name="md-list-box" size={24} color={'#F44'}/>),
    1: (<Entypo name="news" size={24} color="#44F" />),
    2: (<Feather name="book" size={24} color="#44F" />),
    3: (<SimpleLineIcons name="notebook" size={24} color="#44F" />),
    4: (<MaterialIcons name="group" size={24} color="#44F" />),
}

// A single line of code to handel query string and return URL to fetch based on the user's request
const QueryString = filter => `${BASE_URL}/publications?${Object.keys(filter).filter(key => filter[key] !== "").filter(key => filter[key] > 0).reduce((acc, cur) => `${acc}&${cur}=${filter[cur]}`, "")}`;


export default function ViewTab(props){
    const [publications, dispatchPublications] = useReducer(PublicationReducer, {
        loaded: false,
        items: [],
        page: 0,
        more: true,
    });

    // Forces a publications reload if modified
    const [force, incForce] = useReducer(state => state + 1, 0);

    // To filter publications based on users' choice
    const [filter,dispatchFilter] = useReducer(FilterReducer, {});

    const [selected, dispatchSel] = useReducer(({all, sel}, {action, id}) => {
        let newset = sel;
        switch(action) {
            case "add":
                sel[id] = true;
                break;

            case "remove":
                delete sel[id];
                all = false;
                break;

            case "all":
                id.reduce((_, i) => sel[i] = true, undefined);
                return {all: true, sel}

            case "notall":
                return {all: false, sel}

            case "empty":
                return {all: false, }
        }
        return {all, sel};
    }, {all: false, sel: {}});

    // Reset load data when the filter changes
    useEffect(() => {
        // If we're on the first page and not all have been loaded, we need to force a reload.
        if(publications.page === 0 && publications.more) incForce();

        dispatchSel({action: "notall"});

        dispatchPublications([
            {key: "items", value: "empty"},
            {key: "page", value: "reset"},
            {key: "more", value: true},
        ]);
    }, [filter]);

    // Load more publications when the page is advanced
    useEffect(() => {
        if (!force || !publications.more) return; // don't do anything, we are done loading

        let loadFilter = async () => {
            let response = await fetch(`${QueryString(filter)}&page=${publications.page}`).then(r => r.json());

            // console.log(response.publications.length);
            if (response.publications && response.publications.length > 0) {
                dispatchSel({action: "notall"});
                dispatchPublications([
                    {key: "items", value: response.publications},
                ]);
            } else dispatchPublications([
                {key: "more", value: false}
            ]);
        }
        loadFilter();
    }, [publications.page, publications.more, force]);

    const nextPage = () => publications.more ? dispatchPublications([
        {key: "page", value: "increment"}
    ]) : null;

    const loadAllMatches = async () => {
        if(!publications.more) return;
        let pg = publications.page;
        let fetched = [];

        let response = null;
        do {
            response = await fetch(`${QueryString(filter)}&page=${publications.page}`).then(r => r.json());
            pg++;
        } while(response.publications.length);


    }

    return (
        <View style={styles.container}>
            <Text style={styles.filterTitle}>Filter Publication Results</Text>
            <View style={styles.filterControls}>
                {/* This is for the scroll-menu for choosing type to public */}
                <View style={styles.filterGroup}>
                    <Text style={styles.inputLabel}>Type</Text>
                    <View style={{flex: 1}}>
                        <SelectType
                            placeholder={{label: "Select type", value: 0}}
                            update={({id}) => dispatchFilter({type: "set", payload: {key: "entry_types_id", value: id}})}/>
                    </View>
                </View>

                <View style={styles.filterGroup}>
                    <Text style={styles.inputLabel}>Year</Text>
                    <View style={{flex: 1}}>
                        <RNPickerSelect
                            InputAccessoryView={() => null}
                            placeholder={{label: "Select Year", value: ""}}
                            onValueChange = {value => dispatchFilter({type: "set", payload: {key: "year", value}})}
                            items={[...Array(new Date().getFullYear() - 1999)].map((_, i) => ({label: (2000 + i).toString(), value: 2000 + i}))}
                            />
                    </View>
                </View>

                <View style={styles.filterGroup}>
                    <Text style={styles.inputLabel}>Keyword(s)</Text>
                    <View style={{flex: 1}}>
                        <TextInput
                            placeholder="Keywords ## TODO ##"
                            />
                        <Text>Keywords can appear anywhere in the publication. Use it to search for an author, title, or other detail.</Text>
                    </View>
                </View>

                <View style={styles.filterGroup}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={styles.loadAllButton}
                            onPress={loadAllMatches}>
                            <Text>Load all Matches</Text>
                        </TouchableOpacity>
                        <Text>Loading all matching publications may take a little while. If you're making a bibliography and need to select everything from your search, you may want to use this button.</Text>
                    </View>
                </View>

                <View style={styles.filterGroup}>
                    <Text style={styles.inputLabel}>Select All</Text>
                    <View style={{flex: 1}}>
                        {selected.all ? (
                            <Feather name="check-square" size={24} color="black" />
                        ) : (
                            <TouchableOpacity
                                onPress={() => dispatchSel({action: "all", id: publications.items.map(({id}) => id)})}>
                                <Feather name="square" size={24} color="black" />
                            </TouchableOpacity>
                        )
                        }
                    </View>
                </View>

                <View style={styles.filterGroup}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={styles.loadAllButton}
                            onPress={() => null}>
                            <Text>Cite Selected Publications</Text>
                        </TouchableOpacity>
                        <Text>Generates citations for all selected publications and displays them in a format easy to copy/paste.</Text>
                    </View>
                </View>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View>
                    <Text style={styles.tableHeader}>Select</Text>
                </View>
                <View>
                    <Text style={styles.tableHeader}>Type</Text>
                </View>
                <View style={{width: "40%"}}>
                    <Text style={styles.tableHeader}>Publication</Text>
                </View>
                <View style={{width: "35%"}}>
                    <Text style={styles.tableHeader}>Author</Text>
                </View>
            </View>

            {publications.items.length === 0 && !publications.loaded ? (
                <ActivityIndicator
                    size="large" />
            ) : (
                <FlatList style={styles.list}
                    data={publications.items}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={nextPage}
                    onEndReachedThreshold={0.3}
                    renderItem={({item, index}) => (
                        <View style={{alignItems: "center"}}>
                            <View style={styles.recordRow}>
                                <View>
                                    {selected.sel[item.id] ? (
                                        <TouchableOpacity
                                            onPress={() => dispatchSel({action: "remove", id: item.id})}>
                                            <Feather name="check-square" size={24} color="black" />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => dispatchSel({action: "add", id: item.id})}>
                                            <Feather name="square" size={24} color="black" />
                                        </TouchableOpacity>
                                    )
                                    }
                                </View>

                                <TouchableOpacity style={styles.openRecordButton}
                                        onPress={() =>  props.navigation.navigate("Details",{publication: item})}>
                                    {ICONS[item.typeID] || ICONS.default}
                                </TouchableOpacity>

                                <View style={{width: "43%"}}>
                                    <Text style={styles.rowText}>{item.title}</Text>
                                </View>
                                <View style={{width: "43%"}}>
                                    <Text style={styles.rowText}>{item.author}</Text>
                                </View>
                            </View>
                            <View style={styles.splitter}/>
                            {index === publications.items.length - 1 && !publications.loaded ? (
                                <ActivityIndicator
                                    size="large"
                                    color="#00008b"/>
                            ) : (
                                <View/>
                            )}
                        </View>
                    )}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    splitter: {
        borderBottomWidth: 1,
        borderColor: "#CCC",
        width: "95%",
    },
    openRecordButton: {
        margin: 10,
    },
    loadAllButton: {
        padding: 10,
        margin: 5,
        alignItems: "center",
    },
    rowText: {
        marginHorizontal: 8,
    },
    recordRow: {
        width: "100%",
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
    },
    tableHeader: {
        marginHorizontal: 5,
        fontSize: 20,
        color: "#0AA",
    },
    inputLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    filterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 50,
        marginBottom: 20,
    },
    filterGroup: {
        flexDirection: "row",
        margin: 5,
        width: "47%",
    },
    filterControls: {
        padding: 5,
        borderBottomWidth: 2,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "space-around",
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
});
