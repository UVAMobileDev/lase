// The overview is the first page which we see when loading up the application.
//  It's based on the current default landing page for LASE. This component uses
//  hooks, so read carefully.

// Imports
import React, { useState, useEffect } from 'react';
import { openURL } from 'expo-linking';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Publication from '../../Publications/Publication.js';
import Footer from '../Footer';
import { BASE_URL } from '../../../constants/API.js';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Publications(props) {
    const [pubs, setPubs] = useState({loaded: false, items: []});
    useEffect(() => {
        let get = async () => {
            let items = [], page = 0;
            while(true) {
                let resp_items = await fetch(`${BASE_URL}/publications?page=${page}`).then(r => r.json());
                items = items.concat(resp_items.publications);
                page++;
                if(resp_items.publications.length < 100) break;
            }
            let sorter = (a, b) => {
                let aYear = parseInt(a.year) || 0, bYear = parseInt(b.year) || 0;
                let aMonth = parseInt(a.month) || 0, bMonth = parseInt(b.month) || 0;
                let aDay = parseInt(a.day) || 0, bDay = parseInt(b.day) || 0;
                return aYear === bYear ? aMonth === bMonth ? aDay === bDay ? 0 : bDay - aDay : bMonth - aMonth : bYear - aYear;
            }
            setPubs({loaded: true, items: items.sort(sorter)})
        }
        get();
    }, []);

    return (
        <View style={styles.container}>
            {pubs.loaded ? (
                <ScrollView style={{padding: 15}}>
                    <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>Showing {pubs.items.length} publications</Text>
                    <View>
                        {pubs.items.map(pub => (
                            <View
                                style={{flexDirection: "row", alignItems: "center"}}>
                                <Publication
                                    key={pub.id}
                                    data={pub}
                                    />
                                {pub.file ? (
                                    <TouchableOpacity
                                        style={{flexDirection: "row", alignItems: "center", margin: 5}}
                                        onPress={() => Platform.OS === "web" ? window.open(`https://lase.mer.utexas.edu/documents/library/${pub.file.indexOf(":") > -1 ? pub.file.substring(0, pub.file.indexOf(":")) : pub.file}`, "_blank") : openURL(`https://lase.mer.utexas.edu/documents/library/${pub.file.indexOf(":") > -1 ? pub.file.substring(0, pub.file.indexOf(":")) : pub.file}`)}>
                                        <Entypo name="link" size={24} color="blue" />
                                        <Text>PDF</Text>
                                    </TouchableOpacity>
                                ) : (<View/>)}
                                {pub.url ? (
                                    <TouchableOpacity
                                        style={{flexDirection: "row", alignItems: "center"}}
                                        onPress={() => Platform.OS === "web" ? window.open(pub.url, "_blank") : openURL(pub.url)}>
                                        <MaterialCommunityIcons name="file-document-box-check-outline" size={24} color="blue" />
                                        <Text>DOI</Text>
                                    </TouchableOpacity>
                                ) : (<View/>)}
                            </View>
                        ))}
                    </View>
                    <Footer />
                </ScrollView>
            ) : (
                <ActivityIndicator style={{margin: 25}}/>
            )}
        </View>
    );
}

// There's a huge amount of platform dependent styling going on here. Platform
//  dependent code in general should be avoided in React since the purpose of the
//  framework is to make it easier to operate on multiple platforms. However, there
//  are some situations where it's easier to do a bunch of ternary platform checks
//  than to come up with a more robust solution.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
    },

});
