import React, { useContext, useReducer, useEffect } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { LightStyles, DarkStyles, Colors } from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';

export default function LogEntry(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const item = props.data;
    return (
        <View style={styles.rowWrapper}>
            <Text style={[styles.rowTextItem, styles.mono]}>{item.id}</Text>
            <Text style={[styles.rowTextItem, styles.mono]}>{item.timestamp}</Text>
            <Text style={[styles.rowTextItem, styles.mono]}>{item.notes}</Text>
            <Text style={[styles.mono, {width: 50, textAlign: "right"}]}>{item.wafersAdded}</Text>
        </View>
    );
}

const LocalStyles = {
    sp: {
        fontFamily: Platform.OS === "ios" ? "Verdana" : "sans-serif",
    },
    mono: {
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    },
    rowTextItem: {
        textAlign: "left",
    },
    rowWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 3,
        maxWidth: 450,
    }
}
