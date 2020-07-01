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
      <Text style = {{fontSize: 8}}>{power}</Text>
    </View>
  );

}

/*
    Parameter (text): a variable contains a whole text
    Purpose: if a word should be linking to URL in a text, then this subroutine will be used to achieve that
    Credit to G.Micheal
*/
const linkify = text => {
	// If no url in the text, return just the text
	let link_start = text.indexOf("$URL|");
	if(link_start === -1) return (<Text>{text}</Text>);
	// Trim pre-text
	let pre = text.substring(0, link_start);
	text = text.substring(link_start + 5);
	// Trim link title
	let url_start = text.indexOf("|");
	let link_text = text.substring(0, url_start);
	text = text.substring(url_start + 1);
	// Trim url
	let post_start = text.indexOf("|");
	let url = text.substring(0, post_start);
	text = text.substring(post_start + 1);
	// Linkify the rest of the text
	return (
		<Text>
			<Text>{pre}</Text>
			<Text style = {styles.orangeFont} onPress={() => Linking.openURL(url)}>{link_text}</Text>
			{linkify(text)}
		</Text>
	);
}

/*
    Parameter (text): a variable contains a whole text
    Parameter (name): a name of the section that has superscript
    Purpose: return a whole text with superscript.

*/
function superScript(text,name) {

    if (name == 'FTIR: Bruker Vertex v80') {
        if (text.includes('cm-1')) {
            let indexof = text.indexOf('cm-1');
            let newText = text.replace('cm-1', '');
            let subs1 = newText.substring(0,indexof);
            let subs2 = newText.substring(indexof, newText.length);
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



//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*
    This array contains information regarding all machines such as Bravo,Echo,and Foxtrot
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
    },
]

/*
    This array contains information regarding Bakeout structure
*/
const structure = [
    {
        id: '0',
        description: 'Outgassing MBE components prior to introducing them to the MBE system',
        title: 'Bakeout Structure ($URL|BoS|https://lase.mer.utexas.edu/images/BOS_v2.jpg|) (Status: Operational, v2.1)',
        equipment: [
            'CTI CT10 cryo',
            'Stanford Research Systems RGA 200',
            'Four 8" arms for baking sources',
            'One 10" arm for baking substrate manipulator',
            'Vertical group-III thermal deposition system (indium currently installed)',
        ],
    },
]

/*
    This array contains information regarding optical characterization setups
*/
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

/*
    This array contains information regarding FTIR and IR microscope
*/
const fourier = [
    {
        id: '0',
        name: 'FTIR: Bruker Vertex v80',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope ($URL|Futur-er|https://lase.mer.utexas.edu/images/FTIR.jpg|)',
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
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope ($URL|Futur-er|https://lase.mer.utexas.edu/images/FTIR.jpg|)',
        options: [
            'Coupled to FTIR for spatial/spectral/temporal mapping',
            'Single point MCT detector w/automated stage for imaging',
            'ZnSe A ttenuated Total Reflectance (ATR) objective (ZnSe)',
            'Grazing Angle Objective (GAO)',
        ],
    },{
        id: '2',
        name: 'Accessories:',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope ($URL|Futur-er|https://lase.mer.utexas.edu/images/FTIR.jpg|)',
        options: [
            'Keysight B1500A semiconductor device analyzer (1x high-power, 2x high-resolution SMUs)',
            'MMR variable temperature micro miniature refrigerator w/controller (under installation)',
        ],
    },
]

/*
    This array contains the following sections:
        1. Edge-emitting laser (EEL) test setup
        2. Photodetector / Photocurrent spectroscopy setup (visible-to-mid-IR)
        3. Probe station
*/
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

/*
    This array contains the following sections:
        1. Simulations
        2. Other equipment available through Microelectronics Research Center (NSF-NNCI)
        3. Advanced energetics
*/
const sim_otherEquip_energeties = [
    {
        id: '0',
        title: 'Simulations',
        list: [
            'VASP (TACC) - Density Functional Theory (DFT)',
            'nextnano (Windows) - k.p, wavefunction solver, electrostatics, etc.',
            'RCWA (Windows) - Rigorous coupled-wave analysis; tool developed by $URL|Podolskiy Group, UML|http://faculty.uml.edu/vpodolskiy/codes/index.html|',
            'COMSOL (Windows) - Finite element method (FEM)',
            'Lumerical (Windows) - Finite-difference time-domain (FDTD) and FEM',
            'MEEP (Unix) - FDTD',
            'Monte Carlo (Unix) - APD simulations, including noise; tool developed by $URL|Campbell Group, UVA|http://www.ece.virginia.edu/pdg/index.html|',
            'Band diagramming (Java and Python) - Poisson and Poisson-Schrodinger solvers, e.g. $URL|OpenBandParams|https://github.com/scott-maddox/openbandparams|',
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
                //Use map to render all information about machines to the page
                machines.map(machine => (
                    <View key = {machine.id}>
                        <Text style = {styles.titleIndent}> {machine.title} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} {machine.history} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} Materials: </Text>
                                {
                                    machine.materials.map(material => (
                                        <Text style = {styles.subBullet}>
                                            {'\u25E6'} {material}
                                        </Text>

                                    ))
                                }
                            <Text style = {styles.listIndent}> {'\u2022'} Ancillary Equipment: </Text>
                                {
                                    machine.equipment.map(equip => (
                                        <Text style = {styles.subBullet}>
                                            {'\u25E6'} {equip}
                                        </Text>
                                    ))
                                }
                    </View>
                ))
            }


            {
                //Use map to render all information about Bakeout Structure to the page
                structure.map(struct => (
                    <View key = {struct.id}>
                        <Text style = {styles.titleIndent}> {linkify(struct.title)} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} {struct.description} </Text>
                            <Text style = {styles.listIndent}> {'\u2022'} Equipment: </Text>
                                {
                                    struct.equipment.map(equip => (
                                        <Text style = {styles.subBullet}>
                                            {'\u25E6'} {equip}
                                        </Text>
                                    ))
                                }
                    </View>
                ))
            }


            {
                //Use map to render all information about test setup to the page
                opticalSetup.map(opt => (
                    <View key = {opt.id}>
                        <Text style = {styles.titleIndent}> {opt.title} </Text>

                                {
                                    opt.setup.map(setUp => (
                                        <Text style = {styles.listIndent}>
                                            {'\u2022'} {setUp}
                                        </Text>
                                    ))
                                }
                                <Text style = {styles.listIndent}> {'\u2022'} Ancillary Equipment: </Text>
                                    {
                                        opt.Equipment.map(equip => (
                                            <Text style = {styles.subBullet}>
                                                {'\u25E6'} {equip}
                                            </Text>
                                        ))
                                    }
                    </View>
                ))
            }


            <Text style = {styles.titleIndent}> {linkify(fourier[0].title)} </Text>
            {
                //Use map to render all information about Fourier transform infrared spectrometer (FTIR) and IR microscope to the page
                fourier.map(section => (
                    <View key = {section.id}>
                        <Text style = {styles.listIndent}> {'\u2022'} {section.name} </Text>

                                {
                                    section.options.map(subsection => (
                                        <Text>
                                            {superScript(subsection,section.name)}
                                        </Text>
                                    ))
                                }

                    </View>
                ))
            }


            {
                //Use map to render all information about different kind of tools to the page
                tools.map(tool => (
                    <View key = {tool.id}>
                        <Text style = {styles.titleIndent}> {tool.title} </Text>
                                <Text style = {styles.listIndent}> {'\u2022'} {tool.description} </Text>
                                <Text style = {styles.listIndent}> {'\u2022'} Equipment: </Text>
                                    {
                                        tool.Equipment.map(equip => (
                                            <Text style = {styles.subBullet}>
                                                {'\u25E6'} {equip}
                                            </Text>
                                        ))
                                    }
                    </View>
                ))
            }


            {
                //Use map to render all information about simulations, other equipment, and advanced energetics to the page
                sim_otherEquip_energeties.map(section => (
                    <View key = {section.id}>
                        <Text style = {styles.titleIndent}> {section.title} </Text>

                                    {
                                        section.list.map(subsection => (

                                            <Text style = {styles.listIndent}>
                                                {'\u2022'} {linkify(subsection)}
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
                        <Text style = {styles.mini} onPress= {() => Linking.openURL("https://www.utexas.edu/web/guidelines/accessibility.html")}> Resources for Accesibility </Text>
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
    fontSize:16,
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
      fontWeight: 'bold',
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
  orangeFont: {
      color: 'orange',
  }

});
