// Imports
import React, { useReducer } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function Checkbox(props) {

    const [checked, toggleChecked] = useReducer(checked => !checked, props.startChecked ? true : false);

    function handlePress() {
        if(props.onChange) props.onChange();
        toggleChecked();
    }

    return (
        <View style={props.style || {}}>
            <TouchableOpacity
                style={styles.toggler}
                onPress={handlePress}>
                {checked ?
                    props.checked || (<Feather name="check-square" size={24} color="black" />) :
                    props.unchecked || (<Feather name="square" size={24} color="black" />)}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    toggler: {
        margin: 2,
        padding: 3,
    }
});
