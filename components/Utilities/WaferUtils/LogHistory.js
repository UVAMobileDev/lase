import React, { useEffect, useReducer, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';
import { LightStyles, DarkStyles, Colors } from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';
import LogEntry from './LogEntry';

export default function LogHistory({ route }) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const [entryData, appendEntries] = useReducer(({entries, page}, new_items) => ({entries: entries.concat(new_items), page: page + 1}), {entries: [{id: "ID", timestamp: (<Text style={styles.sp}>Timestamp</Text>), notes: (<Text style={styles.sp}>Reason</Text>), wafersAdded: (<Text style={styles.sp}>Wafer Delta</Text>)}], page: 0});
    const [moreToFetch, setMore] = useState(true);

    const fetchMore = async () => {
        if(!moreToFetch) return;
        let response = await fetch(`${BASE_URL}/wafers/${route.params.substrate}?page=${entryData.page}`).then(r => r.json());
        if(!response.entries || response.entries.length === 0) setMore(false);
        else appendEntries(response.entries);
    }

    return (
        <View style={styles.mainBackground}>
            <FlatList
                data={entryData.entries}
                keyExtractor={entry => entry.id.toString()}
                renderItem={({item}) => (
                    <LogEntry data={item} />
                )}
                onEndReachedThreshold={.3}
                onEndReached={fetchMore}/>
        </View>
    );
}

const LocalStyles = {
};
