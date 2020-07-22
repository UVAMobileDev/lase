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

function minYear(arr) {
    let min = 0
    let holder = []
    for (let i = 0; i < arr.length; i++) {
        holder[i] = parseInt(arr[i].year);
    }

    min = Math.min(...holder);
    return min;

}
/*
    A function to load all types for users to select in the filter area
*/
const LoadAllTypes = async () => {
    //Get all types from API
    let container = []
    let parsed = await fetch(`${BASE_URL}/publications/types/`).then(r => r.json());
    //container = parsed.types.map(type => type.label).sort();
    //container = parsed.types.map(type => type.label).sort();
    container = parsed.types.sort();
    return container;
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




const getAllTypes = async () => {
    let types = [];
    let parsed = await fetch(`${BASE_URL}/publications/types/`).then(r => r.json());
    types = parsed.types.map(type => type.id).sort();
}



function uniqueYear(arr_year) {
    let holder = [];
    for (let i = 0; i < arr_year.length; i++) {
        holder[i] = parseInt(arr_year[i].year);
    }
    let uniqueArr = Array.from(new Set(holder)).sort(); //get rid of duplicated year and sort it after
    let obj_arr = [];
    // create an array of objects
    for (let j = 0; j < uniqueArr.length; j++) {
        obj_arr.push({
            id: j,
            year: uniqueArr[j],
        });
    }
    return obj_arr;
}

/*
function uniqueAuthor(arr) {
    let holder = []; //array to only contains the year property for each element in pass-in array

    for (let i = 0; i < arr.length; i++) {
        holder[i] = arr[i].author; // ASK!!
    }
    let uniqueArr = Array.from(new Set(holder)); //this array holds unique string of author's name
    let unique = [];

    for (let j = 0; j < uniqueArr.length; j++) {
        unique.push({
            id: j,
            author: uniqueArr[j],
        });
    }

    return unique;
}
*/




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


// Param (page_numb): the current page number
// Return a list of publications in requested page only
const GetAllPublications = async (page_numb) => {
    //let page = 0;

    let publications = []
    let parsed = {publications: []};
    let response = await fetch(`${BASE_URL}/publications?page=${page_numb}`);
    parsed = await response.json();
    publications = publications.concat(parsed.publications);
    return publications;
}

const AllPublications = async () => {
    let page = 0;
    let publications = []
    let parsed = {publications: []};
        do {
            let response = await fetch(`${BASE_URL}/publications?page=${page}`);
            parsed = await response.json();
            publications = publications.concat(parsed.publications);
            page++;
        } while (parsed.publications.length > 0)

    return publications;
}

// A single line of code to handel query string and return URL to fetch based on the user's request
const QueryString = filter => `${BASE_URL}/publications?${Object.keys(filter).filter(key => filter[key] != "").reduce((acc, cur) => `${acc}&${cur}=${filter[cur]}`, "")}`;


const filteredObj = async (filter,page) => {
    let publications = []
    let parsed = {publication: []};
    parsed = await fetch(QueryString(filter,page)).then(r => r.json());
    publications = publications.concat(parsed.publication);
    return publications;
}

export default function ViewTab(props){
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    // useState and useReducer area

    // To render all publications
    const [allPublications,setAllPublications] = useState({loaded: false, items:[]});

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




    let loadAllPublications = async () => {
        let loadAll = await AllPublications();
        setAllPublications({loaded: true, items: loadAll});
    }
    loadAllPublications();


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

    /*
    old code
    useEffect(() => {
        // No filtering applied, show publications page by page
        let load = async () => {
            let allPublications = await GetAllPublications(page);
            if (allPublications.length === 0) {
                setMorePage(false);
            }
            //Change from item: allPublication to items: publications.items.concat(allPublications) because we want to keep the previous publications although we load more publication
            setPublications({loaded: true, items: publications.items.concat(allPublications)});
        }
        load(); //Call funtion to load after component is rendered
    },[page]);
    */


/*
    ifReach = {() => {

    }}
*/

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

                                    <Picker
                                    style = {styles.Scrollmenu}

                                    //onValueChange = {val => { dispatchFilter({type: "set", payload: {key: "entry_types_id", value: parseInt(val)}}); setSignal(true); setMorePage(true); setPage(0);} }
                                    onValueChange = {val => dispatchFilter({type: "set", payload: {key: "entry_types_id", value: parseInt(val)}})}>
                                        <Picker.Item key={-1} label={'All types:'} value={0}/>
                                        {types.map(type => (<Picker.Item key={type.id} label={type.label} value={type.id}/>))}
                                    </Picker>


                                    <Text style = {styles.filterType}> Filter by ID number: </Text>

                                    {/* Picker for displaying all ID numbers */}
                                    <Picker
                                    style = {styles.Scrollmenu}
                                    onValueChange = {val => dispatchFilter({type: "set", payload: {key: "id", value: parseInt(val)}})}
                                    >
                                        <Picker.Item key={-1} label={'All ID numbers: '} value={0}/>
                                        {allPublications.items.map(item => (<Picker.Item key={item.id} label={item.id} value={item.id}/>))}
                                    </Picker>

                                    <Text style = {styles.filterType}> Filter by year: </Text>
                                    {/* Picker for displaying all authors of publications
                                        onValueChange = {val => dispatchFilter({type: "set", payload: {key: "year", value: parseInt(val)}})}
                                        */}
                                    <Picker
                                        style = {styles.Scrollmenu}
                                        //onValueChange = {val => { dispatchFilter({type: "set", payload: {key: "year", value: parseInt(val)}}); setSignal(true);} }
                                        onValueChange = {val => dispatchFilter({type: "set", payload: {key: "year", value: parseInt(val)}})}
                                    >

                                        <Picker.Item key={-1} label={'All years: '} value={0}/>
                                        {
                                            [...Array(new Date().getFullYear() - 1999)].map((_, i) => (
                                            <Picker.Item key={i} label={2000 + i} value={2000 + i} />
                                        ))
                                        /*
                                        [...Array(new Date().getFullYear() - (minYear(allPublications.items)) - 1)].map((_, i) => (
                                        <Picker.Item key={i} label={minYear(allPublications.items) + i} value={minYear(allPublications.items) + i} />))
                                        */
                                        }

                                        { /*allPublications.items.map(item => (<Picker.Item key={item.id} label={item.year} value={item.id}/>))*/}

                                        {/* onValueChange ={value => setYear({loaded: true, input: parseInt(item.year)})}*/}


                                    </Picker>
                                </View>
                            </View>

                            {
                                /*
                                <View style = {{height: '30%',width: '50%'}}>
                                    <Text style = {styles.filterType}> Filter by author: </Text>

                                    <Picker style = {styles.ScrollmenuLong}
                                    onValueChange = {val => dispatchFilter({type: "set", payload: {key: "author", value: val}})}>
                                    >


                                        <Picker.Item key={-1} label={'Filter by author:'} value={''}/>
                                            {uniqueAuthor(allPublications.items).map(item => (<Picker.Item key={item.id} label={item.author} value={item.author}/>))}
                                        </Picker>


                                </View>
                                */
                            }


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

                <FlatList

                        style = {styles.list}
                        data = {publications.items}
                        keyExtractor={
                            /* Functional filter should be applied here */
                            /* must specify the key to iterate. Otherwise, it will use index*/
                            /* Since each publication has their own ID, we can use it to iterate*/

                        item => item.id.toString()}
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
                    onEndReachedThreshold = {0.3}
                    />



        </View>
    )
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
    publicTab: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
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
    filterAuthor: {
        fontSize: 16,
        marginLeft: 130,
        fontWeight: 'bold',
    },
    Scrollmenu: {
        flex: 1,
        borderLeftWidth: 2,
        borderRadius: 5,
        borderColor: Jet,
    },
    ScrollmenuLong: {
        width: '30%',
        height: '30%',
        itemStyle: '100%',
        flex: 1,
        borderLeftWidth: 2,
        borderRadius: 5,
        borderColor: Jet,
        marginLeft: 80,
    },
});
