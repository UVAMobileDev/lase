// Displays a single publication in a readable format. What the component does
//  behind the hood (how exactly it works) is a great example of the syntactical
//  hell that Javascript can be.

import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { BASE_URL } from '../../constants/API';

const fetch = require('node-fetch');
var Semaphore = require('async-mutex').Semaphore;


const abbreviateAuthors = authors => {
    let names = authors.split(' and ');
    names.forEach((name, index, array) => {
        if(name.substring(1, 1) === '.') return;
        array[index] = `${name.substring(0, 1)}. ${name.substring(name.indexOf(' ') + 1)}`;
    });

    return names.join(', ');
    // `${author.substring(0, 1)}. ${author.substring(author.indexOf(' ') + 1).replace(' and ', ', ')}`
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const nameMonth = month => months[parseInt(month)] || month;

const Formatters = [
    undefined, // No publication with type 0

    // (Invited) S.R. Bank, J.C. Campbell, S.J. Maddox, M. Ren, A.K. Rockwell, M.E. Woodson, and S.D. March, "Avalanche Photodiodes Based on the AlInAsSb Materials System," IEEE J. Sel. Top. Quantum Electron., vol. 24, no. 2, Mar. 2018.
    pub => (
        <Text style={styles.publication}>
            <Text style={[styles.bold, styles.italics]}>
                {
                    pub.note ? `(${pub.note}) ` : ``
                }
            </Text>
            <Text style={styles.bold}>
                {abbreviateAuthors(pub.author)}
            </Text>
            <Text>
                {`, "${pub.title}," `}
            </Text>
            <Text style={styles.italics}>
                {`${pub.journal}`}
            </Text>
            <Text>
                {`, vol. ${pub.volume}, no. ${pub.number}, ${nameMonth(pub.month)}. ${pub.year}.`}
            </Text>
        </Text>
    ),
    pub => (<Text>No publication renderer for type `book`</Text>),
    pub => (<Text>No publication renderer for type `booklet`</Text>),

    // (Invited) S.R. Bank, "New approaches to the seamless integration of plasmonics, metasurfaces, and dielectric scatters into photonic devices," Materials Research Symposium (MRS) Fall Meeting, Boston, MA, Nov. 2017.
    pub => (
        <Text style={styles.publication}>
            <Text style={[styles.bold, styles.italics]}>
                {
                    pub.note ? `(${pub.note}) ` : ``
                }
            </Text>
            <Text style={styles.bold}>
                {abbreviateAuthors(pub.author)}
            </Text>
            <Text>
                {`, "${pub.title}" `}
            </Text>
            <Text style={styles.italics}>
                {`${pub.bookTitle}`}
            </Text>
            <Text>
                {`, ${pub.address}, ${nameMonth(pub.month)}. ${pub.year}.`}
            </Text>
        </Text>
    ),
    // pub => `${pub.note ? `(${pub.note})` : ``} ${pub.author}, "${pub.title}" ${pub.bookTitle}, ${pub.address}, ${pub.month} ${pub.year}.`, //`conference`,
    pub => (<Text>No publication renderer for type `electronic`</Text>),
    pub => (<Text>No publication renderer for type `inbook`</Text>),
    pub => (<Text>No publication renderer for type `incollection`</Text>),
    pub => (<Text>No publication renderer for type `inproceedings`</Text>),
    pub => (<Text>No publication renderer for type `manual`</Text>),
    pub => (<Text>No publication renderer for type `mastersthesis`</Text>),
    pub => (<Text>No publication renderer for type `misc`</Text>),
    pub => (<Text>No publication renderer for type `other`</Text>),
    pub => (<Text>No publication renderer for type `patent`</Text>),
    pub => (<Text>No publication renderer for type `periodical`</Text>),
    pub => (<Text>No publication renderer for type `phdthesis`</Text>),
    pub => (<Text>No publication renderer for type `proceedings`</Text>),
    pub => (<Text>No publication renderer for type `standard`</Text>),
    pub => (<Text>No publication renderer for type `techreport`</Text>),
    pub => (<Text>No publication renderer for type `unpublished`</Text>),
];

const FormatPublication = pub => Formatters[pub.typeID](pub);

export default class Publication extends React.Component {
    constructor(props) {
        super(props);
        Publication.LoadTypes(this); // Load types, if they haven't been yet.
        this.state = {
            publication: props.data,
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

    render() {
        if(Publication.loadedTypes) return (
            <View>
                {FormatPublication(this.state.publication)}
            </View>
        )
        return (<View/>);
    }
}

const styles = StyleSheet.create({
    publication: {
        width: Platform.OS === "web" ? 450 : Dimensions.get('window').width - 20,
        flexShrink: 1,
        margin: 5,
    },
    bold: {
        fontWeight: "bold",
    },
    italics: {
        fontStyle: "italic",
    },
});
