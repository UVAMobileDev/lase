import React, { useContext, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../Footer';
import { LightStyles, DarkStyles } from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';

export default function News(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    return (
        <View style={styles.componentBackground}>
            <Text style={styles.lblPrimaryHeading}>News</Text>
            <Footer />
        </View>
    );
}

const LocalStyles = {}
