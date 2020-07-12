// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect, useReducer } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Picker, FlatList, TextInput, ScrollView, ActivityIndicator,FlatLsit } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';
import { Ionicons } from '@expo/vector-icons';
import { Jet, InternationalOrange, Platinum, Gainsboro, EgyptianBlue, SpaceCadet, PurpleNavy } from '../../../constants/Colors';

import SelectType from '../../Publications/SelectType';


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

const LoadAllTypes = async () => {
    //Get all types from API
    let container = []
    let parsed = await fetch(`${BASE_URL}/publications/types/`).then(r => r.json());
    //container = parsed.types.map(type => type.label).sort();
    //container = parsed.types.map(type => type.label).sort();
    container = parsed.types.sort();
    return container;
}

//Declare empty object. UseReducer will know to add a field when it does not have one and modify the field when it is already existed
const PubDefault = {}



/* A function to handle action. This will essentially be passed to reducer
 Parameter (state): a current state
 Parameter (action): add/modify the field
 Return a new state that has been modified given actions
 */
 // Reducer to manage state of the current form
 // Return a state that contains object
 const PubReducer = (state, action) => {
     switch(action.type) {
         case "set":
             return {...state, [action.payload.key]: action.payload.value}
         default:
             return state;
     }
 }


/*
const SubmitForm = async (nav, record, sources) => {
    // Source entries carry an id (required by React). We don't want them here.
    let clean_sources = sources.map(src => {
        return {date: src.date,
        system: src.system,
        amount: src.amount,
        source: src.source};
    });

    // Send PUT request
    let response = await fetch(`${BASE_URL}/publications`, {
        method: "PUT",
        headers: {
            "x-api-key": process.env.X_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            record,
            sources: clean_sources
        })
    });
    let parsed = await response.json();

    // Navigate to the Browse tab, then open the newly created record.
    nav.navigate("Browse");
    nav.navigate("Record", {record});
}*/



// Take the current state of the form and prepare it for submission
const SubmitForm = (publication, filterFields) => {
    let acceptableKeys = filterFields.map(ff => ff.key);

    let submission = Object.keys(publication).filter(key => acceptableKeys.includes(key) || key === "typeID" ).reduce((acc, cur) => {
        acc[cur] = publication[cur];
        return acc;
    });

    console.log(submission);
    /*
    // Send PUT request
    let response = await fetch(`${BASE_URL}/publications`, {
        method: "PUT",
        headers: {
            "x-api-key": process.env.X_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            record,
            sources: clean_sources
        })
    });
    let parsed = await response.json();

    // Navigate to the Browse tab, then open the newly created record.
    nav.navigate("");
    nav.navigate("Record", {record});
    */
}


export default function InsertTab(props){

    // Use reducer to handle changing fields of an object
    // Its first paramter is a function
    const [publication,dispatchPublication] = useReducer(PubReducer,{typeID: 1});
    const [types,setTypes] = useState([]);
    const [filterFields,setFilterFields] = useState([]);

    //Load all types from the server
    useEffect(() => {
        let load = async () => {
            let loadTypes = await LoadAllTypes();
            setTypes(loadTypes);
        }
        //let loadTypes = async () => setTypes(await LoadAllTypes());
        load(); //function called to get all types
    }, []);

    useEffect(() => {
        // Iterate through every single type of publication and find the one that matches with user's choice
        if(types.length > 0) console.log(types[0].id, publication.typeID, types[0].id === publication.typeID);
        let obj = types.find(type => type.id === publication.typeID) || {}; // A single object that the user is currently lookingfor

        /*
        For testing
        console.log("Found type object");
        console.log(obj);

        console.log("\nKeys that are permissible for this type");
        console.log(Object.keys(obj).filter(key => obj[key] === "opt" || obj[key] === "req" || obj[key] === "gen"))
        */
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Now we have the object (which is a type chosen from user in the interface), we need to filter out the fields that we want such as op, req, and gen

        //Break down:
        // Object.keys(obj).filter(key => obj[key] === "opt" || obj[key] === "req" || obj[key] === "gen") -> Filter out the uncesssary fields (usually has a null value)
        // Now the line of code above is an array that has all needed fields.
        setFilterFields(Object.keys(obj).filter(key => obj[key] === "opt" || obj[key] === "req" || obj[key] === "gen").map(key => ({key, state: obj[key]})));


    }, [publication.typeID]);

    return (
        <View style = {styles.container}>
            <ScrollView>

                <Text style = {styles.title}>
                    Publication creation:
                </Text>

                <Text style = {styles.section}>
                    Type of publication:
                </Text>


                    <View style = {styles.ScrollMenu}>
                        {/* This is for the scroll-menu for choosing type to public */}
                        <Picker onValueChange={value => dispatchPublication({type: "set", payload: {key: "typeID", value: parseInt(value)}})}>
                            {types.map(type => (<Picker.Item key={type.id} label={type.label} value={type.id}/>))}
                        </Picker>
                    </View>

                    <Text style = {styles.section}> Publication Details: </Text>

                    <View style = {styles.recordArea}>

                        {types.length > 0 ? (
                            <View style = {styles.ScrollMenu}>

                                {filterFields.map(field => (
                                    <View key = {field.key} style = {styles.infoRow}>
                                        <View style = {{width: '40%'}}>
                                            <Text style = {styles.fieldName}> {field.key} </Text>
                                        </View>

                                        <View style = {{width: '60%'}}>
                                            <TextInput
                                                        style = {styles.inputBox}
                                                        key={field.key}
                                                        value={publication[field.key] || ""}
                                                        onChangeText={text => dispatchPublication({type: "set", payload: {key: field.key, value: text}})}
                                                        placeholder={`Enter ${field.key}`} />
                                        </View>

                                    </View>

                                ))}
                            </View>
                        ) : (<View/>) }
                    </View>



                <View style = {styles.submitArea}>
                    <Button title = "Submit publication"
                            color = {Jet}/>
                </View>
            </ScrollView>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Platinum,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
    },

    section: {
        fontSize: 18,
        marginLeft: 60,
        fontWeight: "bold",
        margin: 5,
    },
    ScrollMenu: {
        marginLeft: 60,
        width: 350,
    },
    submitArea: {
        marginTop: 25,
        margin: 10,
        padding: 20,
        borderColor: Platinum,
        borderTopWidth: 1,
        alignItems: "center",
    },
    listFields: {
        fontWeight: "bold",
        fontSize: 18,
    },
    smallTextInput: {
        margin: 5,
        padding: 5,
        borderColor: Platinum,
        borderLeftWidth: 2,
        borderRadius: 5,
        color: Gainsboro,
        borderLeftWidth: 3,
        borderRadius: 5,
        borderColor: 'black',
        fontWeight: "bold",
    },
    fieldName: {
        color: Gainsboro,
        minHeight: 25,
        fontWeight: "bold",
        fontSize: 15,
        borderRightColor: InternationalOrange,
        borderRightWidth: 2,
        fontWeight: "bold",
        color: 'black',
        padding: 5,
        margin: 5,
    },
    infoRow: {
        flexDirection: "row",
    },
    recordArea: {
        flex:  1,
        flexDirection: "column",
    },
    inputBox: {
        color: Gainsboro,
        color: 'black',
        padding: 5,
        margin: 5,
        borderWidth: 1,

    },
});
