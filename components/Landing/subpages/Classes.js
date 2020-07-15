import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Classes(props) {

    return (
        <View>
            <View>
                <Text>Classes</Text>
            </View>

            <View>
              <Text style={styles.sectionHeader}> EE 383P-6: Optoelectronic Devices (Spring 2007-2015, 2017, 2019, 2021 - Planned)</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},

  sectionHeader:{
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  // sectionText:{
  //   fontSize:
  // }
});
