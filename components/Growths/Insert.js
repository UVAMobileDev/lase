import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button, TextInput } from 'react-native';
import { BASE_URL } from '../../constants/API.js';
import SelectSystem from '../lib/forms/SelectSystem';
import SelectMember from '../lib/forms/SelectMember';
import { API_KEY } from '../../keys';
const fetch = require("node-fetch");
const moment = require("moment");
import { AntDesign, EvilIcons } from '@expo/vector-icons';

//adding a growth should be tied to a sampleID

const Default = {
    date: "",               // Reserved

    growthNum: "",          // Sample Description
    substrate: "",          // Sample Description
    substrateSize: "",      // Sample Description
    machine: "",            // Sample Description
    grower: "",             // Sample Description


    PyroDeox: "",           // Deox
    TCDeox: "",             // Deox
    PyroGrowth: "",         // Deox
    TCGrowth: "",           // Deox


    HVP: "",                // Deox
    PyroOffset: "",         // Deox

    Description: "",        // Sample Description

    GCPressure: "",         // STO Temp
    BFBackground: "",       // STO Temp
    Ga_Tip: "",             // STO Temp
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
    GaP_Temp: "",
    GaP_Flux: "",
    B_Temp: "",
    B_Flux: "",             // STO Temp

    waferTracked: "",       // Sample Description
}

const MATERIAL_DEFAULTS = {
    Echo: {
        Name: "",
    },
    Bravo: {
        Name: "",
    }
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

export default function AddGrowth(props) {
    const [machineSources, setMSS] = useState([]);

    // The value determines which entry area / material is currently shone
    const [view, updateView] = useReducer((state, {section, value}) => ({...state, [section]: value}), {
        top: 0,
        bottom: -1,
    });

    const [materials, dispatchMaterials] = useReducer((state, action) => {
        // Deep copy the current state
        let nextState = state.concat([]);
        switch(action.type) {
            // Update some aspect of a particular material
            case "update":
                nextState[action.src][action.key] = action.value;
                break;

            // Switch the location of a pair of materials
            case "reorder":
                let dst = nextState[action.dst];
                nextState[action.dst] = nextState[action.src];
                nextState[action.src] = dst;
                break;

            // Add a new material by inserting the default for the current machine
            // Random and *hopefully* unique key is generated for managing the layer
            case "insert":
                nextState.push(Object.assign({}, MATERIAL_DEFAULTS[action.machine], {
                    key: parseInt(Math.random() * 10000),
                }));
                break;

            case "remove":
                if(view.bottom >= action.index && !(state.length > 1 && view.bottom === 0 && action.index === 0)) updateView({section: "bottom", value: view.bottom - 1});
                nextState.splice(action.index, 1);
                break;
        }
        return nextState;
    }, []);

    const [form, updateForm] = useReducer((state, {key, value}) => ({...state, [key]: value}), {
        sampleID: props.route.params.sampleID,
        date: moment().format("YYYY-MM-DD"),
        machine: "",
    });

    useEffect(() => {
        // Set screen title
        props.navigation.setOptions({
            title: `Add Growth to ${props.route.params.sampleID}`,
        });

        const load_sources = async () => {
            let machines = await fetch(`${BASE_URL}/settings/machines`).then(async r => (await r.json()).machines);
            let sources = await Promise.all(machines.map(async m => ({
                machine: m,
                sources: await fetch(`${BASE_URL}/machine/${m}/sources`).then(async r => (await r.json()).sources),
            })));
            setMSS(sources.concat([{
                machine: "",
                sources: [],
            }]));
        }
        load_sources();

    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Main data entry */}
                <View style={styles.mainDataEntry}>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity style={[styles.tabButton, view.top === 0 ? {backgroundColor: "#ADD"} : {}]}
                            onPress={() => updateView({section: "top", value: 0})}>
                            <Text>Sample Description</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabButton, view.top === 1 ? {backgroundColor: "#ADD"} : {}]}
                            onPress={() => updateView({section: "top", value: 1})}>
                            <Text>STO Temps</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabButton, view.top === 2 ? {backgroundColor: "#ADD"} : {}]}
                            onPress={() => updateView({section: "top", value: 2})}>
                            <Text>Deox</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: view.top === 0 ? "" : "none"}}>
                        <Text>Sample ID: {props.route.params.sampleID}</Text>
                        <SelectSystem update={value => updateForm({key: "machine", value})}
                            placeholder={{label: "Select a System..." , value:  ""}}/>
                        <Text>### Substrate selection</Text>
                        <Text>### Growth number</Text>
                        <SelectMember update={value => updateForm({key: "grower", value})}
                            placeholder={{label: "Select a Grower...", value: ""}}/>
                        <Text>### Untracked wafer?</Text>
                        <Text>Date: {form.date}</Text>
                        <Text>### Description</Text>
                    </View>

                    <View style={{display: view.top === 1 ? "" : "none"}}>
                        <Text>STO Temperatures and Fluxes</Text>
                        {machineSources.length > 0 ? machineSources.find(({machine}) => machine === form.machine).sources.filter(({sto, active}) => sto && active).map(src => (
                            <View key={src.id}>
                                <Text>{src.source}</Text>
                                {src.tip ? (<Text>### Tip: {src.tip_idle || 0}</Text>): (<View/>)}
                                {src.base ? (<Text>### Base: {src.base_idle || 0}</Text>): (<View/>)}
                                {src.idle_temp ? (<Text>### Temp: {src.idle_temp}</Text>): (<View/>)}
                                {src.flux ? (<Text>### BEP: {src.flux_idle || 0}</Text>): (<View/>)}
                            </View>
                        )) : (<View/>)}
                        <Text>Group Vs</Text>
                        {machineSources.length > 0 ? machineSources.find(({machine}) => machine === form.machine).sources.filter(({crk, valve}) => crk && valve).map(src => (
                            <View key={src.id}>
                                <Text>{src.source}</Text>
                                <Text>### Sublimator Temp: {src.sub_idle || 0}</Text>
                                <Text>### Cracker Temp: {src.crk_idle || 0}</Text>
                            </View>
                        )) : (<View/>)}
                    </View>

                    <View style={{display: view.top === 2 ? "" : "none"}}>
                        <Text>### HVP Power</Text>
                        <Text>### Pyro Current Offset</Text>
                        <Text>### Pryo Detox</Text>
                        <Text>### Thermocouple Deox</Text>
                    </View>
                </View>

                {/* Layer entry area */}
                {form.machine !== "" ? (
                <View>
                    <Text>Add new layer material</Text>
                    <TouchableOpacity
                        onPress={() => dispatchMaterials({type: "insert", machine: form.machine})}>
                        <AntDesign name="pluscircleo" size={24} color="black" />
                    </TouchableOpacity>
                    <Text>{materials.length}</Text>
                    <Text>{view.bottom}</Text>
                    {materials.map((mat, i) => (
                        <View key={mat.key} style={{flexDirection: "row"}}>
                            {i > 0 ? (<TouchableOpacity
                                onPress={() => null}>
                                <AntDesign name="up" size={24} color="black" />
                            </TouchableOpacity>): (<View/>)}
                            {i < materials.length - 1 ? (<TouchableOpacity
                                onPress={() => null}>
                                <AntDesign name="down" size={24} color="black" />
                            </TouchableOpacity>): (<View/>)}
                            <TouchableOpacity
                                onPress={() => dispatchMaterials({type: "remove", index: i})}>
                                <EvilIcons name="trash" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => updateView({section: "bottom", value: i})}>
                                {console.log(mat)}
                                <TextInput
                                    placeholder="Layer name"
                                    onChangeText={name => dispatchMaterials({
                                        type: "update", key: "Name", value: name, src: i})}
                                    value={mat.Name}/>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                ): (
                <View>
                    <Text>You must select a system in order to add new layers, since layers are system-dependent.</Text>
                </View>
                )}
            </ScrollView>

            <View style={{alignItems: 'center', paddingBottom: 50}}>
                <Text style={{color: 'red', textAlign: "left", padding: 20}}>Once submitted, a growth cannot be edited.</Text>
                <Button style={{flexDirection: 'row', marginTop: -15, width: 500}}
                    title="SUBMIT GROWTH"
                    onPress={() => SubmitForm(props.navigation, growthRecord)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainDataEntry: {
        marginHorizontal: 10,
        marginBottom: 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#CCC",
    },
    tabButton: {
        flex: 1,
        backgroundColor: "#44F",
        padding: 5,
        margin: 5,
        borderRadius: 5,
    },
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
