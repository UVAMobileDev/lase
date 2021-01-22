// Form component which allows to select between different substrates.
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

export default class SelectSubstrate extends React.Component {
    constructor(props) {
        super(props);
        SelectSubstrate.LoadSubstrates(this, SelectSubstrate.loaded);
        this.state = {
            style: props.style || {},
            update: props.update,
            placeholder: props.placeholder,
            dark: props.dark ? true : false,
        };
    }

    // Static class variables
    static loaded = false;
    static substrates = [];
    static lock = new Semaphore(1);

    static LoadSubstrates = async (instance, alreadyDone) => {
        if(alreadyDone) return;
        //  the value to an underscore.
        const [_, release] = await SelectSubstrate.lock.acquire();
        try {
            if(SelectSubstrate.loaded) return;
            let parsed = await fetch(`${BASE_URL}/settings/substrates`).then(r => r.json());
            SelectSubstrate.substrates = parsed.substrates.map(({substrate}) => substrate).sort();
            SelectSubstrate.loaded = true;
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
                    onValueChange={substrate => this.state.update(substrate)}
                    items={SelectSubstrate.substrates.map(substrate => (
                        {label: `${substrate}`, value: substrate}
                    ))}
                    />
            </View>
        );
    }
}
