// Form component which allows to select between different available LASE systems.
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

// All of the comments from SelectMember.js are applicable here as well. From a
//  technical perspective, this component does the exact same thing.
export default class SelectSystem extends React.Component {
    constructor(props) {
        super(props);
        SelectSystem.LoadSystems(this);
        this.state = {
            style: props.style || {},
            update: props.update,
            placeholder: props.placeholder,
            dark: props.dark ? true : false,
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
                    onValueChange={val => this.state.update(val)}
                    items={SelectSystem.systems.map(sys => (
                        {label: `${sys}`, value: sys}
                    ))}
                    />
            </View>
        );
    }
}
