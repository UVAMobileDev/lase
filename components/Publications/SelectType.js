// Imports
import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';
const fetch = require('node-fetch');
import { BASE_URL } from '../../constants/API';


var Semaphore = require('async-mutex').Semaphore;



export default class SelectType extends React.Component {
    constructor(props) {
        // We can't use the ketword "this" until super is called.
        super(props);

        // Trigger the class's load members function.
        SelectType.LoadTypes(this, SelectType.loaded);

        // Update is a function passed to this component from whereever it was
        //  invoked. It should be a function which accepts the new value of this
        //  component's input field and saves it. The best example would be passing
        //  the update function of a hook.
        this.state = {
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


            SelectType.types = parsed.types.map(type => type.type).sort();
            SelectType.loaded = true;
        } finally {

            release();


            instance.setState(Object.assign({_: true}, instance.state));
        }
    }

    render() {
        return (
            <View>
                <Picker style={styles.picker}
                        onValueChange={(value, index) => this.state.update(value)}>
                    <Picker.Item key={-1} label={this.state.placeholder.label} value={this.state.placeholder.value}/>
                    {SelectType.types.map((name, index) => (
                        <Picker.Item key={index} label={name} value={name}/>
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
