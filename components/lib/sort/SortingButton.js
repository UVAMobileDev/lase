import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';


const advanceState = (states, i, setStage, trigger, invert) => {
    i++; i %= states.length;
    setStage(i);

    let returnStage = states[i];
    if(invert && returnStage !== "neutral") returnStage = returnStage === "forwards" ? "reverse" : "forwards";
    trigger(returnStage);
}

const Icon = stage => {
    switch(stage) {
        case "neutral":
            return (<Entypo name="select-arrows" size={16} color="black"/>);

        case "forwards":
            return (<Entypo name="arrow-down" size={16} color="black"/>);

        default:
            return (<Entypo name="arrow-up" size={16} color="black"/>);
    }
}

// Accepted props:
// @label - (string) what to put on the button
// @includeSortBy - (bool) whether to put "Sort by" before the label
// @trigger - (function) the function to call when the state is changed
// @invert - (bool) whether to invert sorting order by default
// @blockReverse - (bool) whether to remove the reverse sort button state
export default function SortingButton(props) {
    const [states, setStates] = useState(["neutral", "forwards"]);
    useEffect(() => {
        if(!props.blockReverse) setStates([...states, "reverse"]);
    }, []);
    const [stage, setStage] = useState(0);

    return (
        <View style={[styles.container, states[stage] === "neutral" ? styles.neutral : states[stage] === "forwards" ? styles.forwards : styles.reverse]}>
            <TouchableOpacity   style={styles.button}
                                onPress={() => advanceState(states, stage, setStage, props.trigger, props.invert === true)}>
                <Text style={styles.label}>{props.includeSortBy === true ? `Sort by ` : ``}{props.label}</Text>
                {Icon(states[stage])}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        borderColor: "#777",
        borderWidth: 1,
    },
    label: {
        fontSize: 15,
    },
    button: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 5,
        padding: 5,
    },
    neutral: {
    },
    forwards: {
    },
    reverse: {
    },
});
