import React, { useEffect, useReducer, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { LightStyles, DarkStyles, Colors } from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';

export default function STO(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    return (
        <View style={styles.mainBackground}>
            <Text>Future home of the STO generator.</Text>
        </View>
    );
}

const LocalStyles = {};
