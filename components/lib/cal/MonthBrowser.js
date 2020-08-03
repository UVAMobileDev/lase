import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MonthView from './MonthView';
import moment from 'moment';

// @props.events =
export default function MonthBrowser(props) {
    const [m, setm] = useState(moment().date(1));

    useEffect(() => {
        if(props.onMonthChange) props.onMonthChange(m);
    }, [m]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.controlRow}>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                                style={styles.controlButton}
                                onPress={() => setm(moment(m).year(m.year() - 1))}>
                            <AntDesign name="banckward" size={16} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                                style={styles.controlButton}
                                onPress={() => setm(moment(m).month(m.month() - 1))}>
                            <AntDesign name="caretleft" size={16} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.valueLabel}>{m.format("MMM")} {m.year()}</Text>

                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                                style={styles.controlButton}
                                onPress={() => setm(moment(m).month(m.month() + 1))}>
                            <AntDesign name="caretright" size={16} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                                style={styles.controlButton}
                                onPress={() => setm(moment(m).year(m.year() + 1))}>
                            <AntDesign name="forward" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <MonthView
                        containerStyle={{borderColor: "#CCC", borderWidth: 1, paddingVertical: 3}}
                        month={m.format("YYYY-MM")}
                        events={props.events || {}}
                        dayPress={day => console.log(day)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    valueLabel: {
        fontSize: 16,
    },
    controlButton: {
        borderRadius: 5,
        borderColor: "#CCC",
        borderWidth: 1,
        backgroundColor: "#0AA",
        padding: 5,
    },
    controlRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        marginHorizontal: 10,
    },
    container: {
        padding: 10,
        borderColor: "#000",
        borderRadius: 5,
        borderWidth: 2,
    },
    wrapper: {
        width: 260,
    },
});
