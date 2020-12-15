// Imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';

var Semaphore = require('async-mutex').Semaphore;

export default class SelectType extends React.Component {
    constructor(props) {
        // We can't use the ketword "this" until super is called.
        super(props);

        // Trigger the class's load members function.
        SelectType.LoadTypes(this, SelectType.loaded);

        this.state = {
            style: props.style,
            update: props.update,
            placeholder: props.placeholder
        };
    }

    // Static class variables
    static loaded = false;
    static types = [];
    static lock = new Semaphore(1);

    // Static class function which attempts to load the set of members from the API.
    static LoadTypes = async (instance, alreadyDone) => {
        // If the loading has already been completed, just stop now.
        if(alreadyDone) return;

        const [_, release] = await SelectType.lock.acquire();
        try {
            if(SelectType.loaded) return;

            //Get all types from API
            let parsed = await fetch(`${BASE_URL}/publications/types/`).then(r => r.json());
            SelectType.types = parsed.types.map(({label, id}) => ({label, id})).sort();
            SelectType.loaded = true;
        } finally {
            release();
            instance.setState(Object.assign({_: true}, instance.state));
        }
    }

    render() {
        return (
            <View style={this.state.style}>
                <RNPickerSelect style={StyleSheet.flatten(styles.picker)}
                        placeholder={this.state.placeholder || {label: "Select an item...", value: ""}}
                        InputAccessoryView={() => null}
                        onValueChange={id => this.state.update({type: SelectType.types[id - 1], id})}
                        items={SelectType.types.map(({label, id}) => ({
                            label,
                            value: id,
                        }))}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        margin: 5,
        padding: 5,
        borderLeftWidth: 2,
        borderRadius: 5,
    }
});
