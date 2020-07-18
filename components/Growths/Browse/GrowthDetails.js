import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { Ionicons } from '@expo/vector-icons';
import { Jet, Platinum, Gainsboro, InternationalOrange, PurpleNavy } from '../../../constants/Colors.js';
const fetch = require("node-fetch");

export default function GrowthDetails(props) {
    return (
        <View>
            <Text>Growth details page</Text>
        </View>
    )
}
