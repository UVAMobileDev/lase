import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Ionicons } from '@expo/vector-icons';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");

export default function GrowthDetails(props) {
    let growth = props.route.params.growth;
    return (
        <View style={styles.container}>

            <View style={{paddingBottom: 20}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Details for growth {growth.id}:</Text>
            </View>
            <View style={{paddingBottom: 10}}>
                <Text>Grower: {growth.grower}</Text>
            </View>
            <View style={{paddingBottom: 10}}>
                <Text>Machine: {growth.machine}</Text>
            </View>
            <View style={{paddingBottom: 10}}>
                <Text>Substrate: {growth.substrate}</Text>
            </View>
            <View style={{paddingBottom: 10}}>
                <Text>Description: {growth.Description}</Text>
            </View>


        </View>
    )
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 30,
    },

})
