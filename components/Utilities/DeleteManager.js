import React, { useEffect, useState, useContext, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import KeyContext from '../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';
import { BASE_URL } from '../../constants/API.js';
const fetch = require('node-fetch');

const deletionGuide = {
    Growth: {
        name: "Growth",
        previewRoute: "Growth Preview",
    },
    MaintenanceRecord: {
        name: "Maintenance Record",
        previewRoute: "Maintenance Record Preview",
    },
    Publication: {
        name: "Publication",
        previewRoute: "Publication Preview",
    },
    WaferLogEntry: {
        name: "Wafer Log Entry",
        previewRoute: "Wafer Log Entry Preview",
    }
};

const DEFAULT_TARGET = {
    type: "Growth",
    id: null,
    table: null,
    machine: null,
}

export default function DeleteManager(props) {
    const { dark, key } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    // Initialize deletion target based on whether we were navigated here by a delete button from elsewhere.
    const [deletionTarget, setTarget] = useState(props.route.params && props.route.params.toDelete ? ({...DEFAULT_TARGET, ...props.route.params.toDelete}) : DEFAULT_TARGET);
    const [waferTypes, setWaferTypes] = useState([]);
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        const get = async () => {
            const a = async () => {
                let { substrates } = await fetch(`${BASE_URL}/settings/substrates`).then(r => r.json());
                setWaferTypes(substrates.map(({ substrate }) => ({label: substrate, value: substrate})));
            }
            const b = async () => {
                let { machines } = await fetch(`${BASE_URL}/settings/machines`).then(r => r.json());
                setMachines(machines.map(machine => ({label: machine, value: machine})));
            }
            a();
            b();
        }
        get();
    }, []);
    useEffect(() => {
        setTarget({...deletionTarget, id: null});
    }, [deletionTarget.type, deletionTarget.table, deletionTarget.machine]);

    const ExecuteDeletion = async () => {
        let url = BASE_URL;
        switch(type) {
            case "Growth":
                url += `/${deletionTarget.machine}/growths/${deletionTarget.id}`;
                break;

            case "MaintenanceRecord":
                url += `/maintenance/${deletionTarget.id}`;
                break;

            case "Publication":
                url += `/publications/${deletionTarget.id}`;
                break;

            case "WaferLogEntry":
                url += `/wafers/${deletionTarget.table}/id/${deletionTarget.id}`;
        }

        let response = await fetch(url, {
            method: "DELETE",
            headers: {
                "x-api-key": key,
                "Content-Type": "application/json"
            }
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <Text>Delete an item from the database</Text>
                    <Text>Select the type of item you are attempting to remove, then enter its unique ID.</Text>
                    <RNPickerSelect
                        onValueChange={type => setTarget({...deletionTarget, type})}
                        placeholder={{}}
                        value={deletionTarget.type}
                        items={Object.keys(deletionGuide).map(type => ({label: deletionGuide[type].name, value: type}))}
                        />
                </View>
                {deletionTarget.type === "WaferLogEntry" ? (
                    <View style={styles.section}>
                        <RNPickerSelect
                            onValueChange={table => setTarget({...deletionTarget, table})}
                            placeholder={{}}
                            items={waferTypes}
                            />
                    </View>
                ) : deletionTarget.type === "Growth" ? (
                    <View style={styles.section}>
                        <RNPickerSelect
                            onValueChange={machine => setTarget({...deletionTarget, machine})}
                            placeholder={{}}
                            items={machines}
                            />
                    </View>
                ) : (<View />)}
                <View style={styles.section}>
                    <TextInput
                        style={{margin: 5, borderColor: "#CCC", borderWidth: 2}}
                        onChangeText={id => setTarget({...deletionTarget, id})}
                        value={deletionTarget.id || ""}
                        keyboardType="numeric"/>
                </View>
            </ScrollView>
        </View>
    );
}

const LocalStyles = {
    section: {
        margin: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    }
}
