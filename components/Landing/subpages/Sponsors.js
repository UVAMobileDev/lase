// At the time of writing this comment, Sponsors is the simplest component in the
//  application. It's just a scaled image.

// Imports
import React, { useContext, useReducer, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Footer from '../Footer';
import { LightStyles, DarkStyles, Colors} from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';

export default function Sponsors(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    return (
        <View style={styles.componentBackground}>
        <ScrollView>
            <Image  style={styles.img}
                    source={require('../../../assets/Sponsors.jpeg')}/>
            <Footer />
        </ScrollView>
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
const LocalStyles = {
    img: {
        marginVertical: 15,
        alignSelf: "center",
        width: GetDimension(700, 525, true),
        height: GetDimension(700, 525, false),
    }
};
