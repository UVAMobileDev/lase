// Displays a single publication in a readable format. What the component does
//  behind the hood (how exactly it works) is a great example of the syntactical
//  hell that Javascript can be.

import React, { useContext, useReducer, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { BASE_URL } from '../../constants/API';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';
import KeyContext from '../../KeyContext';
const fetch = require('node-fetch');
var Semaphore = require('async-mutex').Semaphore;

const abbreviateAuthors = authors => {
    let names = authors.split(' and ');
    names.forEach((name, index, array) => {
        if(name.substring(1, 1) === '.') return;
        array[index] = `${name.substring(0, 1)}. ${name.substring(name.indexOf(' ') + 1)}`;
    });

    return names.join(', ');
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const nameMonth = month => months[parseInt(month)] || month;

const LocalStyles = {
    publication: {
        width: Platform.OS === "web" ? 450 : Dimensions.get('window').width - 20,
        flexShrink: 1,
        margin: 5,
    },
};
const LightStyleSet = StyleSheet.create({...LightStyles, ...LocalStyles});
const DarkStyleSet = StyleSheet.create({...DarkStyles, ...LocalStyles});

const Formatters = [
    undefined, // No publication with type 0

    // (Invited) S.R. Bank, J.C. Campbell, S.J. Maddox, M. Ren, A.K. Rockwell, M.E. Woodson, and S.D. March, "Avalanche Photodiodes Based on the AlInAsSb Materials System," IEEE J. Sel. Top. Quantum Electron., vol. 24, no. 2, Mar. 2018.
    (pub, dark) => (
        <Text style={[dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized, LightStyleSet.publication]}>
            <Text style={[LightStyleSet.bold, LightStyleSet.italics]}>
                {
                    pub.note ? `(${pub.note}) ` : ``
                }
            </Text>
            <Text style={LightStyleSet.bold}>
                {abbreviateAuthors(pub.author)}
            </Text>
            <Text>
                {`, "${pub.title}," `}
            </Text>
            <Text style={LightStyleSet.italics}>
                {`${pub.journal}`}
            </Text>
            <Text>
                {`, vol. ${pub.volume}, no. ${pub.number}, ${nameMonth(pub.month)}. ${pub.year}.`}
            </Text>
        </Text>
    ),
    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `book`
    </Text>),
    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `booklet`</Text>),

    // (Invited) S.R. Bank, "New approaches to the seamless integration of plasmonics, metasurfaces, and dielectric scatters into photonic devices," Materials Research Symposium (MRS) Fall Meeting, Boston, MA, Nov. 2017.
    (pub, dark) => (
        <Text style={[dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized, LightStyleSet.publication]}>
            <Text style={[LightStyleSet.bold, LightStyleSet.italics]}>
                {
                    pub.note ? `(${pub.note}) ` : ``
                }
            </Text>
            <Text style={LightStyleSet.bold}>
                {abbreviateAuthors(pub.author)}
            </Text>
            <Text>
                {`, "${pub.title}" `}
            </Text>
            <Text style={LightStyleSet.italics}>
                {`${pub.bookTitle}`}
            </Text>
            <Text>
                {`, ${pub.address}, ${nameMonth(pub.month)}. ${pub.year}.`}
            </Text>
        </Text>
    ),
    // (pub, dark) => `${pub.note ? `(${pub.note})` : ``} ${pub.author}, "${pub.title}" ${pub.bookTitle}, ${pub.address}, ${pub.month} ${pub.year}.`, //`conference`,
    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `electronic`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `inbook`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `incollection`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `inproceedings`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `manual`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `mastersthesis`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `misc`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `other`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `patent`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `periodical`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `phdthesis`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `proceedings`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `standard`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `techreport`
    </Text>),

    (pub, dark) => (<Text
        style={dark ? DarkStyleSet.lblColorized : LightStyleSet.lblColorized}>
        No publication renderer for type `unpublished`
    </Text>),

];

const FormatPublication = (pub, dark) => Formatters[pub.typeID](pub, dark);

export default class Publication extends React.Component {
    constructor(props) {
        super(props);
        Publication.LoadTypes(this); // Load types, if they haven't been yet.
        console.log("publication dark mode", props.dark);
        this.state = {
            publication: props.data,
            dark: props.dark ? true : false,
        }
    }

    static LoadTypesSemaphore = new Semaphore(1);
    static publicationTypes = [];
    static loadedTypes = false;
    static async LoadTypes(instance) {
        const [_, release] = await this.LoadTypesSemaphore.acquire();
        try {
            if(this.loadedTypes) return;
            // Publication types have not been loaded yet. Load them now.

            let parsed = await fetch(`${BASE_URL}/publications/types`).then(resp => resp.json());
            this.publicationTypes = parsed.types;

            // Types have now been loaded.
            this.loadedTypes = true;
        } finally {
            release(); // Release the semaphore
            // Trigger a rerender by changing a trivial state property
            instance.setState(Object.assign({_: true}, instance.state));
        }
    }

    componentDidUpdate({dark}) {
        if(dark === this.props.dark) return;
        this.setState({...this.state, dark: this.props.dark});
    }

    render() {
        if(Publication.loadedTypes) return (
            <View>
                {FormatPublication(this.state.publication, this.state.dark)}
            </View>
        )
        return (<View/>);
    }
}
