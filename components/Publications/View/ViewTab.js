// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import { Ionicons } from '@expo/vector-icons';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';

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



/*
function getType(array,id) {

}*/
/*
const GetAllPublications = async () => {
    let page = 0;
    let publications = []
    let parsed = {publications: []};

    do {
        let response = await fetch(`${BASE_URL}/publications?page=${page}`);
        parsed = await response.json();
        publications = publications.concat(parsed.publications);
        page++;
    } while(parsed.publications.length > 0)
    //This will return the array that contains all publications for all pages
    return publications;
}
*/

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



export default function ViewTab(props){
    //const [publications, setPublications] = useState([]);
    const [publications, setPublications] = useState({loaded: false, items: []});
    //To keep track and upload publications from new page.
    const [page,setPage] = useState(0);
    //To make sure that we are not requesting any more data if we reach the end
    const [morePage,setMorePage] = useState(true);


    const loadMorePage = () => {
        if (morePage) {
            setPage(page + 1);
        }
    }

    useEffect(() => {
        //Calling the subroutine
        //Alternative

        //A function to load all publications

        let load = async () => {
            let allPublications = await GetAllPublications(page);
            if (allPublications.length === 0) {
                setMorePage(false);
            }
            //Change from item: allPublication to items: publications.items.concat(allPublications) because we want to keep the previous publications although we load more publication
            setPublications({loaded: true, items: publications.items.concat(allPublications)});
        }


        //Call funtion to load after component is rendered
        load();
        //loadPublications(setPublications);
    }, [page]);



    return (

        <View style = {styles.tabContainer}>

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
    }
});
