// Browse is the component which appears under the Maintenance/Find tab. Since
//  it allows you to look at the list of records in the database, as well as an
//  individual record, the top level component here just creates a stack navigator
//  to wrap the list/filter and creation functionalities.

// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Record from './Record.js';
import Filter from './Filter.js';

// Create the stack navigator
const Stack = createStackNavigator();

export default function Browse(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Filter" component={Filter} options={{headerShown: false}}/>
            <Stack.Screen name="Record" component={Record}/>
        </Stack.Navigator>
    )
}
