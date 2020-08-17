import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button, TextInput } from 'react-native';
import { BASE_URL } from '../../constants/API.js';
import SelectSystem from '../lib/forms/SelectSystem';
import SelectMember from '../lib/forms/SelectMember';
import { API_KEY } from '../../keys';
const fetch = require("node-fetch");

//adding a growth should be tied to a sampleID

const Default = {
    date: "",
    holderID: "",
    growthNum: "",
    substrate: "",
    substrateSize: "",
    GaTip: "",
    GaBase: "",
    GaFlux: "",
    InTip: "",
    InBase: "",
    InFlux: "",
    AlBase: "",
    AlFlux: "",
    Er: "",
    ErFlux: "",
    Si: "",
    Be: "",
    GaTe: "",
    AsSub: "",
    AsCrk: "",
    AsValve: "",
    AsFlux: "",
    SbSub: "",
    SbCrk: "",
    SbValve: "",
    SbFlux: "",
    NRF: "",
    ReflectedRF: "",
    NFlow: "",
    ForlinePressure: "",
    PyroDeox: "",
    TCDeox: "",
    PyroGrowth: "",
    TCGrowth: "",
    GCPressure: "",
    BFBackground: "",
    HVP: "",
    PyroOffset: "",
    Description: "",
    Ga_Tip: "",
    Ga_Base: "",
    Ga_Flux: "",
    In_Tip: "",
    In_Base: "",
    In_Flux: "",
    Al_Base: "",
    Al_Flux: "",
    La_Temp: "",
    La_Flux: "",
    Lu_Temp: "",
    Lu_Flux: "",
    As_Sub: "",
    As_Crk: "",
    Chamber_Background: "",
    BF_Background: "",
    Bi_Temp: "",
    Bi_Flux: "",
    Bi_Tip: "",
    Bi_Base: "",
    Gd_Temp: "",
    Gd_Flux: "",
    B_Temp: "",
    B_Flux: "",
    waferTracked: "",
    GaP_Temp: "",
    GaP_Flux: "",
    machine: "",
    grower: "",
}

const UpdateGrowthRecord = (state, update, updateDict) => {
    let new_version = Object.assign({}, state, updateDict);
    update(new_version);
    console.log(new_version)
}

const SubmitForm = async (nav, growthRecord) => {
    let response = await fetch(`${BASE_URL}/machine/${growthRecord.machine}/growths`, {
        method: "PUT",
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            growthRecord,
        })
    });
    let parsed = await response.json();

    // open the newly created growth record
    nav.navigate("Growth Details", {growth: growthRecord});
}

// const Reducer = (state, action) => {
//     // action: {
//     //      key: "the key we want to set"
//     //      value: "the value of the key"
//     // }
//     switch(action.type) {
//         case "set":
//             return {...state, [action.key]: action.value}
//
//         default:
//             return state;
//     }
// }

export default function AddGrowth(props) {
    let sampleID = props.route.params.sampleID;
    const [growthRecord, setGrowthRecord] = useState(Object.assign({}, Default));
    //const [submission, dispatchSub] = useReducer(Reducer, {sampleID: props.route.params.sampleID});

    // value => dispatchSub({type: "set", key: "changes based on what field this is", value})

    return(
        <ScrollView>
        <View style={styles.container}>
                <Text style={styles.title}>Add a new growth to the database with Sample ID {sampleID}</Text>
                <Text style={styles.subtitle}>Growth details:</Text>
                <View style={styles.growthContainer}>
                    <SelectSystem   update={val => UpdateGrowthRecord(growthRecord, setGrowthRecord, {machine: val})}
                                    placeholder={{label: "Select a System... (REQUIRED)" , value:  ""}}/>
                    <SelectMember   update={val => UpdateGrowthRecord(growthRecord, setGrowthRecord, {grower: val})}
                                    placeholder={{label: "Select a Grower...", value: ""}}/>
                    <View style={styles.growthRow}>
                        <View>

                            {
                                Object.entries(Default).filter(([key, _]) => key !== "machine" && key !== "grower").map(([key, value]) =>
                                    <Text>{key}:</Text>
                                )
                            }
                        </View>
                        <View>
                            {
                                Object.entries(Default).filter(([key, _]) => key !== "machine" && key !== "grower").map(([key, value]) =>
                                <TextInput  style={styles.inputBorder}
                                            placeholder={key}
                                            onChangeText={val => UpdateGrowthRecord(growthRecord, setGrowthRecord, {[key]: val})}
                                            />

                                )
                            }
                        </View>
                    </View>

                </View>
                <View>
                    <Text style={{color: 'red', textAlign: "left", padding: 20}}>Once submitted, a growth cannot be edited.</Text>
                </View>
                <View style={{alignItems: 'center', paddingBottom: 50}}>
                    <Button style={{flexDirection: 'row', marginTop: -15, width: 500}}
                            title="SUBMIT GROWTH"
                            onPress={() => SubmitForm(props.navigation, growthRecord)}/>

                </View>
        </View>

        </ScrollView>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    title: {
        margin: 20,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
    subtitle: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "left",
    },
    growthContainer: {
        margin: 10,
        padding: 10,
        borderColor: "black",
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    growthRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 9,
        marginBottom: 2,
    },
    rowText: {
        marginRight: 20,
    },
    inputBorder: {
        width: 500,
        borderColor: 'black',
        borderWidth: .03
    },

})
