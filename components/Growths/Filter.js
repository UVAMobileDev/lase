import React, { useState, useEffect, useReducer, useContext } from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectMember from '../lib/forms/SelectMember';
import SelectSubstrate from '../lib/forms/SelectSubstrate';
import { BASE_URL } from '../../constants/API';
import SystemViewer from './SystemViewer';
import { GrowthProvider } from './GrowthContext';
const fetch = require('node-fetch');
import KeyContext from '../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';

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
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const [form, updateForm] = useReducer((state, {key, value}) => {
        if(key === 'SampleID' && value === '') {
            let ret = Object.assign({}, state);
            delete ret.SampleID;
            return ret;
        }
        return {...state, [key]: value};
    }, {});
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
        <View style={styles.componentBackground}>
            <View style={styles.filterControls}>
                <Text style={styles.lblPrimaryHeading}>Filter Growths:</Text>
                <SelectMember
                    style={{marginHorizontal: 10, marginVertical: 5}}
                    dark={dark}
                    placeholder={{label: "Select grower", value: ""}}
                    update={rec => updateForm({key: "grower", value: rec})}/>
                <SelectSubstrate
                    style={{marginHorizontal: 10, marginVertical: 5}}
                    dark={dark}
                    placeholder={{label: "Select substrate", value: ""}}
                    update={sub => updateForm({key: "substrate", value: sub})}
                    />
                <TextInput
                    style={[styles.txt, {marginHorizontal: 10, marginVertical: 5}]}
                    placeholderTextColor={Colors.neutral1}
                    placeholder="SampleID"
                    onChangeText={val => cooldown.input({key: "SampleID", value: val})}
                    />
                <TextInput
                    style={[styles.txt, {marginHorizontal: 10, marginVertical: 5}]}
                    placeholderTextColor={Colors.neutral1}
                    placeholder="Keywords"
                    onChangeText={val => cooldown.input({key: "keywords", value: val})}
                    />
            </View>
            {systems.length > 0 ? (
                <Tab.Navigator
                    initialRouteName={systems[0]}
                    screenOptions={form}
                    swipeEnabled={!onWeb}
                    tabBarOptions={{
                        labelStyle: {fontWeight: "bold"},
                        inactiveTintColor: "#000000",
                        activeTintColor: "#efefef",
                        style: {
                            backgroundColor: dark ? Colors.highlightDark : Colors.highlight,
                        },
                    }}
                    >
                   {systems.map((sys, i) => (
                       <Tab.Screen key={i} name={sys} component={SystemViewer} initialParams={{sysIndex: i}}/>
                   ))}
                </Tab.Navigator>) : (<View />)
            }
        </View>
        </GrowthProvider>
    );
}

// StyleSheet
const LocalStyles = StyleSheet.create({
    filterText: {
        fontSize: 20,
        marginBottom: 10,
    },
    filterControls: {
        backgroundColor: "white",
        padding: 10,
    },
});
