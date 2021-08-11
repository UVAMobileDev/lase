import React, { useState, useEffect, useReducer, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { LightStyles, DarkStyles, Colors } from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';
import moment from 'moment';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import LogHistory from './LogHistory';
import RNPickerSelect from 'react-native-picker-select';
const fetch = require("node-fetch");

// all substrates https://api.lase.mer.utexas.edu/v1/settings/substrates
// wafer log https://api.lase.mer.utexas.edu/v1/wafers/${sub}


const WEEKS = 8;
const PREDICTIONS = [2, 4, 8];
const LOW_STOCK = {
    default: 12.5,
    SIGaAs: 30,
    nGaSb: 30,
};
const REASONS = [
    {label: "Add", value: "add"},
    {label: "Growth", value: "growth"},
    {label: "Non-growth", value: "non-growth"},
    {label: "Reconcile", value: "reconcile"}
];

const onWeb = Platform.OS === "web";
const Stack = createStackNavigator();

export default function WaferLog(props) {
    return (
        <Stack.Navigator >
            < Stack.Screen name="Overview" component={WaferLogOverview} options={{headerShown: false}}/>
                <Stack.Screen name="Full Log History" component={LogHistory}/>
        </Stack.Navigator>
    );
}

function WaferLogOverview(props) {
    const { dark, key } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    // The set of substrates available in the database
    const [substrates, setSubstrates] = useState([]);
    // The substrate the user is currently viewing the details of
    const [selected, select] = useState(null);
    // Data about the substrate's log entries, including the current
    // stock, recent weekly deltas, and future usage predictions
    const [log, updateLog] = useState({});

    // Whether the logs for all substrates has been loaded.
    const [fullyLoaded, setLoaded] = useState(false);

    const [insertingLogEntry, setILE] = useState(false);
    const SubmitForm = async ({reason, amount}) => {
        if((!reason || !parseFloat(amount)) && parseFloat(amount) !== 0) {
            window.alert("Select a reason and provide a valid delta.");
            return;
        }
        try {
            setILE(true);
            let response = await fetch(`${BASE_URL}/wafers/${selected}`, {
                method: "PUT",
                headers: {
                    "x-api-key": key,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    entry: {
                        timestamp: new Date(),
                        wafers_added: amount,
                        notes: reason
                    }
                })
            });
            let { statusCode } = await response.json();
            if(statusCode != 200) throw new Exception();
        } catch(err) {
            console.error(err);
        } finally {
            setILE(false);
            // inserted id = parsed.id
            updateLog({...log, ...(await loadCountAndRecent(selected))});
        }
    }
    const [insertForm, dispatchForm] = useReducer((state, {action, payload}) => {
        if(action == "reset") return {};
        if(action == "submit") {
            SubmitForm(state);
            return state;
        }
        return {...state, [payload.key]: payload.value};
    }, {reason: "", amount: 0});

    const SubstrateRow = (id, name, size, count, extraStyles, blockStyles) => (
        <View style={[styles.substrateRow, blockStyles]} key={id}>
        <Text style={[styles.lblColorized, styles.rowItem, {width: 125}, extraStyles]}>{name}</Text>
        <Text style={[styles.lblColorized, styles.rowItem, {width: 75}, extraStyles]}>{size}</Text>
        <Text style={[styles.lblColorized, styles.rowItem, {width: 75}, extraStyles]}>{count}</Text>
        </View>
    );

    // Fetches the list of substrates
    useEffect(() => {
        const load = async () => {
            let response = await fetch(`${BASE_URL}/settings/substrates`).then(r => r.json());
            setSubstrates(response.substrates.map(({id, size, substrate}) => ({id, size, name: substrate})));
        }
        load();
    }, []);

    // If the user has selected a previously unselected substrate,
    // fetch + calculate the data we need to show
    useEffect(() => {
        dispatchForm({action: "reset"});
        // Do nothing if there is not a selection, or
        // if we've already fetched and calculated this
        // substrate's log, do not do it again.
        if(fullyLoaded || !selected || log[selected]) return;
        const doLoad = async () => {
            updateLog({...log, ...(await loadCountAndRecent(selected))});
        }
        doLoad();
    }, [selected]);

    // If the log contains as many entries as there are substrates, the wafer log is fully loaded.
    useEffect(() => {
        if(Object.keys(log).length === substrates.length && substrates.length > 0) setLoaded(true);
    }, [log]);

    // Calcualtes the count and recent log data for the given wafer selection, sel
    const loadCountAndRecent = async sel => {
        // Fire off request for recent log entries while the count operation goes to work
        const recents = async () => {
            let r = [], page = 0;
            while(true) {
                let res = await fetch(`${BASE_URL}/wafers/${sel}/recent/${WEEKS * 7}?page=${page}`).then(r => r.json());
                if(res.entries.length === 0) break;
                r = r.concat(res.entries);
                page++;
            }
            return r;
        }
        let recent = recents();

        // Load wafer log entries until we've loaded the entire list, or we've found a reconciliation entry.
        let searchPage = 0, entries = [], baseAmount = 0;
        while(searchPage !== -1) {
            let response = await fetch(`${BASE_URL}/wafers/${sel}?page=${searchPage}`).then(r => r.json());
            // If there are no more log entries, we reached the beginning
            // of the substrate's history without a reconciliation record.
            if(response.entries.length === 0) {
                searchPage = -1;
                break;
            }

            // Calculate the index of the first reconciliation record, if it exists
            let reconcileIndex = response.entries.reduce((acc, cur, i) => (isNaN(acc) && cur.notes === "reconcile") ? i : acc, undefined);
            if(!isNaN(reconcileIndex)) {
                // Reconciliation record is present. Splice the two
                // arrays while removing entries after the reconciliation
                baseAmount = response.entries[reconcileIndex].wafersAdded;
                entries = entries.concat(response.entries.slice(0, reconcileIndex).map(({wafersAdded}) => wafersAdded));
                searchPage = -1;
            } else {
                // No reconciliation record is present
                entries = entries.concat(response.entries.map(({wafersAdded}) => wafersAdded));
                searchPage++;
            }
        }
        // Count the number of wafers currently in stock,
        // starting at either 0 or the reconciliation amount.
        let waferCount = entries.reduce((acc, cur) => acc + cur, baseAmount);

        // Wait for the request for recent entries to complete before going any further
        recent = await recent;

        // Break the entries into their respective weeks
        let m = moment();
        let blocks = [...Array(WEEKS)].map((_, i) => {
            let startDate = moment(m).subtract((i + 1) * 7, 'day'), endDate = moment(m).subtract(i * 7, 'day');
            return recent.filter(({timestamp}) => {
                let stamp = moment(timestamp);
                return stamp > startDate && stamp < endDate;
            });
        });

        // Calculate deltas over each 1 week period
        let weeks = blocks.map(week => {
            if(week.length === 0) return 0;
            let delta = 0;
            for(let i = 0; i < week.length; i++) { // entries are ordered most to least recent...
                // Delta calcluations break down if a reconcile entry is counted
                if(week[i].notes === "reconcile") break;
                if(week[i].wafersAdded < 0) delta += week[i].wafersAdded;
            }
            return delta;
        });

        // If we have a negative stock, there's no point in calculating usage predictions...
        if(waferCount < 0) var usagePrediction = PREDICTIONS.map(num => [num, "Negative supply"]);
        else {
            // Calculate number of weeks the current supply can
            // last using the rates defined at the top of the file.
            var usagePrediction = [], upi = 0, deltaSum = 0;
            for(let i = 1; i <= weeks.length; i++) {
                deltaSum += weeks[i- 1];
                // Keep moving forward until we find the first requested rate.
                if(i === PREDICTIONS[upi]) {
                    // If the delta is zero so far, the substrate
                    // has not been used in this time period.
                    if(deltaSum !== 0) {
                        let weeksRemaining = -waferCount / (deltaSum / i);

                        // Convert the exact usage definition into
                        // something more readable and user friendly
                        if(weeksRemaining > 55) var supply = "More than 1 year";
                        else if(weeksRemaining > 50) var supply = "About 1 year";
                        else if(weeksRemaining > 8) var supply = `More than ${parseInt(weeksRemaining / 4.33)} months`;
                        else var supply = `${parseInt(weeksRemaining)} weeks`;
                    } else var supply = "Substrate not used";
                    usagePrediction.push([i, supply]);
                    upi++;
                }
            }
        }

        // Return the results of the calculations
        return {
            [sel]: {
                count: waferCount.toFixed(2),
                weeks,
                usagePrediction,
            }
        }
    }

    // Wrapper function for loadCountAndRecent which loads all currently unloaded wafer data
    const loadAllWafers = () => {
        setLoaded(true);
        const loaded = Object.keys(log);
        let toLoad = substrates.filter(substrate => !loaded.includes(substrate.name)).map(({name}) => name);
        const do_loading = async () => {
            let responses = await Promise.all(toLoad.map(async substrate => await loadCountAndRecent(substrate)));
            updateLog(Object.assign({}, log, responses.reduce((acc, cur) => Object.assign(acc, cur))));
        }
        do_loading();
    }

    let substrate = log[selected];
    let stock_alert = substrate && substrate.count < (LOW_STOCK[selected] || LOW_STOCK.default);

    return (
        <View style={styles.componentBackground}>
            <ScrollView>
                <View style={[styles.componentBackground, styles.headerWrapper]}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.lblSecondaryHeading, styles.header]}>Click a substrate to view details</Text>
                        <Text style={[styles.lblColorized, {margin: 4}]}>Selecting a substrate will dynamically load and calculate its log information (count, weekly deltas, and usage predictions). Once loaded, a substrate's wafer count will appear in the table.</Text>
                    </View>
                    {fullyLoaded ? (<View/>) : (
                        <View style={{flex: 1}}>
                            <TouchableOpacity style={[styles.screenContainer, styles.loadAllButton]} onPress={loadAllWafers}>
                                <Text style={styles.buttonLabel}>Load all wafers</Text>
                            </TouchableOpacity>
                            <Text style={[styles.lblColorized, {margin: 4}]}>If you need to view all wafer counts at once, click this button to load all wafer data immediately and avoid clicking each substrate individually.</Text>
                        </View>
                    )}
                </View>
                <View style={[styles.componentBackground, styles.platformOrienter]}>
                    <View style={styles.substrateTable}>
                        {SubstrateRow(-1, "Substrate", "Size", "Count", {fontWeight: "bold"}, {borderWidth: 0, borderBottomWidth: 1, borderRadius: 0, borderStyle: "solid"})}
                        {substrates.length === 0 ? (<ActivityIndicator/>) : substrates.map(({id, name, size}) => (
                            <TouchableOpacity key={id}
                                    onPress={() => select(name)}>
                                {SubstrateRow(id, name, `${size}-inch`, log[name] ? log[name].count : "", {}, name === selected ? {borderColor: "#44f", borderStyle: "solid"} : {})}
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.substrateDetails}>
                        {selected !== null ? substrate !== undefined ? (
                            <View>
                                <View style={[styles.componentBackground, styles.detailSection]}>
                                    <Text style={[styles.lblSecondaryHeading, styles.detailHeader]}>
                                        <Text> Details for </Text>
                                        <Text style={{fontWeight: "bold"}}>{selected} </Text>
                                    </Text>
                                </View>

                                <View style={[styles.componentBackground, styles.detailSection]}>
                                    <Text style={[styles.lblSecondaryHeading, styles.detailHeader, {flexDirection: "row"}]}>
                                        <Text>Current Stock  </Text>
                                        {stock_alert ? (
                                            <Text style={[styles.lblColorized,{fontSize: 15, color: "#ffa100"}]}>
                                                <Entypo name="warning" size={17} color="#ffa100" />
                                                <Text> Low supply</Text>
                                            </Text>
                                            ) : (<View/>)}
                                    </Text>
                                    <Text style={[styles.lblColorized, {fontWeight: "bold", fontSize: 15}]}>{substrate.count} wafers</Text>
                                    {substrate.count <= 0 ? (
                                        <Text style={[styles.lblColorized,styles.alert]}>Wafer is out of stock or in need of supply reconciliation</Text>
                                    ) : (<View/>)}
                                </View>
                                <View style={[styles.componentBackground, styles.detailSection]}>
                                    <Text style={[styles.lblSecondaryHeading, styles.detailHeader]}>Weekly Usage Stats</Text>
                                    {substrate.weeks.map((delta, i) => (<Text style={[styles.lblColorized]} key={i}>Week {i + 1}: {delta}</Text>))}
                                </View>
                                <View style={[styles.componentBackground, styles.detailSection]}>
                                    <Text style={[styles.lblSecondaryHeading, styles.detailHeader]}>Supply Predictor</Text>
                                    {
                                        substrate.usagePrediction.map(([num, duration], i) => <Text style={[styles.lblColorized]} key={i}>{num}-week rate: {duration}</Text>)
                                    }
                                </View>
                                <View style={[styles.componentBackground, styles.detailSection]}>
                                    <Text style={[styles.lblSecondaryHeading, styles.detailHeader]}>Add Log Entry</Text>
                                    <Text style={[styles.lblColorized]}>New log entries have two components: reason and amount. Reasons for new entries are 'add', 'growth', 'non-growth', and 'reconcile', corresponding to the addition of new wafers into the system, the usage of wafers for growths, usage of wafers not for growths, and a reconciliation of physical inventory, respectively. Amount refers to the number of new wafers, used wafers, or the actual physical inventory value, depending on reason.</Text>
                                    <View style={styles.labelRow}>
                                        <Text style={[styles.lblFormLabel ,styles.labelText]}>Reason</Text>
                                        <RNPickerSelect
                                            InputAccessoryView={() => null}
                                            placeholder={{label: "...", value: ""}}
                                            items={REASONS}
                                            value={insertForm.reason}
                                            onValueChange={val => dispatchForm({action: "set", payload: {key: "reason", value: val}})}
                                            />
                                    </View>
                                    <View style={styles.labelRow}>
                                        <Text style={[styles.lblFormLabel, styles.labelText]}>Amount</Text>
                                        <TextInput style={[styles.lblColorized,styles.textinput]}
                                            placeholder="Enter delta value"
                                            keyboardType="numeric"
                                            onChangeText={val => dispatchForm({action: "set", payload: {key: "amount", value: parseFloat(val)}})}
                                            value={`${insertForm.amount}`}
                                            />
                                    </View>
                                    {insertingLogEntry ? (<ActivityIndicator style={{margin: 25}}/>) : (
                                        <TouchableOpacity style={[styles.componentBackground,styles.submitLogEntry]}
                                            onPress={() => dispatchForm({action: "submit"})}>
                                            <Text style={[styles.lblColorized,styles.buttonLabel]}>Submit New Log Entry</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={[styles.detailSection, {borderWidth: 0, marginBottom: 140}]}>
                                    <TouchableOpacity style={styles.fullLogButton}
                                            onPress={() => props.navigation.navigate("Full Log History", {substrate: selected})}>
                                        <Text style={styles.buttonLabel}>View Full {selected} Log</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (<ActivityIndicator style={{marginBottom: 140}}/>) : (<View style={{marginBottom: 140}}/>)}
                        <View style={{position: "absolute", left: 0, bottom: 0}}>
                            <Text style={[styles.lblColorized,styles.detailSubheader]}>Supply calculation based on delta since most recent wafer reconciliation, or initial count of zero.</Text>
                            <Text style={[styles.lblColorized,styles.detailSubheader]}>Weekly usage figures based on negative wafer transactions during the given week.</Text>
                            <Text style={[styles.lblColorized,styles.detailSubheader]}>Stock prediction based on the combined deltas from the past n weeks, divided evenly across each week, which are extrapolated across future weeks.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const LocalStyles = {
    labelText: {
        marginRight: 10,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
    },
    submitLogEntry: {
        backgroundColor: "#00FF00",
        margin: 5,
        padding: 10,
        alignItems: "center",
        width: "50%",
    },
    textinput: {
        margin: 5,
        padding: 5,
        borderColor: "#CCC",
        borderWidth: 2,
    },
    buttonLabel: {
        color: "white",
        fontSize: 16
    },
    fullLogButton: {
        backgroundColor: "#44F",
        margin: 5,
        padding: 10,
        alignItems: "center",
    },
    loadAllButton: {
        backgroundColor: "#44F",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    alert: {
        color: "#F00",
    },
    detailHeadline: {
        fontSize: 19,
        textAlign: "center",
    },
    detailSubheader: {
        fontSize: 15,
        textAlign: "center",
    },
    detailHeader: {
        fontSize: 17,
        textAlign: "center",
    },
    detailSection: {
        margin: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: "#CCC",
    },
    substrateDetails: {
        flex: 1,
    },
    platformOrienter: {
        flexDirection: onWeb ? "row" : "column",
        marginBottom: 50,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
    },
    headerWrapper: {
        flexDirection: onWeb ? "row" : "column",
        justifyContent: "space-between",
        margin: 5,
        paddingVertical: 10,
        borderColor: "#CCC",
        borderBottomWidth: 2,
    },
    rowItem: {
        fontSize: 16,
    },
    substrateRow: {
        flexDirection: "row",
        margin: 4,
        padding: 3,
        borderColor: "#CCC",
        borderWidth: 1,
        borderRadius: 3,
        maxWidth: onWeb ? 300 : "100%",
    },
    substrateTable: {
        margin: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    }
};
