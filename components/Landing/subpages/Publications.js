// The overview is the first page which we see when loading up the application.
//  It's based on the current default landing page for LASE. This component uses
//  hooks, so read carefully.

// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Publication from '../../Publications/Publication.js';
import Footer from '../Footer';
import { BASE_URL } from '../../../constants/API.js';

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
                return aYear === bYear ? aMonth === bMonth ? aDay === bDay ? 0 : aDay - bDay : aMonth - bMonth : aYear - bYear;
            }
            setPubs({loaded: true, items: items.sort(sorter)})
        }
        get();
    }, []);

    return (
        <View style={styles.container}>
            {
                pubs.loaded ? (
                    <ScrollView >
                        <Text>Showing {pubs.items.length} publications.</Text>
                        <View>
                            {pubs.items.map(pub => (<Publication key={pub.id} data={pub} />))}
                        </View>
                        <Footer />
                    </ScrollView>
                ) : (<ActivityIndicator/>)
            }
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
