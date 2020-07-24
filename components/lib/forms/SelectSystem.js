// Form component which allows to select between different available LASE systems.
// To avoid duplicating web requests, the component utilizes static class resources
// to fetch and store the list of systems ONE time, then use that list whenever it
// is needed.

// Imports
import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { BASE_URL } from '../../../constants/API';
const fetch = require('node-fetch');
var Semaphore = require('async-mutex').Semaphore;

// All of the comments from SelectMember.js are applicable here as well. From a
//  technical perspective, this component does the exact same thing.
export default class SelectSystem extends React.Component {
    constructor(props) {
        super(props);
        SelectSystem.LoadSystems(this);
        this.state = {
            update: props.update,
            placeholder: props.placeholder
        };
    }

    static loaded = false
    static systems = []
    static lock = new Semaphore(1);
    static LoadSystems = async (instance, alreadyDone) => {
        if(alreadyDone) return;
        const [_, release] = await SelectSystem.lock.acquire();
        try {
            if(SelectSystem.loaded) return;
            let parsed = await fetch(`${BASE_URL}/settings/machines`).then(r => r.json());
            SelectSystem.systems = parsed.machines;
            SelectSystem.loaded = true;
        } finally {
            release();
            instance.setState(Object.assign({_: null}, instance.state));
        }
    }

    render() {
        return (
            <View>
                <RNPickerSelect style={pickerStyle}
                                placeholder={this.state.placeholder || {label: "Select an item...", value: ""}}
                                InputAccessoryView={() => null}
                                onValueChange={val => this.state.update(val)}
                                items={SelectSystem.systems.map(sys => (
                                    {label: `${sys}`, value: sys}
                                ))}/>
            </View>
        );
    }
}

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
        paddingRight: 30,
    },
    inputAndroid: { // Covers Android & Web platforms
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});
