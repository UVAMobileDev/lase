// The overview is the first page which we see when loading up the application.
//  It's based on the current default landing page for LASE. This component uses
//  hooks, so read carefully.

// Imports
import React, { useContext, useReducer, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Publication from '../../Publications/Publication.js';
import Footer from '../Footer';
import { BASE_URL } from '../../../constants/API.js';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { LightStyles, DarkStyles, Colors} from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';
import { LinkOpener } from '../../../constants/SimpleFunctions';

export default function Publications(props) {
    const { key, dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const [pubs, setPubs] = useState({loaded: false, items: []});
    useEffect(() => {
        let get = async () => {
            let items = [], page = 0;
            while(true) {
                let resp_items = await fetch(`${BASE_URL}/publications?page=${page}`, {
                    method: "GET",
                    headers: { "x-api-key": key }
                }).then(r => r.json());
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
        <View style={styles.componentBackground}>
            {pubs.loaded ? (
                <ScrollView style={{padding: 15}}>
                    <Text style={[styles.lblPrimaryHeading, styles.bold]}>Showing {pubs.items.length} publications</Text>
                    <View>
                        {pubs.items.map(pub => (
                            <View key={pub.id}
                                style={styles.horiztonalItemWrapper}>
                                <Publication
                                    key={pub.id}
                                    data={pub}
                                    dark={dark}
                                    />
                                {pub.file ? (
                                    <TouchableOpacity
                                        style={[styles.horiztonalItemWrapper, {margin: 5}]}
                                        onPress={LinkOpener(`https://lase.mer.utexas.edu/documents/library/${pub.file.indexOf(":") > -1 ? pub.file.substring(0, pub.file.indexOf(":")) : pub.file}`)}>
                                        <Entypo name="link" size={24} color="blue" />
                                        <Text style={styles.lblColorized}>PDF</Text>
                                    </TouchableOpacity>
                                ) : (<View/>)}
                                {pub.url ? (
                                    <TouchableOpacity
                                        style={styles.horiztonalItemWrapper}
                                        onPress={LinkOpener(pub.url)}>
                                        <MaterialCommunityIcons name="file-document-box-check-outline" size={24} color="blue" />
                                        <Text style={styles.lblColorized}>DOI</Text>
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

const LocalStyles = {}
