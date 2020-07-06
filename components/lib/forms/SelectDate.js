import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';

const CurrentYear = new Date().getFullYear();
const Years = []; for(let i = 2010; i <= CurrentYear; i++) Years.push(i);
const DaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SelectDate(props) {
    // update hook located in props.update
    let [day, setDay] = useState(props.initDay || 1);
    let [month, setMonth] = useState(props.initMonth || 1);
    let [year, setYear] = useState(props.initYear || 2010);

    useEffect(() => {
        let y = year % 100;
        props.update(parseInt(`${y < 10 ? `0${y}` : y}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`));
    }, [day, month, year]);

    return (
        <View style={styles.container}>
            {/* Month Picker */}
            <Picker style={styles.picker}
                    onValueChange={val => setMonth(parseInt(val))}
                    selectedValue={month}>
                {DaysPerMonth.map((_, i) => (
                    <Picker.Item    key={i}
                                    label={Months[i]}
                                    value={i + 1}/>
                ))}
            </Picker>
            {/* Day Picker */}
            <Picker style={styles.picker}
                    onValueChange={val => setDay(val)}
                    selectedValue={day}>
                {[...Array(year % 4 === 0 && month === 2 ? 29 : DaysPerMonth[month - 1])].map((_, i) => (
                    <Picker.Item    key={i}
                                    label={i + 1}
                                    value={i + 1}/>
                ))}
            </Picker>
            {/* Year Picker */}
            <Picker style={styles.picker}
                    onValueChange={val => setYear(val)}
                    selectedValue={year}>
                {[...Array(CurrentYear - (props.minYear || 2010) + 1)].map((_, i) => (
                    <Picker.Item    key={i}
                                    label={i + (props.minYear || 2010)}
                                    value={i + (props.minYear || 2010)}/>
                ))}
            </Picker>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    picker: {
        flex: 1,
        margin: 2,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        borderRadius: 5,
    }
});
