import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GrowthCal from './GrowthCalendar/Index';
import STO from './STOGeneration/STOGenerator';
import WaferLog from './WaferUtils/WaferLog';
// import ExampleComponent from './WaferUtils/ExampleComponent';

const Tab = createMaterialTopTabNavigator();

function Todo(props) {
    return (<View><Text>This component has not yet been implemented.</Text></View>);
}

export default function Utilities(props) {
    return (
        <View style={{flex: 1, backgroundColor: "#0AA"}}>
            <Tab.Navigator  initialRouteName="Browse"
                            style={{marginTop: Platform.OS === "web" ? 0 : Constants.statusBarHeight,}}
                            tabBarOptions={{
                                scrollEnabled: Platform.OS !== "web",
                            }}>
                <Tab.Screen name="Growth Calendar" component={GrowthCal}/>
                <Tab.Screen name="STO Generation" component={STO}/>
                <Tab.Screen name="Wafer Log" component={Todo}/>
                <Tab.Screen name="Delete" component={Todo}/>
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    }
});