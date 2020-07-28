// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect, useReducer } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Picker } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import { Ionicons } from '@expo/vector-icons';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';
import { Jet, InternationalOrange, Platinum, Gainsboro, EgyptianBlue, SpaceCadet, PurpleNavy } from '../../../constants/Colors';
import SelectDate from '../../lib/forms/SelectDate';

import RNPickerSelect from 'react-native-picker-select';


// Array to contain all types of publication
const AllTypes = [
            'None',
            'Article',
            'Book',
            'Booklet',
            'Conference',
            'electronic',
            `inbook`,
            `incollection`,
            `inproceedings`,
            `manual`,
            `mastersthesis`,
            `misc`,
            `other`,
            `patent`,
            `periodical`,
            `phdthesis`,
            `proceedings`,
            `standard`,
            `techreport`,
            `unpublished`
]

const minYear = arr => Math.min(...arr.map(obj => parseInt(obj.year)));

/*
    A function to load all types for users to select in the filter area
*/
const LoadAllTypes = async () => {
    let parsed = await fetch(`${BASE_URL}/publications/types/`).then(r => r.json());
    return parsed.types.sort();
}

function type(id) {
    let theID = parseInt(id);
    for (let i = 0; i < AllTypes.length; i++) {
        if (theID === i) {
            return (
                <View style={{width: "10%"}}>
                    <Text style={styles.rowText}>{AllTypes[i]}</Text>
                </View>
            )
        }
    }

}

// This function is called whenever the payload is activated
// Param (state): the current state
// Param (action): action required from user
// Return an object to filter
const FilterReducer = (state, action) => {
    switch(action.type) {
        case "set":
            return {...state, [action.payload.key]: action.payload.value};
        default:
            return state;
    }
}

// A single line of code to handel query string and return URL to fetch based on the user's request
const QueryString = filter => `${BASE_URL}/publications?${Object.keys(filter).filter(key => filter[key] != "").reduce((acc, cur) => `${acc}&${cur}=${filter[cur]}`, "")}`;

export default function ViewTab(props){
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    // useState and useReducer area

    // To render all publications by page
    const [publications, setPublications] = useState({loaded: false, items: []});

    //To keep track and upload publications from new page.
    const [page,setPage] = useState(0);

    //To make sure that we are not requesting any more data if we reach the end
    const [morePage,setMorePage] = useState(true);

    // To keep track of types and display all types option for users to select in filter area
    const [types,setTypes] = useState([]);

    // To filter publications based on users' choice
    const [filter,dispatchFilter] = useReducer(FilterReducer,{});

    const [signal,setSignal] = useState(false);

    const [loadData, setLoadData] = useState({page: 0, loadMore: true});

    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        //Each time filter changes, this will set the default. (load from beginning and load more pages)
        setLoadData({page: 0, loadMore: true});
    },[filter]);

    useEffect(() => {
        // This useEffect is only called whenever the number of page changes
        let loadFilter = async () => {

            if (!loadData.loadMore) return; // don't do anything, we are done loading
            let response = await fetch(`${QueryString(filter)}&page=${loadData.page}`).then(r => r.json()); //this will return list of objects (publications)

            if (loadData.page === 0) {
                setPublications({loaded:true, items: response.publications});
            } else {
                if (response.publications.length > 0) {

                    // Continue to load more
                    setPublications({loaded: true, items:publications.items.concat(response.publications)}); // keep loading while there are still publications
                } else {
                    setLoadData({page: loadData.page,loadMore: false}); // no more publications, we are done

                }
            }

        }
        loadFilter();

    },[loadData.page,filter]);


    function ifReach() {
        if (loadData.loadMore) {
            setLoadData({page: loadData.page + 1, loadMore: true});
        }
    }


    // First useEffect: Load all types from the server
    useEffect(() => {

        let load = async () => {
            let loadTypes = await LoadAllTypes();
            setTypes(loadTypes);
        }
        //let loadTypes = async () => setTypes(await LoadAllTypes());
        load(); //function called to get all types
    }, []);

    return (

        <View style = {styles.tabContainer}>

            <View style = {styles.FilterContainer}>
                {/* This is for the scroll-menu for choosing type to public */}
                <Text style = {styles.filterTitle}> Search by categories: </Text>

                <View style = {{marginBottom: 20}}>
                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {styles.filterType}> Filter by type:  </Text>
                            {/* all pickers should go in here */}
                            {/* Picker for displaying all types */}
                            <RNPickerSelect style={styles.Scrollmenu}
                                    placeholder={{label: "", value: 0}}
                                    InputAccessoryView={() => null}
                                    onValueChange = {val => dispatchFilter({type: "set", payload: {key: "entry_types_id", value: parseInt(val)}})}
                                    items={types.map(({label, id}) => (
                                        {label, value: id}
                                    ))}/>

                            {/* Picker for displaying all authors of publications */}
                            <Text style = {styles.filterType}> Filter by year: </Text>
                            <RNPickerSelect style={styles.Scrollmenu}
                                    onValueChange = {val => dispatchFilter({type: "set", payload: {key: "year", value: parseInt(val)}})}
                                    items={[...Array(new Date().getFullYear() - 1999)].map((_, i) => (
                                        {label: `${2000 + i}`, value: 2000 + i}
                                    ))}/>
                        </View>
                    </View>
            </View>


            <View style = {styles.top}>

                        <View style={{width: "10%"}}>
                            <Text style = {styles.type}>
                                Type
                            </Text>
                        </View>

                       <View style={{width: "45%"}}>
                           <Text style = {styles.title}>
                               Publication Title
                           </Text>
                       </View>


                       <View style={{width: "40%"}}>
                           <Text style = {styles.author}>
                               Author
                           </Text>
                       </View>

                       <View style={{width: "5%"}}>
                           <Text style={styles.id}>
                               ID
                           </Text>
                       </View>
            </View>

            <FlatList style = {styles.list}
                    data = {publications.items}
                    keyExtractor={item => item.id.toString()}
                    renderItem = {({item}) => (
                        <View  style={styles.recordRow}>

                            <View>
                                <TouchableOpacity   style={styles.openRecordButton}
                                    onPress = {() =>  props.navigation.navigate("Details",{publication: item})}>
                                    <Ionicons name="md-open" size={16} color={'grey'} style={{position: "relative", left: 3, top: 1}}/>
                                </TouchableOpacity>
                            </View>

                            {type(item.typeID)}
                            <View style={{width: "45%"}}>
                                <Text style={styles.rowText}>{item.title}</Text>
                            </View>
                            <View style={{width: "40%"}}>
                                <Text style={styles.rowText}>{item.author}</Text>
                            </View>
                            <View style={{width: "5%"}}>
                                <Text style={styles.rowText}>{item.id}</Text>
                            </View>
                        </View>

                )}
                onEndReached = {ifReach}
                onEndReachedThreshold = {0.3}/>
        </View>
    );
}

const styles = StyleSheet.create({
    type: {
        fontWeight: "bold",
        fontSize: 22,
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",
    },
    author: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: "bold",
    },
    id: {
        fontSize: 22,
        fontWeight: "bold",
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
        borderLeftWidth: 3,
        borderRadius: 5,
        borderColor: 'red',
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
    FilterContainer: {
        width: '100%',
        height: 120,
        padding: 5,
        borderBottomWidth: 2,
    },
    filterType: {
        fontSize: 16,
        marginLeft: 80,
        fontWeight: 'bold',
    },
    filterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 50,
        color: InternationalOrange,
        marginBottom: 20,
    },
    Scrollmenu: {
        flex: 1,
        borderLeftWidth: 2,
        borderRadius: 5,
        borderColor: Jet,
    },
});
