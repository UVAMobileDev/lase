// Form component which allows to select between different available LASE systems.
// To avoid duplicating web requests, the component utilizes static class resources
// to fetch and store the list of systems ONE time, then use that list whenever it
// is needed.

// Imports
import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';
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
                <Picker style={styles.picker}
                        onValueChange={(value, index) => this.state.update(value)}>
                    <Picker.Item key={-1} label={this.state.placeholder.label} value={this.state.placeholder.value}/>
                    {SelectSystem.systems.map((sys, index) => (
                        <Picker.Item key={index} label={sys} value={sys}/>
                    ))}
                </Picker>
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
