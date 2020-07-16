import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GrowthCalendar from './GrowthCalendar/GrowthCalendar';
import STO from './STOGeneration/STOGenerator';
import WaferLog from './WaferUtils/WaferLog';

const Tab = createMaterialTopTabNavigator();

function Todo(props) {
    return (<View><Text>This component has not yet been implemented.</Text></View>);
}

export default function Utilities(props) {
    return (
        <Tab.Navigator  initialRouteName="Browse"
                        style={{marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight,}}
                        tabBarOptions={{
                            scrollEnabled: Platform.OS !== "web",
                        }}>
            <Tab.Screen name="Growth Calendar" component={GrowthCalendar}/>
            <Tab.Screen name="STO Generation" component={STO}/>
            <Tab.Screen name="Wafer Log" component={WaferLog}/>
            <Tab.Screen name="Delete" component={Todo}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});
