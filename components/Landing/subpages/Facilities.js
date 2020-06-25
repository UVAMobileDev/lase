import React from 'react';
import { View, Text, StyleSheet, Image,Linking,Platform,Dimensions,FlatList} from 'react-native';

/*
    Parameters: base and power of a text
    Purpose: return a text with superscript. For example, cm-1 -> cm^-1

*/
function getSuperScript(base,power) {
  return (
    <View style = {{flexDirection: 'row'}}>
      <Text style = {{fontSize: 14}}>{base}</Text>
      <Text style = {{fontSize: 7}}>{power}</Text>
    </View>
  );

}

/*
    Parameter (text): a variable contains a whole text
    Parameter (name): a name of the section
    Purpose: return a whole text with superscript.

*/
function superScript(text,name) {

    if (name == 'FTIR: Bruker Vertex v80') {
        if (text.includes('cm-1')) {
            var indexof = text.indexOf('cm-1');
            var newText = text.replace('cm-1', '');
            var subs1 = newText.substring(0,indexof);
            var subs2 = newText.substring(indexof, newText.length);
            return (
                <Text style = {styles.subBullet}>{'\u25E6'}{subs1}{getSuperScript('cm','-1')}{subs2}</Text>
            );
        } else {
            return (
                <Text style = {styles.subBullet}>{'\u25E6'}{text}</Text>
            );
        }
    } else {
        return (
            <Text style = {styles.subBullet}>
                {'\u25E6'} {text}
            </Text>
        );
    }
}



/*
    An array to store all URL links
*/
const url = [
    {
        id: '0',
        'convert': 'BoS',
        'theURL': 'https://lase.mer.utexas.edu/images/BOS_v2.jpg',
    },{
        id: '1',
        'convert': 'Podolskiy Group, UML',
        'theURL': 'http://faculty.uml.edu/vpodolskiy/codes/index.html',
    },{
        id: '2',
        'convert': 'Campbell Group, UVA',
        'theURL': 'http://www.ece.virginia.edu/pdg/index.html',
    },{
        id: '3',
        'convert': 'OpenBandParams',
        'theURL': 'https://github.com/scott-maddox/openbandparams',
    },{
        id: '4',
        'convert': 'Futur-er',
        'theURL': 'https://lase.mer.utexas.edu/images/FTIR.jpg',
    },
]
/*
    An array to store all words that needed to be linking to URL
*/
const specialWord = [
    'BoS','Podolskiy Group, UML', 'Campbell Group, UVA', 'OpenBandParams','Futur-er'
]

/*
    Parameter (item): a variable contains a whole text
    Purpose: return true if a special word (a word needs to be linked to URL) is a substring of the passing in text. Otherwise, return false
*/
function ifContain(item) {
    var signal = 0;
    for (var i = 0; i < specialWord.length; i++) {
        if (item.includes(specialWord[i])) {
            signal = 1;
        }
    }
    if (signal == 1) {
        return true;
    } else {
        return false;
    }
}

/*
    Parameter (boo): a boolean variable to see which form of text that should be printed
    Purpose: return a whole text with or without a special word (linking to URL)
*/
function print(boo,text){

    if (boo){
        return (<Text> {'\u2022'} {hyperlinkSmall(text)} </Text>);
    } else {
        return (<Text> {'\u2022'} {text} </Text>);
    }
}

/*
    Parameter (theString): a variable contains a whole text
    Purpose: if a word should be linking to URL, then this subroutine will be used to achieve that
*/
function hyperlink(theString){
    var newArr = []; //To contain only the id
    var newArr2 = []; //To contain only the URL
    for (var i = 0; i < url.length; i++) {
        newArr.push(url[i]['convert']);
        newArr2.push(url[i]['theURL']);
    }

    for (var item = 0; item < newArr.length; item++) {
        //Check if the special word is in our text
        if (theString.includes(newArr[item])) {
            var temp = newArr[item]; //Contain a whole text
            var myURL = newArr2[item]; //URL corresponding to special word
            var index = theString.indexOf(newArr[item]); //This will return the index of first appearance of the special word
            var newString = theString.replace(newArr[item],'');
            var substring1 = newString.substring(0,index);
            var substring2 = newString.substring(index,newString.length);
            return (
                <Text>{substring1}<Text style = {styles.specialWord} onPress= {() => Linking.openURL(myURL)}>{temp}</Text>{substring2} </Text>
            );
        }
    }



}

/*
    Parameter (theString): a variable contains a whole text
    Purpose: this has a same functionality as hyperlink subroutine except this will return a text in a smaller form
*/

function hyperlinkSmall(theString){
    var newArr = []; //To contain only the id
    var newArr2 = []; //To contain only the URL
    for (var i = 0; i < url.length; i++) {
        newArr.push(url[i]['convert']);
        newArr2.push(url[i]['theURL']);
    }

    for (var item = 0; item < newArr.length; item++) {
        //Check if the special word is in our text
        if (theString.includes(newArr[item])) {
            var temp = newArr[item]; //Contain a whole text
            var myURL = newArr2[item]; //URL corresponding to special word
            var index = theString.indexOf(newArr[item]); //This will return the index of first appearance of the special word
            var newString = theString.replace(newArr[item],'');
            var substring1 = newString.substring(0,index);
            var substring2 = newString.substring(index,newString.length);
            return (
                <Text>{substring1}<Text style = {styles.normalText} onPress= {() => Linking.openURL(myURL)}>{temp}</Text>{substring2} </Text>
            );
        }
    }



}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
    Declare arrays to store objects to render
*/
const machines = [
    {
        id: '0',
        title: '"Bravo" Varian Gen II MBE (Status) Operational',
        history: 'History: Donation from Bell Labs, installed 1994 and refurbished 2007 ',
        materials: [
            'Er – Veeco 10CC high temperature source',
            'Ga – Veeco 400g SUMO cell',
            'In – Veeco 900g SUMO cell',
            'Al – Veeco 200g SUMO cell',
            'N – SVTA rf plasma source (Status: not installed)',
            'As – Veeco 500CC valved-cracker',
            'Sb – Veeco 200CC valved-cracker',
            'Bi – Veeco 250g downward-looking SUMO cell',
            'Si/Be – MBE Komponenten custom dual dopant source (Si filament and Be effusion)',
            'GaTe – MBE Komponenten tilted crucible dopant source',
            'Si – MBE Komponenten filament source',
            'Be – MBE Komponenten tilted crucible dopant source',
        ],
        equipment: [
            'kSA multibeam optical stress (MOS) system',
            'kSA BandiT bandedge/blackbody temperature measurement',
            'Staib 15 keV RHEED system',
            'kSA RHEED analysis',
            'Stanford Research Systems RGA 300',
            'Veeco externally adjustable group-III shutters',
            'Riber (formerly MBE Control) AMBER growth software',
            'Veeco 3” substrate manipulator',
        ],
    }, {
        id: '1',
        title: '“Echo” EPI MOD Gen II MBE (Status: Operational)',
        history: 'History: Purchased in 1995 by NIST, donated to LASE in 2008, refurbished in 2009',
        materials: [
            'B - MBE Komponenten EBVV vertical e-beam evaporator',
            'Ga – Veeco 400g SUMO cell',
            'In – Veeco 400g SUMO cell',
            'P – E-SCIENCE valved GaP decomposition source',
            'As – Veeco 500CC valved-cracker',
            'Bi – Veeco 250g downward-looking SUMO cell',
            'Si/Be – Veeco dual dopant source',
            'GaTe/Er - Veeco dual dopant source',
            'La – Veeco 10CC high temperature source (Status: not installed)',
            'Lu – Veeco 10CC high temperature source (Status: not installed)',
            'C – Veeco CBr4 with MBE Control custom injector (Status: not installed)',
            'Al – Veeco 200g SUMO cell (Status: not installed)',
            'Gd – Veeco 10CC high temperature source (Status: not installed)',
        ],
        equipment: [
            'kSA BandiT bandedge/blackbody temperature measurement (under installation)',
            'MBE Control EZ-RHEED analysis',
            'Stanford Research Systems RGA 200',
            'Veeco externally adjustable group-III shutters',
            'Riber (formerly MBE Control) AMBER growth software',
            'Custom cryogen-free P-recovery system (Status: under installation)',
            'Veeco 3” substrate manipulator',
        ],
    }, {
        id: '2',
        title: '“Foxtrot” (a.k.a. “The Juice”) Varian Chamber (Status: Under installation)',
        history: 'History: Donation from UT-Arlington in 2011',
        materials: [
            'Epitaxial plasmonic and emerging materials',
        ],
        equipment: [
            'Thermionics 6-pocket e-beam evaporator',
            'Veeco dual dopant source',
            'MBE Komponenten cooling water nipple and shutter',
            'Stanford Research Systems RGA 200',
        ],
    }
]

const struct = [
    {
        id: '0',
        description: 'Outgassing MBE components prior to introducing them to the MBE system',
        title: 'Bakeout Structure (BoS) (Status: Operational, v2.1)',
        equipment: [
            'CTI CT10 cryo',
            'Stanford Research Systems RGA 200',
            'Four 8" arms for baking sources',
            'One 10" arm for baking substrate manipulator',
            'Vertical group-III thermal deposition system (indium currently installed)',
        ],
    },
]

const opticalSetup = [
    {
        id: '0',
        title: 'Optical characterization setups',
        setup: [
            'Photoluminescence (PL): Measuring luminescence efficiency, emission wavelength, and so on',
            'near/mid-IR Reflection/Transmission (R&T): Measuring absorption and band-edge',
            'Pump/probe: Femtosecond carrier dynamics using mode-locked fiber laser',
            'Photoreflectance (PR): Measuring band alignments',
        ],
        Equipment: [
            'LHe cryostat and controller',
        ],
    }
]

const fourier = [
    {
        id: '0',
        name: 'FTIR: Bruker Vertex v80',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope (Futur-er)',
        options: [
            'Vacuum FTIR with high resolution option (Δν < 0.06 cm-1)',
            'Operating range: 5 - 25000 cm-1 (0.4 – 2000 μm)',
            'Step scan',
            'Rapid scan',
        ],
    },
    {
        id: '1',
        name: 'IR Microscope: Bruker Hyperion 2000',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope (Futur-er)',
        options: [
            'Coupled to FTIR for spatial/spectral/temporal mapping',
            'Single point MCT detector w/automated stage for imaging',
            'ZnSe A ttenuated Total Reflectance (ATR) objective (ZnSe)',
            'Grazing Angle Objective (GAO)',
        ],
    },{
        id: '2',
        name: 'Accessories:',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope (Futur-er)',
        options: [
            'Keysight B1500A semiconductor device analyzer (1x high-power, 2x high-resolution SMUs)',
            'MMR variable temperature micro miniature refrigerator w/controller (under installation)',
        ],
    },
]


const tools = [
    {
        id: '0',
        description: 'CW, pulsed, and temperature-dependant EEL characterization',
        title: 'Edge-emitting laser (EEL) test setup',
        Equipment: [
            'Vigo high-speed (ns) MCT detector (5μm cutoff)',
            'Thorlabs InGaAs amplified detector (1.5μm cutoff)',
            'Princeton Instruments Acton 2500 spectrometer',
            'Labsphere Infragold 2" integrating sphere with fiber port',
            'ILX Laser drivers - pulsed (LDP-3840B), CW/temperature (LDC-3744)',
            'ILX temperature-controlled laser mount (LDM-4415)',
            'Neslab recirculating chiller',
        ],
    }, {
        id: '1',
        description: 'Spectrally-resolved photocurrent/photovoltage response',
        title: 'Photodetector / Photocurrent spectroscopy setup (visible-to-mid-IR)',
        Equipment: [
            'Stanford research systems lock-in amplifier and chopper',
            'Princeton Instruments Acton 2500 spectrometer',
            'Various light sources',
        ],
    }, {
        id: '2',
        description: 'I-V: Tunnel junctions characterization and process flow diagnostics (e.g. TLM)',
        title: 'Probe station',
        Equipment: [
            'Micromanipulator 6200 probe station',
            'Keysight B1500A semiconductor device analyzer (1x high-power, 2x high-resolution SMUs)',
            'HP 4145 semiconductor parameter analyzer',
        ],
    },

]

const other = [
    {
        id: '0',
        title: 'Simulations',
        list: [
            'VASP (TACC) - Density Functional Theory (DFT)',
            'nextnano (Windows) - k.p, wavefunction solver, electrostatics, etc.',
            'RCWA (Windows) - Rigorous coupled-wave analysis; tool developed by Podolskiy Group, UML',
            'COMSOL (Windows) - Finite element method (FEM)',
            'Lumerical (Windows) - Finite-difference time-domain (FDTD) and FEM',
            'MEEP (Unix) - FDTD',
            'Monte Carlo (Unix) - APD simulations, including noise; tool developed by Campbell Group, UVA',
            'Band diagramming (Java and Python) - Poisson and Poisson-Schrodinger solvers, e.g. OpenBandParams',
        ],
    },{
        id: '1',
        title: 'Other equipment available through Microelectronics Research Center (NSF-NNCI)',
        list: [
            'Processing: III-V and Si processing (litho, ICP/RIE dry etch, metallization, etc), wafer bonding, lapping/polishing, wire bonding, etc.',
            'Characterization: HR-XRD (rotating anode Rigaku SmartLab), AFM, TEM, Hall Effect, PPMS, C-V, etc.',
        ],
    }, {
        id: '2',
        title: 'Advanced energetics',
        list: [
            'Espresso - Illy Francis Francis! Model X7.1 IperEspresso Machine',
            'Pourover (6 cup) - Chemex Classic Series',
            'French Press (20 oz.) - Bodum Chambord (all-metal construction)',
            'Jura-Capresso Infinity (commercial-grade conical burr grinder)',
            'Dairy - Nespresso Aerocinno Plus',
        ],
    }
]

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




export default function Facilities(props) {

    return (
        <View style = {styles.container}>
            <View style = {styles.toCenter}>
                <Text style = {styles.titleText}> Facilities </Text>
                <Image
                  style = {styles.facilitiesPic}
                  source = {{uri: 'https://lase.mer.utexas.edu/images/facilities_large.jpg' }}
                />
            </View>

            {
                machines.map(item => (
                    <View key = {item.id}>
                        <Text style = {styles.titleIndent}> {item.title} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} {item.history} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} Materials: </Text>
                                {
                                    item.materials.map(item2 => (
                                        <Text style = {styles.subBullet}>
                                            {'\u25E6'} {item2}
                                        </Text>

                                    ))
                                }
                            <Text style = {styles.listIndent}> {'\u2022'} Ancillary Equipment: </Text>
                                {
                                    item.equipment.map(item3 => (
                                        <Text style = {styles.subBullet}>
                                            {'\u25E6'} {item3}
                                        </Text>
                                    ))
                                }
                    </View>
                ))
            }


            {
                struct.map(item => (
                    <View key = {item.id}>
                        <Text style = {styles.titleIndent}> {hyperlink(item.title)} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} {item.description} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} Equipment: </Text>
                                {
                                    item.equipment.map(item2 => (
                                        <Text style = {styles.subBullet}>
                                            {'\u25E6'} {item2}
                                        </Text>
                                    ))
                                }
                    </View>
                ))
            }


            {
                opticalSetup.map(item => (
                    <View key = {item.id}>
                        <Text style = {styles.titleIndent}> {item.title} </Text>

                                {
                                    item.setup.map(item2 => (
                                        <Text style = {styles.listIndent}>
                                            {'\u2022'} {item2}
                                        </Text>
                                    ))
                                }
                                <Text style = {styles.listIndent}> {'\u2022'} Ancillary Equipment: </Text>
                                    {
                                        item.Equipment.map(item3 => (
                                            <Text style = {styles.subBullet}>
                                                {'\u25E6'} {item3}
                                            </Text>
                                        ))
                                    }
                    </View>
                ))
            }


            <Text style = {styles.titleIndent}> {hyperlink(fourier[0].title)} </Text>
            {
                fourier.map(item => (
                    <View key = {item.id}>
                        <Text style = {styles.listIndent}> {'\u2022'} {item.name} </Text>

                                {
                                    item.options.map(item2 => (
                                        <Text>
                                            {superScript(item2,item.name)}
                                        </Text>
                                    ))
                                }

                    </View>
                ))
            }


            {
                tools.map(item => (
                    <View key = {item.id}>
                        <Text style = {styles.titleIndent}> {item.title} </Text>
                                <Text style = {styles.listIndent}> {'\u2022'} {item.description} </Text>
                                <Text style = {styles.listIndent}> {'\u2022'} Equipment: </Text>
                                    {
                                        item.Equipment.map(item3 => (
                                            <Text style = {styles.subBullet}>
                                                {'\u25E6'} {item3}
                                            </Text>
                                        ))
                                    }
                    </View>
                ))
            }


            {
                other.map(item => (
                    <View key = {item.id}>
                        <Text style = {styles.titleIndent}> {item.title} </Text>

                                    {
                                        item.list.map(item3 => (

                                            <Text style = {styles.listIndent}>

                                            {print(ifContain(item3),item3)}

                                            </Text>
                                        ))
                                    }
                    </View>
                ))
            }

            <Text style = {styles.updateDate}> Last Updated 4/22/2020</Text>

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
                        <Text style = {styles.mini} onPress= {() => Linking.openURL("http://www.ece.utexas.edu/")}> Resources for Accesibility </Text>
                    </Text>

                    <Text style = {styles.smallText}> Comments:
                    <Text style = {styles.mini} onPress= {() => Linking.openURL("sbank_at_ece.utexas.edu")}> sbank_at_ece.utexas.edu </Text>
                    </Text>

                </View>
                    <View style = {styles.viewLogo}>
                        <Image style = {styles.logo}
                          source = {{uri: 'https://lase.mer.utexas.edu/images/footer_logo.jpg' }}
                        />
                  </View>
            </View>
        </View>

    );


}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  toCenter: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleIndent: {
      margin: 5,
      marginTop: 10,
      fontSize: 17,
      fontWeight: "bold",
      marginLeft: 20,
      marginRight: 20,
  },
  listIndent: {
      fontSize: 14,
      marginLeft: 60,
      marginRight: 20,
  },
  subBullet: {
      fontSize: 14,
      marginLeft: 110,
      marginRight: 20,
  },

  facilitiesPic: {
    width: 550,
    height: 400,

  },
  BoldText: {
    fontWeight: 'bold'
  },
  textColor: {
      color: 'orange'
  },
  updateDate: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 520,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: 'orange',
  },
  sectionText: {
    fontSize: 17,
    fontWeight: "bold"
  },
  subsectionText: {
    fontsize:16,
  },
  specialWord: {
      fontSize: 17,
      fontWeight: "bold",
      color: 'orange',
  },
  contact: {
    height: 50,
    marginTop: 10,
    padding: 10,

  },
  smallText: {
      fontSize: 10,
  },
  mini:{
    fontSize: 10,
    flexDirection: "row",
    color: 'orange',
  },
  normalText: {
      color: 'orange',
      fontWeigght: 'bold',
  },
  newStyle: {
    fontSize: 10,
  },
  botContainer: {
      flexDirection: 'row',
      padding: 5,
      marginBottom: 5,
  },
  link: {color: "#c60"},
  logo: {
    width: 200,
    height: 50,
    alignItems: 'flex-end',
  },
  viewLogo: {
    alignItems: 'flex-end',
    marginLeft: 120,
    marginTop: 20,
    height: 40,


  },

});
