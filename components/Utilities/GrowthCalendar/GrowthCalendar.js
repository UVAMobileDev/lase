import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MonthBrowser from '../../lib/cal/MonthBrowser';
import moment from 'moment';
import { BASE_URL } from '../../../constants/API';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Fetch growths from a single month:
// https://api.lase.mer.utexas.edu/v1/machine/Echo/growths?mindate=2015-01-15&maxdate=2015-01-19
// `${BASE_URL}/machine/${system}/growths?mindate=2015-01-15&maxdate=2015-01-19`
const Events = growths => {
    let e = Object.assign({}, growths);
    Object.keys(e).reduce((_, cur) => e[cur] = e[cur].length, undefined);
    return e;
}

export default function GrowthCalendar(props) {
    const [month, setMonth] = useState();
    const [growths, setGrowths] = useState({0: []});
    const [systems, setSystems] = useState([]);
    const [day, setDay] = useState(0);

    useEffect(() => {
        const load = async () => {
            let resp = await fetch(`${BASE_URL}/settings/machines`).then(r => r.json());
            setSystems(resp.machines || []);
        }
        load();
    }, []);

    // When the month changes, we should look for more events.
    useEffect(() => {
        setGrowths({0: []});
        const load = async () => {
            let items = await Promise.all(systems.map(async sys => {
                let resp = await fetch(`${BASE_URL}/machine/${sys}/growths?mindate=${month.format("YYYY-MM-DD")}&maxdate=${moment(month).date(month.daysInMonth()).format("YYYY-MM-DD")}`).then(r => r.json());
                return resp.results || [];
            }));

            setGrowths(items.reduce((acc, cur) => {
                cur.reduce((_, growth) => {
                    let m = moment(growth.date), day = m.date(), val = acc[day];
                    if(val) acc[day].push(growth);
                    else acc[day] = [growth];
                }, undefined);
                return acc;
            }, {0: []}))
        }
        load();
    }, [systems, month]);

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                <MonthBrowser
                        onDaySelect={m => setDay(m.date())}
                        onMonthChange={setMonth}
                        events={Events(growths)}/>
            </View>
            <View style={styles.instruction}>
                <Text style={styles.rowItem}>
                    <MaterialCommunityIcons style={styles.icon} name="file-document-box-outline" size={18} color="black" />
                    <Text>View only growth details</Text>
                </Text>

                <Text style={styles.rowItem}>
                    <MaterialCommunityIcons style={styles.icon} name="file-document-box-multiple-outline" size={18} color="black" />
                    <Text>View full sample details</Text>
                </Text>
            </View>
            <ScrollView style={styles.list}>
                <ScrollView horizontal={true}>
                    <View>
                        {growths[day] ? growths[day].map(growth => (
                            <View key={growth.id.toString()} style={{alignItems: "center"}}>
                                <View style={styles.growthRow}>
                                    <TouchableOpacity style={[styles.rowItem, {width: 55}]}
                                            onPress={() => props.navigation.navigate("Growth Details", {growth})}>
                                        <MaterialCommunityIcons style={styles.icon} name="file-document-box-outline" size={18} color="black" />
                                        <Text style={styles.link}>{growth.id}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.rowItem, {width: 100}]}
                                            onPress={() => props.navigation.navigate("Sample Details", {sampleID: growth.sampleID, system: growth.machine})}>
                                        <MaterialCommunityIcons style={styles.icon} name="file-document-box-multiple-outline" size={18} color="black" />
                                        <Text style={styles.link}>{growth.sampleID}</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.rowItem}>{growth.grower}</Text>
                                </View>
                                <View style={styles.divider} />
                            </View>
                        )) : (<View/>)}
                        <View style={{marginBottom: 25}}/>
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    divider: {
        width: "90%",
        marginVertical: 5,
        borderBottomWidth: 1.5,
        borderColor: "#CCC",
    },
    icon: {
        marginRight: 4,
    },
    link: {
        color: "#00f",
    },
    rowItem: {
        flexDirection: "row",
        marginHorizontal: 6,
    },
    growthRow: {
        marginVertical: 2.5,
        flexDirection: "row",
        alignItems: "center",
    },
    instruction: {
        margin: 5,
        alignItems: "center",
    },
    controls: {
        alignItems: "center",
        marginTop: 15,
    },
    list: {
        flex: 1,
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
});
