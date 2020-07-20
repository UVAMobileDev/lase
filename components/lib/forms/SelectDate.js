// Simple date selector
// Component API:
// Pass in any (all optional) of the following props to affect certain aspects
// @initDay - sets the initial value of the day picker (value should be [1-31]). Default is 1
// @initMonth - sets the initial value of the month picker (value should be [1-12]). Default is 1
// @initYear - sets the initial value of the year picker. Default is 2010.
// @minYear - sets the floor of the year picker. Default is 2010. The maximum year is the current year.

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CurrentYear = new Date().getFullYear();
const Years = []; for(let i = 2010; i <= CurrentYear; i++) Years.push(i);
const DaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SelectDate(props) {
    // update hook located in props.update
    let [day, setDay] = useState(props.initDay || 1);
    let [month, setMonth] = useState(props.initMonth || 1);
    let [year, setYear] = useState(props.initYear || props.minYear || 2010);

    useEffect(() => {
        let y = year % 100;
        props.update(parseInt(`${y < 10 ? `0${y}` : y}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`));
    }, [day, month, year]);

    return (
        <View style={styles.container}>
            {/* Month Picker */}
            <RNPickerSelect style={pickerStyle}
                            placeholder={{}}
                            InputAccessoryView={() => null}
                            onValueChange={val => setMonth(parseInt(val))}
                            items={Months.map((month, i) => (
                                {label: `${month}`, value: i + 1}
                            ))}
                            value={month}/>
            {/* Day Picker */}
            <RNPickerSelect style={pickerStyle}
                            placeholder={{}}
                            InputAccessoryView={() => null}
                            onValueChange={val => setDay(parseInt(val))}
                            items={[...Array(year % 4 === 0 && month === 2 ? 29 : DaysPerMonth[month - 1])].map((_, i) => ({label: `${i + 1}`, value: i + 1}))}
                            value={day}/>
            {/* Year Picker */}
            <RNPickerSelect style={pickerStyle}
                            placeholder={{}}
                            InputAccessoryView={() => null}
                            onValueChange={val => setYear(parseInt(val))}
                            items={[...Array(CurrentYear - (props.minYear || 2010) + 1)].map((_, i) => ({label: `${i + (props.minYear || 2010)}`, value: i + (props.minYear || 2010)}))}
                            value={year}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

// Styles copied from the react-native-picker-select sample snack, with some modifications
// https://snack.expo.io/@lfkwtz/react-native-picker-select
const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        marginHorizontal: 2,
    },
    inputAndroid: { // Covers Android & Web platforms
        fontSize: 16,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        marginHorizontal: 2,
    },
});
