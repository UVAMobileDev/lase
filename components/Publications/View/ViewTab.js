// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Picker } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import { Ionicons } from '@expo/vector-icons';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';
import { Jet, InternationalOrange, Platinum, Gainsboro, EgyptianBlue, SpaceCadet, PurpleNavy } from '../../../constants/Colors';


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

function uniqueAuthor(arr) {
    let holder = []; //array to only contains the year property for each element in pass-in array
    for (let i = 0; i < arr.length; i++) {
        holder[i] = arr[i].author;
    }
    let uniqueArr = Array.from(new Set(holder)); //this array holds unique string of author's name
    let unique = [];

    for (let j = 0; j < uniqueArr.length; j++) {
        unique.push({
            id: j,
            author: uniqueArr[j],
        });
    }
    /*
    let minYear = Math.min(...holder);
    let maxYear = Math.max(...holder);
    let unique = [];
    let i = 1;
    let currentVal = minYear;
    unique[0] = minYear;
    while (currentVal != maxYear) {
        currentVal = currentVal + 1;
        unique[i] = currentVal;
        i = i + 1;
    }
    unique.push(maxYear);
    */
    console.log(unique);

    return unique;

}



// Parameter: pageNumb (the current page number)
// Return a list of publications in one page only
const GetAllPublications = async (page_numb) => {
    //let page = 0;

    let publications = []
    let parsed = {publications: []};
    let response = await fetch(`${BASE_URL}/publications?page=${page_numb}`);
    parsed = await response.json();
    publications = publications.concat(parsed.publications);
    return publications;
}

const GetAllPublications_year = async(year,index) => {
    console.log(index);
    let theYear = year[index].year;
    console.log(theYear);
    let publications = []
    let parsed = {publications: []};
    let response = await fetch(`https://api.lase.mer.utexas.edu/v1/publications?year=${theYear}`);
    parsed = await response.json();
    console.log(parsed);
    publications = publications.concat(parsed.publications);
    return publications;
}

const GetAllPublications_author = async(arr_author,index) => {
    console.log(index);
    let theName = arr_author[index].author;

    console.log(theName);
    let publications = []
    let parsed = {publications: []};
    let response = await fetch(`https://api.lase.mer.utexas.edu/v1/publications?author=${theName}`);
    parsed = await response.json();
    console.log(parsed);
    publications = publications.concat(parsed.publications);
    return publications;
}



export default function ViewTab(props){

    // To render all publications to the page
    const [publications, setPublications] = useState({loaded: false, items: []});

    //To keep track and upload publications from new page.
    const [page,setPage] = useState(0);

    //To make sure that we are not requesting any more data if we reach the end
    const [morePage,setMorePage] = useState(true);

    // To keep track of types and display all types option for users to select in filter area
    const [types,setTypes] = useState([]);


    // UseState to detect if the users want to filter by year
    const [yearFilter,setYearFilter] = useState({loaded: false, array_year: [], index_year: 0});

    // UseState to detect if the users want to filter by author
    const [authorFilter,setAuthorFilter] = useState({loaded:false, array_author: [], index_author: ''});


    const loadMorePage = () => {
        if (morePage) {
            setPage(page + 1);
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

    // Second useEffect: load all publications from the server
    useEffect(() => {

        //Calling the subroutine
        //Alternative
            if (yearFilter.loaded) {
                let load_year = async () => {
                    let allPublications_year = await GetAllPublications_year(yearFilter.array_year,yearFilter.index_year);
                    setPublications({loaded:true, items: allPublications_year});
                }
                load_year();
                console.log(publications);
            } else if (yearFilter.loaded === false && authorFilter.loaded) {
                let load_author = async () => {
                    let allPublications_author = await GetAllPublications_author(authorFilter.array_author,authorFilter.index_author);
                    setPublications({loaded:true, items: allPublications_author});
                }
                load_author();
            } else {
                //A function to load all publications

                let load = async () => {
                    let allPublications = await GetAllPublications(page);
                    if (allPublications.length === 0) {
                        setMorePage(false);
                    }
                    //Change from item: allPublication to items: publications.items.concat(allPublications) because we want to keep the previous publications although we load more publication
                    setPublications({loaded: true, items: publications.items.concat(allPublications)});
                }
                load(); //Call funtion to load after component is rendered
            }
    }, [page,yearFilter,authorFilter]);



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
                                    onValueChange = {value => setTypeFilter({loaded: true, typeid: parseInt(value)})}
                                    >
                                        {types.map(type => (<Picker.Item key={type.id} label={type.label} value={type.id}/>))}
                                    </Picker>


                                    <Text style = {styles.filterType}> Filter by ID number: </Text>

                                    {/* Picker for displaying all ID numbers */}
                                    <Picker style = {styles.Scrollmenu}>
                                        {publications.items.map(item => (<Picker.Item key={item.id} label={item.id} value={item.id}/>))}
                                    </Picker>

                                    <Text style = {styles.filterType}> Filter by year: </Text>
                                    {/* Picker for displaying all authors of publications */}
                                    <Picker
                                        style = {styles.Scrollmenu}
                                        onValueChange ={value => setYearFilter({loaded: true, array_year: uniqueYear(publications.items), index_year: parseInt(value)})}
                                    >
                                        {/* onValueChange ={value => setYear({loaded: true, input: parseInt(item.year)})}*/}
                                        {uniqueYear(publications.items).map(item => (<Picker.Item key={item.id} label={item.year} value={item.id}/>))}
                                    </Picker>
                                </View>
                            </View>

                            <View style = {{marginBottom: 20}}>
                                <Text style = {styles.filterType}> Filter by title: </Text>
                                {/* Picker for displaying all ID numbers */}
                                <Picker style = {styles.ScrollmenuLong}
                                >
                                    {publications.items.map(item => (<Picker.Item key={item.id} label={item.title} value={item.id}/>))}
                                </Picker>
                            </View>


                            <View>
                                <Text style = {styles.filterType}> Filter by author: </Text>
                                {/* Picker for displaying all ID numbers */}
                                <Picker style = {styles.ScrollmenuLong}
                                onValueChange = {value => setAuthorFilter({loaded: true, array_author: uniqueAuthor(publications.items), index_author: parseInt(value)})}
                                >
                                    {uniqueAuthor(publications.items).map(item => (<Picker.Item key={item.id} label={item.author} value={item.id}/>))}
                                </Picker>
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
                    onEndReached = {loadMorePage}
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
        height: 250,
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
        flex: 1,
        borderLeftWidth: 2,
        borderRadius: 5,
        borderColor: Jet,
        marginLeft: 80,
    },
});
