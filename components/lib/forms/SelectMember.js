// Form component which allows to select between different LASE members.
// To avoid duplicating web requests, the component utilizes static class resources
// to fetch and store the list of systems ONE time, then use that list whenever it
// is needed.

// Imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const fetch = require('node-fetch');
import { BASE_URL } from '../../../constants/API';

// Semaphores are a simple way to manage asynchronicity. They're not always the
//  best or easiest depending on the situation, but for our purposes they provide
//  all the locking functionality we require.
var Semaphore = require('async-mutex').Semaphore;

// Note that this is a class component. Since some information must be shared
//  between any two instances of a SelectMember component (the list of members),
//  it can't be a functional component.
export default class SelectMember extends React.Component {
    constructor(props) {
        // We can't use the ketword "this" until super is called.
        super(props);

        // Trigger the class's load members function.
        SelectMember.LoadMembers(this, SelectMember.loaded);

        // Update is a function passed to this component from whereever it was
        //  invoked. It should be a function which accepts the new value of this
        //  component's input field and saves it. The best example would be passing
        //  the update function of a hook.
        this.state = {
            style: props.style || {},
            update: props.update,
            placeholder: props.placeholder
        };
    }

    // Static class variables
    static loaded = false;
    static members = [];
    static lock = new Semaphore(1);

    // Static class function which attempts to load the set of members from the API.
    static LoadMembers = async (instance, alreadyDone) => {
        // If the loading has already been completed, just stop now.
        if(alreadyDone) return;

        // The use of underscore is a stylistic choice by me. I like to use it to
        //  indicate that I understand a variable is being bound here, but I have
        //  no use for it and I therefore don't need to bind it to a name.
        // In this case, a Semaphore's acquire method returns the value of the
        //  Semaphore and a function to cede control to someone else. I don't need
        //  the value of the Semaphore, just the release function, so I am binding
        //  the value to an underscore.
        const [_, release] = await SelectMember.lock.acquire();
        try {
            // We check a second time to see if the list of members has been loaded.
            //  The first check covered the case that it was done when this function
            //  was invoked, but this check covers the case that the loading was
            //  completed while we were waiting to acquire the lock but after we
            //  checked the first time.
            if(SelectMember.loaded) return;

            // Grab the list from the API and convert it to json
            let parsed = await fetch(`${BASE_URL}/settings/members`).then(r => r.json());

            // Store the resulting list and mark the list as loaded.
            // Note: a common fallacy is to only store an array. Then, to see if
            //  the list has been loaded, simply check if the list has a size larger
            //  than zero. Unfortunately, if the API encounters a problem and gives
            //  us an empty list, as it's answer, we then have no way of knowing
            //  whether the empty list was the result of loading or a sign that
            //  the list hasn't been loaded.
            SelectMember.members = parsed.members.map(member => member.name).sort();
            SelectMember.loaded = true;
        } finally {
            // "Finally" runs regardless of whether the above code in the "try"
            //  crashed or not. This is important because no matter what happens
            //  above, we have to release the lock to prevent the potential
            //  blocking of other instances.
            release();

            // This is a hacky way to trigger a rerender in the component we were
            //  called from. Since components automatically rerender whenever their
            //  state changes, we just add a trivial property (_: null) to the current
            //  state, whose addition forces the component to rerender. This is
            //  needed since only the component's state causes a rerender... i.e.
            //  changes to static variables don't induce a rerender.
            instance.setState(Object.assign({_: true}, instance.state));
        }
    }

    render() {
        return (
            <View style={this.state.style}>
                <RNPickerSelect style={pickerStyle}
                                placeholder={this.state.placeholder || {label: "Select an item...", value: ""}}
                                InputAccessoryView={() => null}
                                onValueChange={member => this.state.update(member)}
                                items={SelectMember.members.map(member => (
                                    {label: `${member}`, value: member}
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
