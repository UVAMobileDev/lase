import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Classes(props) {

    return (
      <View>
        <View>
          <Text style={styles.header}>Classes</Text>
          <Text style={styles.sectionHeader}> EE 383P-6: Optoelectronic Devices (Spring 2007-2015, 2017, 2019, 2021 - Planned) </Text>
          <Text style={styles.textContainer}> A graduate-level introduction to semiconductor optoelectronic devices for communications, spectroscopy, and other applications. Reviews the requisite physics, device operating principles,a nd pratical strengths/weaknesses of devices. Topics include: </Text>
          <Text style={styles.listIndent}> {'\u2022'} Applicable semiconductor physics and quantum mechanis (E-k space, )</Text>
        </View>
      </View>
    );
}
//Update about the how my code looks like
//Ask questions about the Bold text in the applicable semi conductor
//Downloading the file?
//Picture?
//Video?
//The bottom?

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},

  header: {
  color: '#c60',
  fontSize: 35,
  padding: 20,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },

  listIndent: {
      fontSize: 14,
      marginLeft: 60,
      marginRight: 20,
  },

  sectionHeader:{
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

});
