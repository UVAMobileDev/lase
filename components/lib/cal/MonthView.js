import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

const ISODays = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
}

const EventFormatter = n => {
    if(n <= 0) return (<View/>);
    if(n === 1) return (<View style={styles.event}/>);
    if(n === 2) return (
        <View style={{flexDirection: "row"}}>
            <View style={styles.event}/>
            <View style={styles.event}/>
        </View>
    );
    if(n === 3) return (
        <View style={{flexDirection: "row"}}>
            <View style={styles.event}/>
            <View style={styles.event}/>
            <View style={styles.event}/>
        </View>
    );
    if(n > 3) return (
        <View style={{flexDirection: "row"}}>
            <View style={styles.event}/>
            <View style={styles.event}/>
            <View style={[styles.event, {borderColor: "#f55"}]}/>
        </View>
    )

    return (<View/>);
}

// @props.month => 2020-01
// @props.events => {day of month: number of events}
// @props.dayPress => callback function when a day has been pressed.
//  callback supplied a moment object with the selected day
// @props.containerStyle => additional styles applied to the container
export default function MonthView(props) {
    const [state, setState] = useState({});

    // Calculate everything needed to construct the month view.
    useEffect(() => {
        // Build out the week structure...
        let m = moment(props.month);
        let monthBox = [...Array(m.daysInMonth())].map((_, i) => i + 1);
        let prevFill = moment(m).month(m.month() - 1);
        prevFill = moment(prevFill).date(prevFill.daysInMonth());

        let p = 0;
        while(prevFill.isoWeekday() !== 7) {
            p++
            prevFill = moment(prevFill).date(prevFill.date() - 1);
        }

        monthBox = [...Array(p)].map((_, i) => prevFill.date() + i + 1).concat(monthBox);
        monthBox = monthBox.reduce((acc, day, i) => {
            acc[Math.floor(i / 7)][acc[Math.floor(i / 7)].length] = day;
            return acc;
        }, [...Array(Math.ceil(monthBox.length / 7))].map(() => []));

        let i = 1;
        while(monthBox[monthBox.length - 1].length !== 7) monthBox[monthBox.length - 1].push(i++);

        setState({monthBox, events: props.events || {}});
    }, [props.month, props.events]);

    const callback = day => props.dayPress ? props.dayPress(moment(props.month).date(day)) : null;

    return (
        <View style={[styles.monthBox, props.containerStyle || {}]}>
            {state.monthBox ? (
                <View>
                    <View style={styles.dayLabels}>
                        {Object.keys(ISODays).map(k => (
                            <Text key={k} style={styles.dayLabel}>{ISODays[k][0]}</Text>
                        ))}
                    </View>
                    {state.monthBox.map((week, i) => (
                        <View key={i} style={styles.week}>
                            {week.map((day, x) => (
                                <View key={x}>
                                    {(day > 7 && i * 7 + x < 7) || (day < 7 && i * 7 + x > 28) ? (
                                        <View style={[styles.day, styles.unselectableDay]}>
                                            <Text style={styles.dayNumber}>{day}</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity style={styles.day}
                                                onPress={() => callback(day)}>
                                            <Text style={styles.dayNumber}>{day}</Text>
                                            {EventFormatter(state.events[day])}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            ) : (
                <View/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    dayLabels: {
        flexDirection: "row",
        alignItems: "center",
    },
    dayLabel: {
        width: 28,
        height: 20,
        margin: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    event: {
        borderColor: "#0AA",
        borderWidth: 2,
        borderRadius: 2,
        margin: .5
    },
    dayNumber: {
    },
    unselectableDay: {
        opacity: .4,
    },
    day: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 28,
        width: 28,
        margin: 1,
        borderColor: "#CCC",
        borderRadius: 5,
        borderWidth: 1,
    },
    week: {
        flexDirection: "row",

    },
    monthBox: {
        padding: 10,
        borderColor: "#000",
        borderRadius: 5,
        borderWidth: 2,
        width: 235,
    },
});
