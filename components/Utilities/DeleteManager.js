import React, { useEffect, useState, useContext, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import KeyContext from '../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';
import { BASE_URL } from '../../constants/API.js';
const fetch = require('node-fetch');

import LogEntry from './WaferUtils/LogEntry';
import GrowthDetails from '../Growths/GrowthDetails';
import Record from '../Maintenance/Find/Record';
import ViewPublication from '../Publications/View/ViewPublication';

const deletionGuide = {
    Growth: {
        name: "Growth",
        fetchResponseKey: "results",
        component: GrowthDetails,
    },
    MaintenanceRecord: {
        name: "Maintenance Record",
        fetchResponseKey: "records",
        component: Record,
    },
    Publication: {
        name: "Publication",
        fetchResponseKey: "publications",
        component: ViewPublication,
    },
    WaferLogEntry: {
        name: "Wafer Log Entry",
        fetchResponseKey: "entries",
        component: LogEntry,
    }
};

const DEFAULT_TARGET = {
    type: "Growth",
    id: null,
    table: "SIGaAs",
    machine: "Bravo",
}

export default function DeleteManager(props) {
    const { dark, key } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const givenID = props.route.params && props.route.params.toDelete ? props.route.params.toDelete.id : null;

    useEffect(() => {
        setTarget(props.route.params && props.route.params.toDelete ? ({...DEFAULT_TARGET, ...props.route.params.toDelete}) : DEFAULT_TARGET);
    }, [givenID]);

    // Initialize deletion target based on whether we were navigated here by a delete button from elsewhere.
    const [deletionTarget, setTarget] = useState(DEFAULT_TARGET);
    // const [deletionTarget, setTarget] = useState(props.route.params && props.route.params.toDelete ? ({...DEFAULT_TARGET, ...props.route.params.toDelete}) : DEFAULT_TARGET);
    const [previewData, setPreviewData] = useState(null);
    const [waferTypes, setWaferTypes] = useState([]);
    const [machines, setMachines] = useState([]);

    function ExecuteDeletion(skip) {
        let url = BASE_URL;
        switch(deletionTarget.type) {
            case "Growth":
                if(skip) return url + `/machine/${deletionTarget.machine}/growths?id=${deletionTarget.id}`;
                url += `/machine/${deletionTarget.machine}/${deletionTarget.id}`;
                break;

            case "MaintenanceRecord":
                if(skip) return url + `/maintenance?RecordID=${deletionTarget.id}`;
                url += `/maintenance/${deletionTarget.id}`;
                break;

            case "Publication":
                if(skip) return url + `/publications?id=${deletionTarget.id}`;
                url += `/publications/${deletionTarget.id}`;
                break;

            case "WaferLogEntry":
                if(skip) return url + `/wafers/${deletionTarget.table}?id=${deletionTarget.id}`;
                url += `/wafers/${deletionTarget.table}/id/${deletionTarget.id}`;
        }

        const f = async () => {
            let { statusCode } = await fetch(url, {
                method: "DELETE",
                headers: {
                    "x-api-key": key,
                    "Content-Type": "application/json"
                }
            }).then(r => r.json());
            if(statusCode == 200) {
                window.alert("Successfully deleted item");
                setTarget({...deletionTarget, id: null});
            } else window.alert("A problem occurred during deletion");
        }
        f();
    }

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
    useEffect(() => {
        if(deletionTarget.id) {
            setPreviewData(null);
            const url = ExecuteDeletion(true);
            const f = async () => {
                let response = await fetch(url, {
                    method: "GET",
                    headers: { "x-api-key": key }
                }).then(r => r.json());
                if(response.statusCode != 200) {
                    setPreviewData(null);
                    return;
                };

                const data = response[deletionGuide[deletionTarget.type].fetchResponseKey][0];
                setPreviewData(data || null);
            }
            f();
        }
    }, [deletionTarget.id]);

    function preview() {
        const Comp = deletionGuide[deletionTarget.type].component;
        let route = {params: {}};
        switch(deletionTarget.type) {
            case "Growth":
            route.params.growth = previewData;
            route.params.sampleID = previewData.id;
            return (<Comp route={route} />);

            case "MaintenanceRecord":
            route.params.record = previewData;
            return (<Comp route={route} navigation={{setOptions: () => true}}/>);

            case "Publication":
            route.params.publication = previewData;
            return (<Comp route={route}/>);

            case "WaferLogEntry":
            return (<Comp data={previewData}/>);
        }
    }

    return (
        <View style={[styles.container, styles.componentBackground]}>
            <ScrollView>
                <View style={[styles.componentBackground,styles.section]}>
                    <Text style = {styles.lblColorized}>Delete an item from the database</Text>
                    <Text style = {styles.lblColorized}>Select the type of item you are attempting to remove, then enter its unique ID.</Text>
                </View>
                <View style={[styles.componentBackground,styles.section]}>
                    <View style={styles.formRow}>
                        <Text style={styles.lblFormLabel}>Item Type</Text>
                        <View style={styles.widthLimiter}>
                            <RNPickerSelect
                                onValueChange={type => setTarget({...deletionTarget, type})}
                                placeholder={{}}
                                value={deletionTarget.type}
                                items={Object.keys(deletionGuide).map(type => ({label: deletionGuide[type].name, value: type}))}
                                />
                        </View>
                    </View>
                </View>
                {deletionTarget.type === "WaferLogEntry" ? (
                    <View style={[styles.componentBackground, styles.section]}>
                        <View style={styles.formRow}>
                            <Text style={styles.lblFormLabel}>Table Selection</Text>
                            <View style={styles.widthLimiter}>
                                <RNPickerSelect
                                    onValueChange={table => setTarget({...deletionTarget, table})}
                                    placeholder={{}}
                                    items={waferTypes}
                                    />
                            </View>
                        </View>
                    </View>
                ) : deletionTarget.type === "Growth" ? (
                    <View style={[styles.componentBackground, styles.section]}>
                        <View style={styles.formRow}>
                            <Text style={styles.lblFormLabel}>Target Machine</Text>
                            <View style={styles.widthLimiter}>
                                <RNPickerSelect
                                    onValueChange={machine => setTarget({...deletionTarget, machine})}
                                    placeholder={{}}
                                    items={machines}
                                    />
                            </View>
                        </View>
                    </View>
                ) : (<View />)}
                <View style={[styles.componentBackground, styles.section]}>
                    <View style={styles.formRow}>
                        <Text style={styles.lblFormLabel}>Target ID</Text>
                        <View style={styles.widthLimiter}>
                            <TextInput
                                style={[styles.txt, styles.idInput]}
                                onChangeText={id => setTarget({...deletionTarget, id})}
                                value={deletionTarget.id ? `${deletionTarget.id}` : ""}
                                keyboardType="numeric"/>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.btnDelete}
                        onPress={() => ExecuteDeletion()}
                        >
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>Delete Item</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.preview}>
                    <View style={{alignItems: "center"}}>
                        <Text style={[styles.lblColorized, styles.titleText]}>Target Preview</Text>
                    </View>
                    {previewData && deletionTarget.id ? preview() : (
                        <View style={{alignItems: "center"}}>
                            <Text style = {styles.lblColorized}>Enter a valid deletion target to see a preview here.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const LocalStyles = {
    btnDelete: {
        borderRadius: 5,
        width: "100%",
        maxWidth: 250,
        margin: 5,
        padding: 15,
        backgroundColor: "#F33",
        alignItems: "center",
    },
    widthLimiter: {
        flex: 1,
        maxWidth: 250,
    },
    idInput: {
        margin: 5,
        borderColor: "#CCC",
        borderWidth: 2,
        maxWidth: 250,
    },
    formLabel: {
        marginRight: 10,
        fontSize: 16,
    },
    formRow: {
        flexDirection: "row",
        paddingVertical: 5,
        alignItems: "center",
    },
    titleText: {
        fontSize: 20,
    },
    preview: {
        margin: 5,
        padding: 5,
        borderColor: "#000",
        borderTopWidth: 2,
    },
    section: {
        margin: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    }
}
