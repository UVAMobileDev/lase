import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectMember from '../lib/forms/SelectMember';
import SelectSubstrate from '../lib/forms/SelectSubstrate';
import { BASE_URL } from '../../constants/API';
import SystemViewer from './SystemViewer';
import { GrowthProvider } from './GrowthContext';
const fetch = require('node-fetch');

const Tab = createMaterialTopTabNavigator();
const onWeb = Platform.OS === "web";

class Cooldown {
    constructor(trigger, ms_cooldown) {
        this.trigger = trigger;
        this.ms_cooldown = ms_cooldown;
        this.timeout = false;
        this.value = "";
    }

    input(value) {
        this.value = value;
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.timeout = false;
            this.trigger(value);
        }, this.ms_cooldown);
    }
}

export default function GrowthBrowser(props) {

    const [form, updateForm] = useReducer((state, {key, value}) => ({...state, [key]: value}), {});
    const [systems, setSystems] = useState([]);
    const cooldown = useState(new Cooldown(updateForm, 750))[0];

    // Get the list of machines
    useEffect(() => {
        let load = async () => {
            let response = [];
            response = await fetch(`${BASE_URL}/settings/machines`).then(r => r.json());
            setSystems(response.machines);
        }
        load();
    }, []);

    return (
        <GrowthProvider value={{systems, filter: form}}>
            <View style={styles.filterControls}>
                <Text style={styles.filterText}>Filter Growths:</Text>
                <SelectMember
                    placeholder={{label: "Select grower", value: ""}}
                    update={rec => updateForm({key: "grower", value: rec})}/>
                <SelectSubstrate
                    placeholder={{label: "Select substrate", value: ""}}
                    update={sub => updateForm({key: "substrate", value: sub})}
                    />
                <Text>SampleID</Text>
                <TextInput
                    placeholder="Keywords"
                    onChangeText={val => cooldown.input({key: "keywords", value: val})}
                    />
            </View>
            {systems.length > 0 ? (
                <Tab.Navigator
                        initialRouteName={systems[0]}
                        screenOptions={form}
                        swipeEnabled={!onWeb}>
                   {systems.map((sys, i) => (
                       <Tab.Screen key={i} name={sys} component={SystemViewer} initialParams={{sysIndex: i}}/>
                   ))}
                </Tab.Navigator>) : (<View />)
            }
        </GrowthProvider>
    );
}

// StyleSheet
const styles = StyleSheet.create({
    filterText: {
        fontSize: 20,
        marginBottom: 10,
    },
    filterControls: {
        backgroundColor: "white",
        padding: 10,
    },
});
