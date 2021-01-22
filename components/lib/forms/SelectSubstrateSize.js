// Form component which allows to select between different sizes.
// To avoid duplicating web requests, the component utilizes static class resources
// to fetch and store the list of systems ONE time, then use that list whenever it
// is needed.

// Imports
import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
var Semaphore = require('async-mutex').Semaphore;
import { DropdownLight, DropdownDark } from './DropdownStyle';

export default class SelectSubstrateSize extends React.Component {
    constructor(props) {
        super(props);
        SelectSubstrateSize.LoadSubstrates(this, SelectSubstrateSize.loaded);
        this.state = {
            style: props.style || {},
            update: props.update,
            placeholder: props.placeholder,
            dark: props.dark ? true : false,
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

    componentDidUpdate({dark}) {
        if(dark === this.props.dark) return;
        this.setState({...this.state, dark: this.props.dark});
    }

    render() {
        return (
            <View style={this.state.style}>
                <RNPickerSelect
                    style={this.state.dark ? DropdownDark : DropdownLight}
                    placeholder={this.state.placeholder || {label: "Select an item...", value: ""}}
                    InputAccessoryView={() => null}
                    onValueChange={size => this.state.update(size)}
                    items={SelectSubstrateSize.sizes.map(size => (
                        {label: `${size}`, value: size}
                    ))}
                    />
            </View>
        );
    }
}
