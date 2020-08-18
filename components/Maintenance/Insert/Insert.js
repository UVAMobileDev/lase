// Add new maintenance records to the database

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Platform } from 'react-native';
import SelectSystem from '../../lib/forms/SelectSystem';
import SelectMember from '../../lib/forms/SelectMember';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
import { Jet, InternationalOrange, Platinum, Gainsboro, EgyptianBlue, SpaceCadet, PurpleNavy } from '../../../constants/Colors';

// When a new source input field is added, this is its default value.
const SourceDefault = {
    date: "",
    source: "",
    amount: 0,
    system: "",
}

// When a new record is being created, this is its default value.
const RecordDefault = {
    date: "",
    system: "",
    p1: "",
    p2: "",
    summary: "",
    issues: "",
    future: "",
    notes: "",
    recorder: "",
}

// Function which creates a source input box. It contains all things necessary to
//  add a source to the record.
// @index -- if the user clicks "Remove source" the program knows which array
//  element to remove.
// @state -- the current array of sources for the new record.
// @update -- the function used to update @state.
const SourceInput = (index, state, update) => (
    <View key={state[index].id} style={styles.sourceBox}>
        <TextInput  style={styles.smallTextInput}
                    onChangeText={val => UpdateSource(index, state, update, "source", val)}
                    placeholder="Source"/>
        <TextInput  style={styles.smallTextInput}
                    onChangeText={val => UpdateSource(index, state, update, "amount", parseInt(val) || 0)}
                    placeholder="Amount"/>
        <View style={{margin: 5}}>
            <Button title="Remove source"
                    color={InternationalOrange}
                    onPress={() => RemoveSource(index, state, update)}/>
        </View>
    </View>
);

// Adds a new source to the array of current sources. Count and setCount are utility
//  hooks present to ensure each new source is given a unique ID, necessary for
//  the FlatList to ensure it can keep track of what it's rendering.
const AddSource = (state, update, count, setCount, record) => {
    let src = Object.assign({}, SourceDefault, {date: record.date, system: record.system});
    src.id = `${count}`;
    update(state.concat([src]));
    setCount(count + 1);
}

// Updates a source by changing a particular field to a particular value on the
//  index^th source in the array of sources (state).
const UpdateSource = (index, state, update, field, value) => {
    let new_version = state.concat([]);
    new_version[index][field] = value;
    update(new_version);
}

// Removes a source from the array of sources via index comparison.
const RemoveSource = (index, state, update) => {
    update(state.filter((_, i) => i !== index));
}

// Modified a field in the new record. If the field is one which is shared with
//  sources, like date or system, then it propagates the change to all sources
//  as well.
const UpdateRecord = (state, update, updateDict, sources, setSources) => {
    let new_version = Object.assign({}, state, updateDict);

    if(sources.length > 0 && (updateDict.system || updateDict.date)) {
        // Either the system or date of the record changed. Update the source(s)
        let new_sources = sources.concat([]);
        new_sources.forEach(src => {
            console.log(src);
            src.system = new_version.system;
            src.date = new_version.date;
        });
        setSources(new_sources);
    }

    update(new_version);
}

// Creates a properly formatted body and sends a PUT request to the API. When the
//  API responds, we navigate to the "Browse" tab, then open the newly created record!
const SubmitForm = async (nav, record, sources) => {
    // Source entries carry an id (required by React). We don't want them here.
    let clean_sources = sources.map(src => {
        return {date: src.date,
        system: src.system,
        amount: src.amount,
        source: src.source};
    });

    // Send PUT request
    let response = await fetch(`${BASE_URL}/maintenance`, {
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
    nav.navigate("Browse", {
        screen: "Record",
        params: {record}
    });
}

export default function Insert(props) {
    // Hooks for storing the state of the record's fields, sources and their fields,
    //  and an integer for ensuring unique ids for elements in the sources array.
    const [record, setRecord] = useState(Object.assign({}, RecordDefault));
    const [sources, setSources] = useState([]);
    const [count, setCount] = useState(1);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Create a new maintenance record</Text>
                <Text style={styles.subtitle}>Record details</Text>
                <View style={styles.recordContainer}>
                    <SelectSystem   update={system => UpdateRecord(record, setRecord, {system}, sources, setSources)}
                                    placeholder={{label: "Select a System...", value: "Echo"}}/>
                    <SelectMember   update={recorder => UpdateRecord(record, setRecord, {recorder}, sources, setSources)}
                                    placeholder={{label: "Select a Recorder...", value: ""}}/>
                    <TextInput  style={styles.smallTextInput}
                                onChangeText={val => UpdateRecord(record, setRecord, {date: val}, sources, setSources)}
                                placeholder="Date (YYMMDD)"/>
                    <SelectMember   update={p1 => UpdateRecord(record, setRecord, {p1}, sources, setSources)}
                                    placeholder={{label: "Select P1...", value: ""}}/>
                    <SelectMember   update={p2 => UpdateRecord(record, setRecord, {p2}, sources, setSources)}
                                    placeholder={{label: "Select P2...", value: ""}}/>
                    <TextInput  style={styles.largeTextInput}
                                onChangeText={val => UpdateRecord(record, setRecord, {summary: val}, sources, setSources)}
                                multiline={true}
                                numberOfLines={8}
                                placeholder="Summary"/>
                    <TextInput  style={styles.largeTextInput}
                                onChangeText={val => UpdateRecord(record, setRecord, {issues: val}, sources, setSources)}
                                multiline={true}
                                numberOfLines={5}
                                placeholder="Issues"/>
                    <TextInput  style={styles.largeTextInput}
                                onChangeText={val => UpdateRecord(record, setRecord, {future: val}, sources, setSources)}
                                multiline={true}
                                numberOfLines={5}
                                placeholder="Future"/>
                    <TextInput  style={styles.largeTextInput}
                                onChangeText={val => UpdateRecord(record, setRecord, {notes: val}, sources, setSources)}
                                multiline={true}
                                numberOfLines={5}
                                placeholder="Notes"/>
                </View>
                <View style={{alignItems: "center"}}>
                    <Text style={styles.subtitle}>Add any sources that should go with this record</Text>
                    <View style={{width: 200}}>
                        <Button     title="Add Source"
                                    color={PurpleNavy}
                                    onPress={() => AddSource(sources, setSources, count, setCount, record)}/>
                    </View>
                </View>
                <View style={sources.length > 0 ? styles.sourcesContainer : {}}>
                    {sources.map((source, index) => SourceInput(index, sources, setSources, record))}
                </View>
                <View style={styles.submitArea}>
                    <Text style={styles.submitWarning}>Once submitted, a record and its sources cannot be edited.</Text>
                    <Button title="Submit"
                            color={EgyptianBlue}
                            onPress={() => SubmitForm(props.navigation, record, sources)}/>
                </View>
                <View style={{height: 250}}/>
            </ScrollView>
        </View>
    );
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Jet,
    },
    title: {
        margin: 20,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        color: Gainsboro,
    },
    subtitle: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "left",
        color: Gainsboro,
    },
    recordContainer: {
        margin: 10,
        padding: 10,
        borderColor: Platinum,
        borderBottomWidth: 1,
    },
    smallTextInput: {
        margin: 5,
        padding: 5,
        borderColor: Platinum,
        borderLeftWidth: 2,
        borderRadius: 5,
        color: Gainsboro,
    },
    largeTextInput: {
        margin: 5,
        padding: 5,
        borderColor: Platinum,
        borderLeftWidth: 2,
        borderRadius: 5,
        color: Gainsboro,
    },
    sourcesContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10,
        padding: 10,
    },
    sourceBox: {
        margin: 10,
        padding: 3,
        borderColor: Platinum,
        borderWidth: 1,
        borderRadius: 8,
        width: Platform.OS === "web" ? 233 : "90%",
        justifyContent: Platform.OS === "web" ? "flex-start" : "center",
    },
    submitArea: {
        marginTop: 25,
        margin: 10,
        padding: 20,
        borderColor: Platinum,
        borderTopWidth: 1,
        alignItems: "center",
    },
    submitWarning: {
        color: Gainsboro,
        textAlign: "center",
        fontStyle: "italic",
        padding: 5,
    }
});
