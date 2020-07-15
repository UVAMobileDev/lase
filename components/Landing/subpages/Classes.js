import React from 'react';
import { View, Text, Linking, StyleSheet, Image } from 'react-native';


// const Books = [
//     {
//         title: "Warren Piece",
//         author: "War Andprice",
//     },
//     {
//         title: "Zach's Bees",
//         author: "Apiarist's Anonymous"
//     }
// ]

// {
//     Books.map(book => (
//         <View>
//         <Text>{book.title}</Text>
//         <Text>{book.author}</Text>
//         </View>
//     ))
// }

export default function Classes(props) {
    return (
        <View>
            <View>
                // <Text>
                //     <Text>This is a single line of text where</Text>
                //     <Text style={{fontWeight: "bold"}}> this </Text>
                //     <Text>is bold.</Text>
                // </Text>
                <Text style={styles.header}>Classes</Text>
                <Text style={styles.sectionHeader}> EE 383P-6: Optoelectronic Devices (Spring 2007-2015, 2017, 2019, 2021 - Planned) </Text>
                <Text style={styles.textContainer}> A graduate-level introduction to semiconductor optoelectronic devices for communications, spectroscopy, and other applications. Reviews the requisite physics, device operating principles,a nd pratical strengths/weaknesses of devices. Topics include: </Text>
                <Text style={styles.listIndent}>
                    <Text>
                        <Text> {'\u2022'} Applicable semiconductor physics and quantum mechanis (E-</Text>
                    </Text>
                    <Text style={{fontWeight: "bold"}}>k</Text>
                    <Text>space,</Text>
                    <Text style={{fontWeight: "bold"}}>k p</Text>
                    <Text>, particle-in-a-box, etc.) </Text>
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Heterostructures and band/strain engineering
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Materials systems, preparation, and characterization
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Optic absorption, emission, and refraction processes of bulk and nanostructures
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Light emitting diodes
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Photodetectors
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Solar cells
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Modulators
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Lasers (edge-emitting, vertical-cavity, quantum cascade)
                </Text>
                <Text style={styles.listIndent}>
                    {'\u2022'} Other topics as time permits (e.g. sources/detectors for quantum information processing, THz sources/detectors, photonic crystals and other nanophotonic devices)
                </Text>

                <Text style={styles.link}
                        onPress={() => Linking.openURL("https://lase.mer.utexas.edu/file/EE383P6_Syllabus.pdf")}>Click here to view and download representative syllabus</Text>

                <Text style={styles.sectionHeader}> EE 348/396V: Lasers and Optical Engineering (Fall 2007-2010, Spring 2016, 2018, 2020)</Text>
                <Text style={styles.textContainer}> This is a mixed upper division undergraduate / graduate level course that introduces the key aspects of lasers and other optical devices that are used in a variety of applications, ranging from cutting/welding to > 10 Tbits/s fiber optic data links to articial guide stars for astronomy. We will develop the requisite physics to (1) discover why lasers are actually losers, (2) qualitatively and quantitatively describe laser operation, and (3) identify the key tradeoffs in practical laser design. </Text>

                <Text style={styles.link}
                        onPress={() => Linking.openURL("https://lase.mer.utexas.edu/file/EE348_Syllabus.pdf")}>Click here to view and download representative syllabus</Text>

                <Text style={styles.sectionHeader}> EE 302H: Honors Introduction to Electrical Engineering (Fall 2018-Present)</Text>
                <Text style={styles.textContainer}> The scope and nature of professional activities of electrical engineers, including problem-solving techniques; analysis and design methods; engineering professional ethics; analysis of analog circuits, including Thevenin/Norton equivalents, two-port networks, frequency domain analysis, mesh analysis, and nodal analysis; and operational amplifiers (DC response). Additional topics include an introduction to electronic materials, diodes, transistors and their application to CMOS logic, and photonic devices (solar cells, and light-emitting diodes).</Text>

                <Text style={styles.link}
                        onPress={() => Linking.openURL("https://lase.mer.utexas.edu/file/EE302H_Syllabus.pdf")}>Click here to view and download representative syllabus</Text>

                <Text style={styles.sectionHeader}> EE 302: Introduction to Electrical Engineering (Fall 2011-2017) </Text>
                <Text style={styles.textContainer}> The scope and nature of professional activities of electrical engineers, including problem-solving techniques; analysis and design methods; engineering professional ethics; analysis of analog resisitve circuits, including Thevenin/Norton equivalents, mesh analysis, and nodal analysis; and operational amlifiers (DC response). </Text>

                <Text style={styles.textContainer}> Lab explores fundamental and practical aspects of electrical engineering, culminating in teams designing and implementing this: </Text>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center',}}>
                    <Image source={robotImage}/>
                </View>

                <Text style={styles.link}
                        onPress={() => Linking.openURL("https://lase.mer.utexas.edu/file/EE302_Syllabus.pdf")}>Click here to view and download representative syllabus</Text>

                <Text style={styles.sectionHeader}> EE 364H/464H: Honors Senior Design (Fall 2010-Present) </Text>
                <Text style={styles.textContainer}> Mentored senior design teams; supervised projects include a real-time ketone minitor, personal hydration sensor, real-time health monitor, virtual whiteboard system, face-tracking directional audio system, a LED-based solar cell testing system (won 3rd place), and a real-time exercise form monitoring system: </Text>
            </View>
        </View>
    );
}

//Ask questions about the Bold text in the applicable semi conductor
//Downloading the file?
//Picture? linking
//Video?
//The bottom?

const robotImage = {
  uri: 'https://lase.mer.utexas.edu/images/EE302_Final_Project_small.JPG',
  width: 600,
  height: 400,
};

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
  link: {
      color: "#c60"
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
