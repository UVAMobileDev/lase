// Form component which allows to select between different sizes.
// To avoid duplicating web requests, the component utilizes static class resources
// to fetch and store the list of systems ONE time, then use that list whenever it
// is needed.

// Imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
var Semaphore = require('async-mutex').Semaphore;

export default class SelectSubstrateSize extends React.Component {
    constructor(props) {
        super(props);
        SelectSubstrateSize.LoadSubstrates(this, SelectSubstrateSize.loaded);
        this.state = {
            style: props.style || {},
            update: props.update,
            placeholder: props.placeholder
        };
    }

    // Static class variables
    static loaded = false;
    static sizes = [];
    static lock = new Semaphore(1);

    static LoadSubstrates = async (instance, alreadyDone) => {
        if(alreadyDone) return;
        const [_, release] = await SelectSubstrateSize.lock.acquire();
        try {
            if(SelectSubstrateSize.loaded) return;
            let parsed = await fetch(`${BASE_URL}/wafers/sizes`).then(r => r.json());
            SelectSubstrateSize.sizes = parsed.sizes.map(size => size).sort();
            SelectSubstrateSize.loaded = true;
        } finally {
            release();
            instance.setState(Object.assign({_: true}, instance.state));
        }
    }

    render() {
        return (
            <View style={this.state.style}>
                <RNPickerSelect
                    style={pickerStyle}
                    placeholder={this.state.placeholder || {label: "Select an item...", value: ""}}
                    InputAccessoryView={() => null}
                    onValueChange={size => this.state.update(size)}
                    items={SelectSubstrateSize.sizes.map(size => (
                        {label: `${size}`, value: size}
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
