// All imports
import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../../constants/API';
const fetch = require('node-fetch');
import Publication from '../Publication';
import KeyContext from '../../../KeyContext';
import { LightStyles, DarkStyles, Colors } from '../../../constants/globalStyle';


export default function Bibliography(props) {
    // Dark mode stuff
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    // Actual bibliography content
    const [citations, loadCits] = useState({loaded: false, items: []});

    useEffect(() => {

        loadCits({loaded: false, items: []});

        let load = async () => {
            let items = await Promise.all(Object.keys(props.route.params.ids).map(async id => {
                let { publications } = await fetch(`${BASE_URL}/publications?id=${id}`).then(r => r.json());
                return (<Publication data={publications[0]} />);
            }));

            loadCits({loaded: true, items})
        }
        load();
    }, [props.route.params]);

    return (
        <View style={[styles.componentBackground, {flex: 1}]}>
            <ScrollView style={[styles.lblColorized,{flex: 1}]}>
                {citations.loaded ? citations.items : (
                    <ActivityIndicator />
                )}
            </ScrollView>
        </View>
    )
}

const LocalStyles = {

};
