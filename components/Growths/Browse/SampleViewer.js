
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
const fetch = require('node-fetch');

export default function SampleViewer(props) {
    let [sampleID, setID] = useState('');

    const navigate = () => props.navigation.navigate("Sample Details", {sampleID});

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Enter a Sample ID to view its details, or to create a new sample if the ID does not yet exist.</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setID(text)}
                onSubmitEditing={navigate}
                placeholder="Sample ID"
                placeholderTextColor="#aaa"
                autoCorrect={false}
                />

            <TouchableOpacity style={styles.openButton}
                    onPress={navigate}>
                <Text>Open or create sample</Text>
            </TouchableOpacity>
        </View>
    );
}

// StyleSheet
const styles = StyleSheet.create({
    headerText: {
        margin: 10,
        fontSize: 16,
    },
    openButton: {
        margin: 10,
        padding: 10,
        backgroundColor: "#6f6",
        borderRadius: 5,
    },
    input: {
        height: 40,
        borderColor: "#000",
        borderWidth: 1,
        width: 300,
        margin: 20,
        paddingHorizontal: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-start",
    },
})
