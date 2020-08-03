import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MonthBrowser from '../../lib/cal/MonthBrowser';
import moment from 'moment';

import { BASE_URL } from '../../../constants/API';

// Fetch growths from a single month:
// https://api.lase.mer.utexas.edu/v1/machine/Echo/growths?mindate=2015-01-15&maxdate=2015-01-19
// `${BASE_URL}/machine/${system}/growths?mindate=2015-01-15&maxdate=2015-01-19`
const Events = growths => growths.reduce((acc, cur) => {
    let m = moment(cur.date);
    let events = acc[m.date()];
    acc[m.date()] = events ? events + 1 : 1;
    return acc;
}, {});

export default function GrowthCalendar(props) {
    const [month, setMonth] = useState();
    const [growths, setGrowths] = useState([]);
    const [systems, setSystems] = useState([]);

    useEffect(() => {
        const load = async () => {
            let resp = await fetch(`${BASE_URL}/settings/machines`).then(r => r.json());
            setSystems(resp.machines || []);
        }
        load();
    }, []);

    // When the month changes, we should look for more events.
    useEffect(() => {
        setGrowths([]);
        const load = async () => {
            let items = await Promise.all(systems.map(async sys => {
                let resp = await fetch(`${BASE_URL}/machine/${sys}/growths?mindate=${month.format("YYYY-MM-DD")}&maxdate=${moment(month).date(month.daysInMonth()).format("YYYY-MM-DD")}`).then(r => r.json());
                return resp.results || [];
            }));
            setGrowths(items.reduce((acc, cur) => acc.concat(cur), []));
        }
        load();
    }, [systems, month]);

    return (
        <View>
            <Text>Future home of the GrowthCalendar.</Text>
            <MonthBrowser
                    onMonthChange={setMonth}
                    events={Events(growths)}/>
        </View>
    );
}
