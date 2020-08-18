import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectMember from '../lib/forms/SelectMember';
import { BASE_URL } from '../../constants/API';
import SystemViewer from './SystemViewer';
import { GrowthProvider } from './GrowthContext';
const fetch = require('node-fetch');

const FilterReducer = (state, action) => {

    switch(action.type) {
        case "set":
            return {...state, [action.payload.key]: action.payload.value}
        default:
            return state;
    }
}

const Tab = createMaterialTopTabNavigator();

export default function GrowthBrowser(props) {

    const [filter, dispatchFilter] = useReducer(FilterReducer, {});
    const [systems, setSystems] = useState([]);

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
        <GrowthProvider value={{systems, filter}}>
            <ScrollView>
                <View style={styles.filterControls}>
                    <Text style={styles.filterText}>Filter Growths:</Text>
                    <SelectMember placeholder={{label: "Select Grower", value: ""}} update={rec => dispatchFilter({type: "set", payload: {key: "grower", value: rec}})}/>
                </View>
                {systems.length > 0 ? (
                   <Tab.Navigator initialRouteName={systems[0]} screenOptions={filter}>
                       {systems.map((sys, i) => (
                           <Tab.Screen key={i} name={sys} component={SystemViewer} initialParams={{sysIndex: i}}/>
                       ))}
                   </Tab.Navigator>) : (<View />)
                }
            </ScrollView>
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
