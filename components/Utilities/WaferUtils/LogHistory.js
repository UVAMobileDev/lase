import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { BASE_URL } from '../../../constants/API.js';

export default function LogHistory({ route }) {

    const [entryData, appendEntries] = useReducer(({entries, page}, new_items) => ({entries: entries.concat(new_items), page: page + 1}), {entries: [{id: "ID", timestamp: (<Text style={{fontFamily: "sans-serif"}}>Timestamp</Text>), notes: (<Text style={{fontFamily: "sans-serif"}}>Reason</Text>), wafersAdded: (<Text style={{fontFamily: "sans-serif"}}>Wafer Delta</Text>)}], page: 0});
    const [moreToFetch, setMore] = useState(true);

    const fetchMore = async () => {
        if(!moreToFetch) return;
        let response = await fetch(`${BASE_URL}/wafers/${route.params.substrate}?page=${entryData.page}`).then(r => r.json());
        if(!response.entries || response.entries.length === 0) setMore(false);
        else appendEntries(response.entries);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={entryData.entries}
                keyExtractor={entry => entry.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.historyRow}>
                        <Text style={[styles.rowTextItem, styles.mono]}>{item.id}</Text>
                        <Text style={[styles.rowTextItem, styles.mono]}>{item.timestamp}</Text>
                        <Text style={[styles.rowTextItem, styles.mono]}>{item.notes}</Text>
                        <Text style={[styles.mono, {width: 50, textAlign: "right"}]}>{item.wafersAdded}</Text>
                    </View>
                )}
                onEndReachedThreshold={.3}
                onEndReached={fetchMore}/>
        </View>
    );
}

const styles = StyleSheet.create({
    mono: {
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    },
    rowTextItem: {
        textAlign: "left",
    },
    historyRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 3,
        maxWidth: 450,
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    }
});
