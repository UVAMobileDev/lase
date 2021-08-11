// Description:
// This is to layout the design of the publication page, which consists two tabs: View and Insert
// View: display a list of publications. Each of publication will have a name of author and title of the paper.
// (Cont) will also provide a button. Clicking on it will lead the user to another page to view the detail of publication
// Insert: add new publication and scroll list is provided to let user choose which catergories of new publication will be

// All imports
import React, {useState, useEffect, useReducer, useContext} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, TextInput, ScrollView, ActivityIndicator,FlatLsit } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import { Ionicons } from '@expo/vector-icons';
import { Jet, InternationalOrange, Platinum, Gainsboro, EgyptianBlue, SpaceCadet, PurpleNavy } from '../../../constants/Colors';
import {LightStyles, DarkStyles, Colors} from '../../../constants/globalStyle';
import KeyContext from "../../../KeyContext";
const API_KEYS = "2yRALZXus73AaKg5c1wWv7qf4DTSx84naQGIGCCf";//require('../../../keys').API_KEY;

const LoadAllTypes = async () => {
    //Get all types from API
    let container = []
    let parsed = await fetch(`${BASE_URL}/publications/types/`).then(r => r.json());
    //container = parsed.types.map(type => type.label).sort();
    //container = parsed.types.map(type => type.label).sort();
    container = parsed.types.sort();
    return container;
}


/*
    Param(id): the id type of publication chosen by user
    Param(key): field of publication
    Param(types_arr): a list contains all objects of different types
    Return: this function will return a single string " (required)" to render in input text box if a current field must be filled by user. Otherwise, it returns empty string
*/
function checkIfrequire(id,key,types_arr) {
    let obj = types_arr.find(type => type.id === id) || {}; // return an object with correspodning type
    let field_require = false;
    let return_text = '';
    for (let i of Object.keys(obj)) {
        if (i === key) {
            if (obj[i] === "req") {
                field_require = true;
            } else {
                field_require = false;
            }
        }
    }

    if (field_require) {
        return_text = '(required)';
    }

    return return_text;

}

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
    Param 1 - Publication: a new publication that contains information that user input in the text input box
    Param 2 - filterFields: an array contains all required fields based on publication type that is chosen by user.
    Purpose - allow user to submit new publication to a database. However, it will stop submitting and prompt user if required field is not filled.
*/
const SubmitForm = async (nav,publication, filterFields,types_arr, setHighlight) => {
    let acceptableKeys = filterFields.map(ff => ff.key);  // Ex: acceptableKeys -> [comment, number, month,....]

    let holder = types_arr.find(type => type.id === publication.typeID) || {}; // finding a right type of object that match with user's publication type choice

    let required_keys = Object.keys(holder).filter(item => holder[item] === "req"); // this list will contain all required fields that users must enter
    let allow_submission = true; // this boolean variable will be a signal whether we allow the users to submit the publication or not

    // This is to check if the user already enter all needed information
    for(let key of required_keys) {
        if(!publication[key] || publication[key] === "") {
            allow_submission = false;
            break;
        }
    }

    let submission = Object.keys(publication).filter(key => acceptableKeys.includes(key) || key === "typeID" ).reduce((acc, cur) => {
        acc[cur] = publication[cur]; // -> this is an object, not an array
        return acc;
    },{});

    // Note that typeID is just convential field name. The actual field name is entry_types_id, this is to take care of that.
    for (let key of Object.keys(submission)) {
        if (key === "typeID") {
            let temp = submission[key];
            delete submission.typeID;
            submission["entry_types_id"] = temp;
        }
    }

    // Only send a put request whenever the requirement is being met
    if (allow_submission) {
        // Send PUT request
        let response = await fetch(`${BASE_URL}/publications`, {
            method: "PUT",
            headers: {
                "x-api-key": API_KEYS,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                publication: submission
            })
        });
        let parsed = await response.json();
        // Navigate to View Publication tab, then open the newly created publication.
        nav.navigate("All publications");
        nav.navigate("View Tab", {publication});
    } else {
        // The user did not enter required information. Set textbox to be red to inform user
        setHighlight(true);
    }
}


export default function InsertTab(props) {

    // Use reducer to handle changing fields of an object
    // Its first paramter is a function
    //const [publication,dispatchPublication] = useReducer(PubReducer,{typeID: 1});
    const [publication,dispatchPublication] = useReducer(PubReducer,{});
    const [types,setTypes] = useState([]); // use to store all types of publication
    const [filterFields,setFilterFields] = useState([]); //use to only ask users fields corresponding to chosen type
    const [highlightRequired, setHighlight] = useState(false); // use as a signal to inform user to input required information before submitting

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


        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Now we have the object (which is a type chosen from user in the interface), we need to filter out the fields that we want such as op, req, and gen

        //Break down:
        // Object.keys(obj).filter(key => obj[key] === "opt" || obj[key] === "req" || obj[key] === "gen") -> Filter out the uncesssary fields (usually has a null value)
        // Now the line of code above is an array that has all needed fields.
        setFilterFields(Object.keys(obj).filter(key => obj[key] === "opt" || obj[key] === "req" || obj[key] === "gen").map(key => ({key, state: obj[key]})));


    }, [publication.typeID]);

    const { dark, key } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);


    return (
        <View style = {[styles.componentBackground, styles.container]}>
            <ScrollView>
                <Text style = {[styles.lblColorized, styles.title]}>Create a new publication:</Text>
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {[styles.lblColorized, styles.section]}>Type of publication: </Text>
                    <Text style = {styles.asterisk}>Required * </Text>
                </View>
                <View style = {styles.ScrollMenu}>
                    {/* This is for the scroll-menu for choosing type to public */}
                    <RNPickerSelect
                        InputAccessoryView={() => null}
                        placeholder={{label: "Choose type", value: 0}}
                        onValueChange={value => dispatchPublication({
                            type: "set",
                            payload: {key: "typeID", value: parseInt(value)}
                        })}
                        items={types.map(({label, id}) => (
                            {label, value: id}
                        ))}/>
                </View>
                <Text style = {[styles.lblColorized,styles.section]}> Publication Details: </Text>
                <View style = {styles.recordArea}>
                    {types.length > 0 ? (
                        <View style = {styles.ScrollMenu}>
                            {filterFields.map(field => (
                                <View key = {field.key} style = {styles.infoRow}>
                                    <View style = {{width: '40%'}}>
                                        <Text style = {[styles.fieldName, styles.lblColorized]}> {field.key}: </Text>
                                    </View>
                                    <View style = {{width: '60%'}}>
                                        <TextInput
                                                    style = {highlightRequired && checkIfrequire(publication.typeID,field.key,types) === '(required)' && !publication[field.key] ? [styles.inputBox_require, styles.lblColorized] : [styles.inputBox, styles.lblColorized]}
                                                    key={field.key}
                                                    value={publication[field.key] || ""}
                                                    onChangeText={text => dispatchPublication({type: "set", payload: {key: field.key, value: text}})}
                                                    placeholder={`Enter ${field.key} ${checkIfrequire(publication.typeID,field.key,types)}`} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (<View/>) }
                </View>
                <View style = {styles.submitArea}>
                    <Text style = {styles.warnText}> NOTE: You cannot edit your publication once it is submitted. Please carefully review your publication! </Text>
                    <Button title = "Submit publication"
                            color = {Jet}
                            onPress = {() => SubmitForm(props.navigation, publication,filterFields,types, setHighlight)}/>
                </View>
            </ScrollView>
        </View>
    );
}

const LocalStyles = {
    container: {
        flex: 1,
        //backgroundColor: '#d3d3d3',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        fontFamily: 'Cochin',

    },

    section: {
        fontSize: 18,
        marginLeft: 60,
        fontWeight: "bold",
        margin: 5,
        fontFamily: 'Cochin',

    },
    asterisk: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 5,
        color: 'red',
        fontFamily: 'Cochin',

    },
    ScrollMenu: {
        marginLeft: 60,
        width: 350,
    },
    submitArea: {
        marginTop: 25,
        padding: 20,
        borderColor: 'black',
        borderTopWidth: 1,
        alignItems: "center",
        width: '100%',
    },
    warnText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: InternationalOrange,
        marginBottom: 15,
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
        fontFamily: 'Kailasa',

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
        fontFamily: 'Cochin',
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
    inputBox_require: {
        color: Gainsboro,
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'red',
    }
};
