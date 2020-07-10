// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, { useState, useEffect, useReducer } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, TextInput, ScrollView, ActivityIndicator,FlatLsit } from 'react-native';
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

function typeName(id) {
    return AllTypes[id];
}

// Create an object that contains all default fields from a single publication
/*
const PubDefault = {
    id: 0,
    jabref_eid: "",
    typeID: 0,
    citeKey: "",
    author: "",
    title: "",
    journal: "",
    day: "",
    dayFiled: "",
    month: "",
    monthFiled: "",
    year: "",
    yearFiled: "",
    volume: "",
    pages: "",
    number: "",
    eid: "",
    note: "",
    crossref: "",
    keywords: "",
    doi: "",
    url: "",
    file: "",
    citeseeurl: "",
    pdf: "",
    abstract: "",
    comment: "",
    owner: "",
    timestamp: "",
    review: "",
    search: "",
    publisher: "",
    editor: "",
    series: "",
    address: "",
    edition: "",
    howPublished: "",
    lastChecked: "",
    bookTitle: "",
    organization: "",
    language: "",
    chapter: "",
    type: "",
    school: "",
    nationality: "",
    assignee: "",
    institution: "",
    revisor: "",
}
*/

const PubDefault = {
    
}

// Remove fields according to chosen type
 const filerFields = [
     {
        id: 0,
        allFields: [],
     }, {
         //This is for article
         id: 1,
         allFields: [
             {
                 text: 'id',
             }, {
                 text: 'jabref_eid',
             }, {
                 text: 'typeID',
             }, {
                 text: 'citeKey',
             }, {
                 text: 'author',
             }, {
                 text: 'title',
             }, {
                 text: 'journal',
             }, {
                 text: 'month',
             }, {
                 text: 'year',
             }, {
                 text: 'volume',
             }, {
                 text: 'pages',
             }, {
                 text: 'number',
             }, {
                 text: 'doi',
             }, {
                 text: 'url',
             }, {
                 text: 'file',
             },
         ]
     },
 ]
// Declare an empty array to contain all neccessary fields from chosen type
 var container = [];

 function cloneArray(numberID) {
     for (let i = 0; i < filerFields.length; i++) {
         if (numberID == filerFields.id) {
             //Cloning array
             container = filerFields[i].allFields.slice();
         }
     }
 }



// A function to handle action. This will essentially be passed to reducer
// Parameter (state): a current state
// Parameter (action):
// Return a new state that has been modified given actions
const pubReducer = (state,action) => {
    switch(action.key) {
        case "jabref_eid":
            return {...state, jabref_eid: action.payload};

        case "typeID":
            return {...state, typeID: action.payload};

        case "citeKey":
            return {...state, citeKey: action.payload};

        case "author":
            return {...state, author: action.payload};

        case "title":
            return {...state, title: action.payload};

        case "journal":
            return {...state, journal: action.payload};

        case "day":
            return {...state, day: action.payload};

        case "dayFiled":
            return {...state, dayFiled: action.payload};

        case "month":
            return {...state, month: action.payload};

        case "monthFiled":
            return {...state, monthFiled: action.payload};

        case "year":
            return {...state, year: action.payload};

        case "yearFiled	":
            return {...state, yearFiled: action.payload};

        case "volume":
            return {...state, volume: action.payload};

        case "pages":
            return {...state, pages: action.payload};

        case "number":
            return {...state, number: action.payload};

        case "eid":
            return {...state, eid: action.payload};

        default:
            return state;
    }

}

/*
    Param (type): takes in a string (Ex: article, conference, or etc)
    Return: an integer that represent that type (Ex: article -> 1)
*/
function IdenfityType(type){
    switch(type)
        {
            case 'Article' :
                return 1;
            case 'Book':
                return 2;
            case 'Booklet':
                return 3;
            case 'Conference':
                return 4;
            case 'electronic':
                return 5;
            case 'inbook':
                return 6;
            case 'incollection':
                return 7;
            case 'inproceedings':
                return 8;
            case 'manual':
                return 9;
            case 'mastersthesis':
                return 10;
            case 'misc':
                return 11;
            case'other':
                return 12;
            case 'patent':
                return 13;
            case 'periodical':
                return 14;
            case 'phdthesis':
                return 15;
            case 'proceedings':
                return 16;
            case 'standard':
                return 17;
            case 'techreport':
                return 18;
            case 'unpublished':
                return 19;
        }
}

export default function InsertTab(props){

    // Use reducer to handle changing fields of an object
    // Its first paramter is a function
    const [publication,dispatchPublication] = useReducer(pubReducer,PubDefault);


    return (
        <View style = {styles.container}>
            <ScrollView>

                <Text style = {styles.title}>
                    Publication creation:
                </Text>

                <Text style = {styles.section}>
                    Type of publication:
                    <SelectType placeholder={{label: "Select type", value: ""}} update={theType => dispatchPublication({key: "typeID", payload: IdenfityType(theType)})}/>
                </Text>
                {/*
                    All this point, typeID field should be updated, we can use it to remove fields accordingly to the chosen type
                */}

                {
                    cloneArray(PubDefault.typeID)
                }


                <TextInput  style={styles.smallTextInput}
                            onChangeText={val => dispatchPublication({key: "author", payload: val})}
                            numberOfLines={1}
                            placeholder="author"/>

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
    },
    submitArea: {
        marginTop: 25,
        margin: 10,
        padding: 20,
        borderColor: Platinum,
        borderTopWidth: 1,
        alignItems: "center",
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
    },
});
