// Browse is the component which appears under the Maintenance/Find tab. Since
//  it allows you to look at the list of records in the database, as well as an
//  individual record, the top level component here just creates a stack navigator
//  to wrap the list/filter and creation functionalities.

// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GrowthCalendar from './GrowthCalendar';
import SampleDetails from '../../Growths/SampleDetails';
import GrowthDetails from '../../Growths/GrowthDetails';

// Create the stack navigator
const Stack = createStackNavigator();

export default function GrowthCal(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Calendar" component={GrowthCalendar} options={{headerShown: false}}/>
            <Stack.Screen name="Sample Details" component={SampleDetails}/>
            <Stack.Screen name="Growth Details" component={GrowthDetails}/>
        </Stack.Navigator>
    )
}
