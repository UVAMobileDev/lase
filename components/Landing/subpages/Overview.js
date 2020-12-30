// The overview is the first page which we see when loading up the application.
//  It's based on the current default landing page for LASE. This component uses
//  hooks, so read carefully.

// Imports
import React, { useState, useEffect, useContext, useReducer } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Publication from '../../Publications/Publication.js';
import Footer from '../Footer';
import { BASE_URL } from '../../../constants/API.js';
import { LightStyles, DarkStyles, Colors} from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';
import { LinkOpener, GetDimension, onWeb } from '../../../constants/SimpleFunctions';

// The number of recent publications to show on the page.
const N_PUBS = 7;

// Helper method which retrieves the list of current publications from the API.
//  Since we want the most recent ones, it also sorts the publciations by date
//  before returning.
const GetPublications = async () => {
    // Get the response and convert it to JSON format.
    let response = await fetch(`${BASE_URL}/publications`);
    let parsed = await response.json();

    // Define a sorter and use it to sort the publications array (not in place).
    let sorter = (a, b) => {
        let aYear = parseInt(a.year) || 0, bYear = parseInt(b.year) || 0;
        let aMonth = parseInt(a.month) || 0, bMonth = parseInt(b.month) || 0;
        let aDay = parseInt(a.day) || 0, bDay = parseInt(b.day) || 0;
        return aYear === bYear ? aMonth === bMonth ? aDay === bDay ? 0 : bDay - aDay : bMonth - aMonth : bYear - aYear;
    }
    return parsed.publications.sort(sorter);
}

export default function Overview(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    // Creates a hook with the initial state as an object with two properties.
    let [publications, setPublications] = useState({loaded: false, items: []});

    // When the component is loaded, "effects" are run. This effect gets the list
    //  of publications and then saves it with the hook.
    useEffect(() => {
        let load = async () => {
            let publications = await GetPublications();
            setPublications({loaded: true, items: publications.filter((_, i) => i < N_PUBS)});
        }
        load();
    }, [0]);

    return (
        <View style={[styles.componentBackground, {flexDirection: "column"}]}>
            <ScrollView>
                <Image
                    style={styles.headerEquipment}
                    source={require('../../../assets/header_equipment.jpg')}/>
                <View style={styles.section}>
                    <Image  style={styles.imageMER}
                            source={require('../../../assets/MER.jpg')}/>
                    <Text style={[styles.lblColorized, styles.textContainer]}>
                        <Text style={styles.bold}>The Laboratory for Advanced Semiconductor Epitaxy</Text>
                        <Text> is located in the </Text>
                        <Text
                            style={styles.link}
                            onPress={LinkOpener("http://www.mrc.utexas.edu/")}>Microelectronics Research Center</Text>
                        <Text> at the University of Texas at Austin. We are developing advanced materials and devices for electronics and optoelectronics. We are particularly interested in GaSb-based mid-infrared quantum well lasers, THz sources based on epitaxial metal/semiconductor nanocomposites, new plasmonic materials, low-noise III-V avalanche photodiodes, silicon-based lasers for optical interconnects, and silicon-based III-V TFETs. Our secret weapon in this effort is the molecular beam epitaxy </Text>
                        <Text
                            style={styles.link}
                            onPress={() => props.navigation.navigate("What is MBE?")}>(MBE)</Text>
                        <Text> crystal growth technique.</Text>
                    </Text>
                </View>
                <View style={styles.section}>
                    <Image
                        style={styles.imageEquipment}
                        source={require('../../../assets/equipment.jpg')}/>
                    <View style={styles.recentPublications}>
                        <Text style={[styles.bold, styles.lblSecondaryHeading]}>Recent Publications</Text>
                        {
                            // If the publications are loaded, we show them. This is
                            //  done by using a Publication component and a map function.
                            //  Map operates on an array and accepts a function which
                            //  tells it how to transform each element. In this case,
                            //  we transform it into an array of JSX elements.
                            publications.loaded ? publications.items.map(pub => (<Publication key={pub.id} data={pub} dark={dark}/>))
                            : (<ActivityIndicator size="large" color="#00f"/>)
                            // If the loading has not completed yet, however, we just
                            //  show an activity indicator (a spinning circle).
                        }
                    </View>
                </View>
                <View style={[styles.section, {borderBottomWidth: 0}]}>
                    <TouchableOpacity style={styles.map}
                            onPress={LinkOpener("https://www.google.com/maps/place/Microelectronics+Research+Center+Department+of+Electrical+and+Computer+Engineering/@30.3854736,-97.7239656,1317m/data=!3m1!1e3!4m5!3m4!1s0x0:0xe0cecd958d703f34!8m2!3d30.3859033!4d-97.7280911")}>
                        <Image
                            style={{
                                padding: 5,
                                borderColor: "#aaa",
                                borderWidth: 1,
                            }}
                            source={{
                                uri: "https://i.gyazo.com/46236e2110e11f2e7ae142799e3f02c3.png",
                                width: 200,
                                height: 175,
                            }}/>
                    </TouchableOpacity>
                    <View style={styles.professorArea}>
                        <Image
                            style={styles.sethBank}
                            source={require('../../../assets/Seth_Bank.jpg')}/>
                        <View style={styles.professorText}>
                            <Text style={styles.bold}>
                                Seth R. Banks
                            </Text>
                            <Text style={styles.italics}>
                                Cullen Trust Endowed Prof. No. 6
                            </Text>
                            <Text style={styles.italics}>
                                Full Professor
                            </Text>
                            <Text>
                                <Text>Email: </Text>
                                <Text style={styles.link} onPress={LinkOpener("mailto:sbank@ece.utexas.edu")}>sbank_at_ece.utexas.edu</Text>
                            </Text>
                            <Text style={[styles.bold, {marginBottom: 1, marginTop: 5}]}>
                                Offices:
                            </Text>
                            <Text>
                                2.606C MER (main office)
                            </Text>
                            <Text>
                                3.876 EER (teaching office)
                            </Text>
                            <Text style={[styles.bold, {marginBottom: 1, marginTop: 5}]}>
                                Mailing address:
                            </Text>
                            <Text>
                                10100 Burnet Road, Bldg. #160
                            </Text>
                            <Text>
                                MER 2.606C, R9900
                            </Text>
                            <Text>
                                Austin, TX 78758
                            </Text>
                        </View>
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </View>
    );
}

// There's a huge amount of platform dependent styling going on here. Platform
//  dependent code in general should be avoided in React since the purpose of the
//  framework is to make it easier to operate on multiple platforms. However, there
//  are some situations where it's easier to do a bunch of ternary platform checks
//  than to come up with a more robust solution.
const LocalStyles = {
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    section: {
        flexDirection: onWeb ? "row" : "column",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: "#aaa",
        borderBottomWidth: 1,
        marginRight: onWeb ? 0 : 10,
        marginLeft: onWeb ? 0 : 10,
        paddingRight: onWeb ? 10 : 0,
    },
    imageMER: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: onWeb ? 0 : 15,
        width: 350,
        height: 233,
        borderColor: "#aaa",
        borderWidth: 1,
    },
    imageEquipment: {
        marginLeft: onWeb ? 20 : 0,
        marginRight: onWeb ? 20 : 4,
        width: onWeb ? 250 : 300,
        height: onWeb ? 525 : 275,
        borderColor: "#aaa",
        borderWidth: 1,
    },
    headerEquipment: {
        width: GetDimension(754, 173, true),
        height: GetDimension(754, 173, false),
        paddingBottom: 20,
        borderColor: "#000000",
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    recentPublications: {
        marginTop: 15,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    map: {
        margin: 15,
        alignItems: "center",
    },
    textContainer: {
        flexWrap: "wrap",
        flexShrink: 1,
        margin: onWeb ? 0 : 5,
        textAlign: "center",
    },
    sethBank: {
        width: 150,
        height: 150,
    },
    professorArea: {
        flexDirection: "row",
        alignItems: "center",
    },
    professorText: {
        margin: 5,
    },
};
