import React from 'react';
import { View, Text, StyleSheet, Image, Linking, Platform } from 'react-native';
import { LightStyles } from '../../constants/globalStyle';

function LinkOpener(url) {
    if(Platform.OS === "web") return () => window.open(url);
    return () => Linking.openURL(url);
}

export default function Footer() {
    return (
        <View style={styles.botContainer}>
            <View style={styles.contact}>
                <Text style={styles.mini}>
                    <Text style={{color: "#777777"}}>© 2012 </Text>
                    <Text style={styles.link} onPress= {LinkOpener("http://www.ece.utexas.edu/")}>UT ECE</Text>
                    <Text style={{color: "#777777"}}>  |  </Text>
                    <Text style={styles.link} onPress= {LinkOpener("https://www.engr.utexas.edu/")}>Cockrell School of Engineering</Text>
                    <Text style={{color: "#777777"}}>  |  </Text>
                    <Text style={styles.link} onPress= {LinkOpener("https://www.utexas.edu/")}>The University of Texas at Austin{'\n'}</Text>
                </Text>

                <Text style={styles.mini}>
                    <Text style={styles.link} onPress= {LinkOpener("https://policies.utexas.edu/")}>Private Information</Text>
                    <Text style={{color: "#777777"}}>  |  </Text>
                    <Text style={styles.link} onPress= {LinkOpener("https://www.utexas.edu/web/guidelines/accessibility.html")}>Resources for Accesibility</Text>
                </Text>

                <Text style={styles.mini}>
                    <Text style={{color: "#777777"}}>Comments: </Text>
                    <Text
                        style={styles.link}
                        onPress={LinkOpener("sbank_at_ece.utexas.edu")}>
                        sbank_at_ece.utexas.edu
                    </Text>
                </Text>

            </View>
            <Image style={styles.logo}
                source={{uri: "https://lase.mer.utexas.edu/images/footer_logo.jpg" }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    ...LightStyles,
	contact: {
		height: 50,
		paddingVertical: 5,
        paddingHorizontal: 10,
	},
	botContainer: {
        paddingTop: 10,
		flexDirection: 'row',
        justifyContent: "space-between",
		padding: 5,
        marginTop: 10,
		marginBottom: 60,
        borderColor: "#aaa",
        borderTopWidth: 2,
	},
	logo: {
		width: 200,
		height: 50,
		alignItems: 'flex-end',
	},
});
