import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Ionicons } from '@expo/vector-icons';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");

export default function GrowthDetails(props) {
    let growth = props.route.params.growth;
    return (
        <View>

            <View>
                <Text>Details for growth {growth.id}:</Text>
            </View>
            <View>
                <Text>Grower: {growth.grower}</Text>
            </View>
            <View>
                <Text>Machine: {growth.machine}</Text>
            </View>
            <View>
                <Text>Substrate: {growth.substrate}</Text>
            </View>
            <View>
                <Text>Description: {growth.Description}</Text>
            </View>


        </View>
    )
}
