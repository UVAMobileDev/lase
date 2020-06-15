// At the time of writing this comment, Sponsors is the simplest component in the
//  application. It's just a scaled image.

// Imports
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

export default function Sponsors(props) {
    return (
        <View style={styles.container}>
            <View style={{padding: 15}}/>
            <Image  style={styles.img}
                    source={require('../../../assets/Sponsors.jpeg')}/>
        </View>
    );
}

// Helper to scale images.
const GetDimension = (width, height, getWidth) => {
    let w = Dimensions.get('window').width;
    if(getWidth) {
        return width > w ? w : width;
    } else {
        return width > w ? (w / width) * height : height;
    }
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    img: {
        width: GetDimension(700, 525, true),
        height: GetDimension(700, 525, false),
    }
});
