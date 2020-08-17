import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';

export default function Footer() {
    return (
        <View style = {styles.botContainer}>
            <View style = {styles.contact}>
                <Text style = {styles.smallText}> © 2012
                    <Text style = {styles.mini} onPress= {() => Linking.openURL("http://www.ece.utexas.edu/")}> UT ECE </Text>
                    <Text> | </Text>
                    <Text style = {styles.mini} onPress= {() => Linking.openURL("https://www.engr.utexas.edu/")}> Cockrell School of Engineering </Text>
                    <Text> | </Text>
                    <Text style = {styles.mini} onPress= {() => Linking.openURL("https://www.utexas.edu/")}> The University of Texas at Austin {'\n'}</Text>
                </Text>

                <Text style = {styles.smallText}>
                    <Text style = {styles.mini} onPress= {() => Linking.openURL("https://policies.utexas.edu/")}> Private Information </Text>
                    <Text> | </Text>
                    <Text style = {styles.mini} onPress= {() => Linking.openURL("https://www.utexas.edu/web/guidelines/accessibility.html")}> Resources for Accesibility </Text>
                </Text>

                <Text style = {styles.smallText}> Comments:
                <Text style = {styles.mini} onPress= {() => Linking.openURL("sbank_at_ece.utexas.edu")}> sbank_at_ece.utexas.edu </Text>
                </Text>

            </View>
            <Image style={styles.logo}
                source={{uri: 'https://lase.mer.utexas.edu/images/footer_logo.jpg' }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    BoldText: {
		fontWeight: 'bold'
	},
	textColor: {
		color: 'orange'
	},
	titleText: {
		fontSize: 28,
		color: '#c60',
	},
	sectionText: {
		fontSize: 17,
		fontWeight: "bold"
	},
	subsectionText: {
		fontSize: 16,
	},
	specialWord: {
		fontSize: 17,
		fontWeight: "bold",
		color: 'orange',
	},
	contact: {
		height: 50,
		paddingVertical: 5,
        paddingHorizontal: 10,
	},
	smallText: {
		fontSize: 10,
	},
	mini:{
		fontSize: 10,
		flexDirection: "row",
		color: '#c60',
	},
	normalText: {
		color: 'orange',
		fontWeight: 'bold',
	},
	newStyle: {
		fontSize: 10,
	},
	botContainer: {
        paddingTop: 10,
		flexDirection: 'row',
        justifyContent: "space-between",
		padding: 5,
        marginTop: 10,
		marginBottom: 5,
        borderColor: "#aaa",
        borderTopWidth: 2,
	},
	logo: {
		width: 200,
		height: 50,
		alignItems: 'flex-end',
	},
})
