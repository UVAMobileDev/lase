

import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectMember from '../../lib/forms/SelectMember';
import { BASE_URL } from '../../../constants/API.js';
import CustomViewer from '../Browse/CustomViewer.js';
import { UserProvider } from './UserContext';
const fetch = require('node-fetch');

const FilterReducer = (state, action) => {

    switch(action.type) {
        case "set":
            return {...state, [action.payload.key]: action.payload.value}

        default:
            return state;
    }
}

const Filtered = async (filter, page) => {
    let growths = []
    let parsed = {growths: []};
    parsed = await fetch(QueryString(filter, page)).then(r => r.json());
    growths = growths.concat(parsed.growths);
    return growths;
}


export default function GrowthBrowser(props) {
    const Tab = createMaterialTopTabNavigator();

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
        <UserProvider value={{systems, filter}}>
            {systems.length > 0 ? (
                <ScrollView>
                    <View style={styles.filterControls}>
                        <Text style={styles.filterText}>Filter Growths:</Text>
                        <SelectMember placeholder={{label: "Select Grower", value: ""}} update={rec => dispatchFilter({type: "set", payload: {key: "grower", value: rec}})}/>
                    </View>

                   <Tab.Navigator initialRouteName={systems[0]} screenOptions={filter}>
                       {systems.map((sys, i) => (
                           <Tab.Screen key={i} name={sys} component={CustomViewer} initialParams={{sysIndex: i}}/>
                       ))}
                   </Tab.Navigator>
                 </ScrollView>) : (<View/>)
            }
        </UserProvider>
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
