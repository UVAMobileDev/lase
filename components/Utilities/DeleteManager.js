import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const deletionGuide = {
    Growth: {
        name: "Growth",
        previewRoute: "Growth Preview",
    },
    MaintenanceRecord: {
        name: "Maintenance Record",
        previewRoute: "Maintenance Record Preview",
    },
    Publication: {
        name: "Publication",
        previewRoute: "Publication Preview",
    },
    WaferLogEntry: {
        name: "Wafer Log Entry",
        previewRoute: "Wafer Log Entry Preview",
    }
};

const ExecuteDeletion = async (type, id) => {
    return null;
}

export default function DeleteManager(props) {

    // Initialize deletion target based on whether we were navigated here by a delete button from elsewhere.
    const [deletionTarget, setTarget] = useState(props.route.params && props.route.params.toDelete ? props.route.params.toDelete : {
        type: "Growth",
        id: null,
    });

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <Text>Delete an item from the database</Text>
                    <Text>Select the type of item you are attempting to remove, then enter its unique ID.</Text>
                    <RNPickerSelect
                        onValueChange={type => setTarget({type, id: null})}
                        placeholder={{}}
                        value={deletionTarget.type}
                        items={Object.keys(deletionGuide).map(type => ({label: deletionGuide[type].name, value: type}))}
                        />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        margin: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    }
});
