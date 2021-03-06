// Imports
import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';
var Semaphore = require('async-mutex').Semaphore;
import { DropdownLight, DropdownDark } from './DropdownStyle';

export default class SelectType extends React.Component {
    constructor(props) {
        // We can't use the ketword "this" until super is called.
        super(props);

        // Trigger the class's load members function.
        SelectType.LoadTypes(this, SelectType.loaded);

        this.state = {
            style: props.style,
            update: props.update,
            placeholder: props.placeholder,
            dark: props.dark ? true : false,
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
                    onValueChange={id => this.state.update({type: SelectType.types[id - 1], id})}
                    items={SelectType.types.map(({label, id}) => ({
                        label,
                        value: id,
                    }))}
                    />
            </View>
        );
    }
}
