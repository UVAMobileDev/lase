import React, { useContext, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Footer from '../Footer';
import { LightStyles, DarkStyles } from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';
import { LinkOpener, GetDimension } from '../../../constants/SimpleFunctions';

const machines = [
    {
        id: '0',
        title: '"Bravo" Varian Gen II MBE (Status) Operational',
        history: 'History: Donation from Bell Labs, installed 1994 and refurbished 2007 ',
        materials: [
            {
                Material_id: '0-0',
                text: 'Er – Veeco 10CC high temperature source',
            },{
                Material_id: '0-1',
                text: 'Ga – Veeco 400g SUMO cell',
            }, {
                Material_id: '0-2',
                text: 'In – Veeco 900g SUMO cell',
            }, {
                Material_id: '0-3',
                text: 'Al – Veeco 200g SUMO cell',
            }, {
                Material_id: '0-4',
                text: 'N – SVTA rf plasma source (Status: not installed)',
            },{
                Material_id: '0-5',
                text: 'As – Veeco 500CC valved-cracker',
            },{
                Material_id: '0-6',
                text: 'Sb – Veeco 200CC valved-cracker',
            }, {
                Material_id: '0-7',
                text: 'Bi – Veeco 250g downward-looking SUMO cell',
            }, {
                Material_id: '0-8',
                text: 'Si/Be – MBE Komponenten custom dual dopant source (Si filament and Be effusion)',
            }, {
                Material_id: '0-9',
                text: 'GaTe – MBE Komponenten tilted crucible dopant source',
            }, {
                Material_id: '0-10',
                text:'Si – MBE Komponenten filament source',
            }, {
                Material_id: '0-11',
                text:'Be – MBE Komponenten tilted crucible dopant source',
            },
        ],
        equipment: [
            {
                Equip_id: '0-0',
                text: 'kSA multibeam optical stress (MOS) system',
            },{
                Equip_id: '0-1',
                text: 'kSA BandiT bandedge/blackbody temperature measurement',
            }, {
                Equip_id: '0-2',
                text: 'Staib 15 keV RHEED system',
            }, {
                Equip_id: '0-3',
                text: 'kSA RHEED analysis',
            }, {
                Equip_id: '0-4',
                text: 'Stanford Research Systems RGA 300',
            },{
                Equip_id: '0-5',
                text: 'Veeco externally adjustable group-III shutters',
            },{
                Equip_id: '0-6',
                text: 'Riber (formerly MBE Control) AMBER growth software',
            }, {
                Equip_id: '0-7',
                text: 'Veeco 3” substrate manipulator',
            },
        ],
    }, {
        id: '1',
        title: '“Echo” EPI MOD Gen II MBE (Status: Operational)',
        history: 'History: Purchased in 1995 by NIST, donated to LASE in 2008, refurbished in 2009',
        materials: [
            {
                Material_id: '1-0',
                text: 'B - MBE Komponenten EBVV vertical e-beam evaporator',
            },{
                Material_id: '1-1',
                text: 'Ga – Veeco 400g SUMO cell',
            }, {
                Material_id: '1-2',
                text: 'In – Veeco 400g SUMO cell',
            }, {
                Material_id: '1-3',
                text: 'P – E-SCIENCE valved GaP decomposition source',
            }, {
                Material_id: '1-4',
                text: 'As – Veeco 500CC valved-cracker',
            },{
                Material_id: '1-5',
                text: 'Bi – Veeco 250g downward-looking SUMO cell',
            },{
                Material_id: '1-6',
                text: 'Si/Be – Veeco dual dopant source',
            }, {
                Material_id: '1-7',
                text: 'GaTe/Er - Veeco dual dopant source',
            }, {
                Material_id: '1-8',
                text: 'La – Veeco 10CC high temperature source (Status: not installed)',
            }, {
                Material_id: '1-9',
                text: 'Lu – Veeco 10CC high temperature source (Status: not installed)',
            }, {
                Material_id: '1-10',
                text: 'C – Veeco CBr4 with MBE Control custom injector (Status: not installed)',
            }, {
                Material_id: '1-11',
                text: 'Al – Veeco 200g SUMO cell (Status: not installed)',
            }, {
                Material_id: '1-12',
                text: 'Gd – Veeco 10CC high temperature source (Status: not installed)',
            },
        ],
        equipment: [
            {
                Equip_id: '1-0',
                text: 'kSA BandiT bandedge/blackbody temperature measurement (under installation)',
            }, {
                Equip_id: '1-1',
                text: 'MBE Control EZ-RHEED analysis',
            }, {
                Equip_id: '1-2',
                text: 'Stanford Research Systems RGA 200',
            }, {
                Equip_id: '1-3',
                text: 'Veeco externally adjustable group-III shutters',
            },{
                Equip_id: '1-4',
                text: 'Riber (formerly MBE Control) AMBER growth software',
            },{
                Equip_id: '1-5',
                text: 'Custom cryogen-free P-recovery system (Status: under installation)',
            }, {
                Equip_id: '1-6',
                text: 'Veeco 3” substrate manipulator',
            },
        ],
    }, {
        id: '2',
        title: '“Foxtrot” (a.k.a. “The Juice”) Varian Chamber (Status: Under installation)',
        history: 'History: Donation from UT-Arlington in 2011',
        materials: [
            {
                Material_id: '2-0',
                text: 'Epitaxial plasmonic and emerging materials',
            },

        ],
        equipment: [
            {
                Equip_id: '2-0',
                text: 'Thermionics 6-pocket e-beam evaporator',
            }, {
                Equip_id: '2-1',
                text: 'Veeco dual dopant source',
            }, {
                Equip_id: '2-2',
                text: 'MBE Komponenten cooling water nipple and shutter',
            }, {
                Equip_id: '2-3',
                text: 'Stanford Research Systems RGA 200',
            },
        ],
    },
]
const structure = [
    {
        id: '0',
        description: 'Outgassing MBE components prior to introducing them to the MBE system',
        title: 'Bakeout Structure ($URL|BoS|https://lase.mer.utexas.edu/images/BOS_v2.jpg|) (Status: Operational, v2.1)',
        equipment: [
            {
                Equip_id: '0-0',
                text: 'CTI CT10 cryo',
            }, {
                Equip_id: '0-1',
                text: 'Stanford Research Systems RGA 200',
            }, {
                Equip_id: '0-2',
                text: 'Four 8" arms for baking sources',
            }, {
                Equip_id: '0-3',
                text: 'One 10" arm for baking substrate manipulator',
            },{
                Equip_id: '0-4',
                text: 'Vertical group-III thermal deposition system (indium currently installed)',
            },
        ],
    },
]
const opticalSetup = [
    {
        id: '0',
        title: 'Optical characterization setups',
        setup: [
            {
                Setup_id: '0-0',
                text: 'Photoluminescence (PL): Measuring luminescence efficiency, emission wavelength, and so on',
            }, {
                Setup_id: '0-1',
                text: 'near/mid-IR Reflection/Transmission (R&T): Measuring absorption and band-edge',
            }, {
                Setup_id: '0-2',
                text: 'Pump/probe: Femtosecond carrier dynamics using mode-locked fiber laser',
            }, {
                Setup_id: '0-3',
                text: 'Photoreflectance (PR): Measuring band alignments',
            },
        ],
        Equipment: [
            {
                Equip_id: '0-0',
                text: 'LHe cryostat and controller',
            }
        ],
    }
]
const fourier = [
    {
        id: '0',
        name: 'FTIR: Bruker Vertex v80',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope ($URL|Futur-er|https://lase.mer.utexas.edu/images/FTIR.jpg|)',
        options: [
            {
                Opt_id: '0-0',
                text: 'Vacuum FTIR with high resolution option (Δν < 0.06 cm-1)',
            }, {
                Opt_id: '0-1',
                text: 'Operating range: 5 - 25000 cm-1 (0.4 – 2000 μm)',
            }, {
                Opt_id: '0-2',
                text: 'Step scan',
            }, {
                Opt_id: '0-3',
                text: 'Rapid scan',
            },
        ],
    },
    {
        id: '1',
        name: 'IR Microscope: Bruker Hyperion 2000',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope ($URL|Futur-er|https://lase.mer.utexas.edu/images/FTIR.jpg|)',
        options: [
            {
                Opt_id: '1-0',
                text: 'Coupled to FTIR for spatial/spectral/temporal mapping',
            }, {
                Opt_id: '1-1',
                text: 'Single point MCT detector w/automated stage for imaging',
            }, {
                Opt_id: '1-2',
                text: 'ZnSe A ttenuated Total Reflectance (ATR) objective (ZnSe)',
            }, {
                Opt_id: '1-3',
                text: 'Grazing Angle Objective (GAO)',
            },
        ],
    },{
        id: '2',
        name: 'Accessories:',
        title: 'Fourier transform infrared spectrometer (FTIR) and IR microscope ($URL|Futur-er|https://lase.mer.utexas.edu/images/FTIR.jpg|)',
        options: [
            {
                Opt_id: '2-0',
                text: 'Keysight B1500A semiconductor device analyzer (1x high-power, 2x high-resolution SMUs)',
            }, {
                Opt_id: '2-1',
                text: 'MMR variable temperature micro miniature refrigerator w/controller (under installation)',
            },

        ],
    },
]
const tools = [
    {
        id: '0',
        description: 'CW, pulsed, and temperature-dependant EEL characterization',
        title: 'Edge-emitting laser (EEL) test setup',
        Equipment: [
            {
                Equip_id: '0-0',
                text: 'Vigo high-speed (ns) MCT detector (5μm cutoff)',
            },{
                Equip_id: '0-1',
                text: 'Thorlabs InGaAs amplified detector (1.5μm cutoff)',
            }, {
                Equip_id: '0-2',
                text: 'Princeton Instruments Acton 2500 spectrometer',
            }, {
                Equip_id: '0-3',
                text: 'Labsphere Infragold 2" integrating sphere with fiber port',
            }, {
                Equip_id: '0-4',
                text: 'ILX Laser drivers - pulsed (LDP-3840B), CW/temperature (LDC-3744)',
            },{
                Equip_id: '0-5',
                text: 'ILX temperature-controlled laser mount (LDM-4415)',
            },{
                Equip_id: '1-6',
                text: 'Neslab recirculating chiller',
            },
        ],
    }, {
        id: '1',
        description: 'Spectrally-resolved photocurrent/photovoltage response',
        title: 'Photodetector / Photocurrent spectroscopy setup (visible-to-mid-IR)',
        Equipment: [
            {
                Equip_id: '1-0',
                text: 'Stanford research systems lock-in amplifier and chopper',
            },{
                Equip_id: '1-1',
                text: 'Princeton Instruments Acton 2500 spectrometer',
            }, {
                Equip_id: '1-2',
                text: 'Various light sources',
            },
        ],
    }, {
        id: '2',
        description: 'I-V: Tunnel junctions characterization and process flow diagnostics (e.g. TLM)',
        title: 'Probe station',
        Equipment: [
            {
                Equip_id: '2-0',
                text: 'Micromanipulator 6200 probe station',
            },{
                Equip_id: '2-1',
                text: 'Keysight B1500A semiconductor device analyzer (1x high-power, 2x high-resolution SMUs)',
            }, {
                Equip_id: '2-2',
                text: 'HP 4145 semiconductor parameter analyzer',
            },
        ],
    },
]
const sim_otherEquip_energeties = [
    {
        id: '0',
        title: 'Simulations',
        list: [
            {
                List_id: '0-0',
                text: 'VASP (TACC) - Density Functional Theory (DFT)',
            },{
                List_id: '0-1',
                text: 'nextnano (Windows) - k.p, wavefunction solver, electrostatics, etc.',
            }, {
                List_id: '0-2',
                text: 'RCWA (Windows) - Rigorous coupled-wave analysis; tool developed by $URL|Podolskiy Group, UML|http://faculty.uml.edu/vpodolskiy/codes/index.html|',
            }, {
                List_id: '0-3',
                text: 'COMSOL (Windows) - Finite element method (FEM)',
            }, {
                List_id: '0-4',
                text: 'Lumerical (Windows) - Finite-difference time-domain (FDTD) and FEM',
            },{
                List_id: '0-5',
                text: 'MEEP (Unix) - FDTD',
            },{
                List_id: '0-6',
                text: 'Monte Carlo (Unix) - APD simulations, including noise; tool developed by $URL|Campbell Group, UVA|http://www.ece.virginia.edu/pdg/index.html|',
            }, {
                List_id: '0-7',
                text: 'Band diagramming (Java and Python) - Poisson and Poisson-Schrodinger solvers, e.g. $URL|OpenBandParams|https://github.com/scott-maddox/openbandparams|',
            },
        ],
    },{
        id: '1',
        title: 'Other equipment available through Microelectronics Research Center (NSF-NNCI)',
        list: [
            {
                List_id: '1-0',
                text: 'Processing: III-V and Si processing (litho, ICP/RIE dry etch, metallization, etc), wafer bonding, lapping/polishing, wire bonding, etc.',
            },{
                List_id: '1-1',
                text: 'Characterization: HR-XRD (rotating anode Rigaku SmartLab), AFM, TEM, Hall Effect, PPMS, C-V, etc.',
            },
        ],
    }, {
        id: '2',
        title: 'Advanced energetics',
        list: [
            {
                List_id: '2-0',
                text: 'Espresso - Illy Francis Francis! Model X7.1 IperEspresso Machine',
            },{
                List_id: '2-1',
                text: 'Pourover (6 cup) - Chemex Classic Series',
            }, {
                List_id: '2-2',
                text: 'French Press (20 oz.) - Bodum Chambord (all-metal construction)',
            }, {
                List_id: '2-3',
                text: 'Jura-Capresso Infinity (commercial-grade conical burr grinder)',
            }, {
                List_id: '2-4',
                text: 'Dairy - Nespresso Aerocinno Plus',
            },
        ],
    }
]

export default function Facilities(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

	/*
	    Parameter (text): a variable contains a whole text
	    Purpose: if a word should be linking to URL in a text, then this subroutine will be used to achieve that
	    Credit to G. Michael
	*/
	function linkify(text) {
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
				<Text style = {styles.link} onPress={LinkOpener(url)}>{link_text}</Text>
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
	                <Text style={styles.lblColorized}>
	                    <Text>{'\t\t\u25E6'} {subs1}</Text>
	                    <Text style={{fontSize: 14}}>{"cm"}</Text>
	                    <Text style={{fontSize: 8, fontWeight: "bold"}}>{"-1"}</Text>
	                    <Text>{subs2}</Text>
	                </Text>
	            );
	        } else {
	            return (
	                <Text style={styles.lblColorized}>{'\t\t\u25E6'} {text}</Text>
	            );
	        }
	    } else {
	        return (
	            <Text style={styles.lblColorized}>
	                {'\t\t\u25E6'} {text}
	            </Text>
	        );
	    }
	}

    return (
        <View style={styles.componentBackground}>
            <ScrollView>
				<View style={{marginLeft: 15}}>
                <View style={{marginVertical: 15}}>
                    <Image
                      style={styles.facilitiesPic}
                      source={{uri: 'https://lase.mer.utexas.edu/images/facilities_large.jpg' }}
                    />
                </View>

				<Text style={[styles.lblPrimaryHeading, {alignSelf: "center"}]}>Machines</Text>
                {machines.map(machine => (
                    <View key = {machine.id}>
                        <Text style={styles.lblSecondaryHeading}>{machine.title}</Text>
                        <Text style={styles.lblColorized}>{'\t\u2022'} {machine.history}</Text>
                        <Text style={styles.lblColorized}>{'\t\u2022'} Materials:</Text>
                        {machine.materials.map(material => (
                            <View key={material.Material_id}>
                                <Text style={styles.lblColorized}>
                                    {'\t\t\u25E6'} {material.text}
                                </Text>
                            </View>

                        ))}
                        <Text style={styles.lblColorized}>{'\t\u2022'} Ancillary Equipment: </Text>
                        {machine.equipment.map(equip => (
                            <View key={equip.Equip_id}>
                                <Text style={styles.lblColorized}>
                                    {'\t\t\u25E6'} {equip.text}
                                </Text>
                            </View>
                        ))}
                    </View>
				))}
				<View style={styles.sectionBreak} />

				<Text style={[styles.lblPrimaryHeading, {alignSelf: "center"}]}>Structure</Text>
                {structure.map(struct => (
                    <View key={struct.id}>
                        <Text style={styles.lblSecondaryHeading}>{linkify(struct.title)} </Text>
                        <Text style={styles.lblColorized}>{'\t\u2022'} {struct.description} </Text>
                        <Text style={styles.lblColorized}>{'\t\u2022'} Equipment: </Text>
                        {struct.equipment.map(equip => (
                            <View key={equip.Equip_id}>
                                <Text style={styles.lblColorized}>
                                    {'\t\t\u25E6'} {equip.text}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
				<View style={styles.sectionBreak} />

				<Text style={[styles.lblPrimaryHeading, {alignSelf: "center"}]}>Optical Setup</Text>
                {opticalSetup.map(opt => (
                    <View key={opt.id}>
                        <Text style={styles.lblSecondaryHeading}>{opt.title} </Text>
						{opt.setup.map(setUp => (
                            <View key={setUp.Setup_id}>
                                <Text style={styles.lblColorized}>
                                    {'\t\u2022'} {setUp.text}
                                </Text>
                            </View>
                        ))}
                        <Text style={styles.lblColorized}> {'\t\u2022'} Ancillary Equipment: </Text>
                        {opt.Equipment.map(equip => (
                            <View key={equip.Equip_id}>
                                <Text style={styles.lblColorized}>
                                    {'\t\t\u25E6'} {equip.text}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
				<View style={styles.sectionBreak} />

				<Text style={[styles.lblPrimaryHeading, {alignSelf: "center"}]}>Futur-er</Text>
                <Text style={styles.lblSecondaryHeading}>{linkify(fourier[0].title)} </Text>
				{fourier.map(section => (
					<View key={section.id}>
						<Text style={styles.lblColorized}>{'\t\u2022'} {section.name} </Text>
						{section.options.map(subsection => (
						<View key={subsection.Opt_id}>
							{superScript(subsection.text,section.name)}
						</View>
						))}
					</View>
				))}
				<View style={styles.sectionBreak} />

				<Text style={[styles.lblPrimaryHeading, {alignSelf: "center"}]}>Tools</Text>
				{tools.map(tool => (
					<View key={tool.id}>
						<Text style={styles.lblSecondaryHeading}>{tool.title} </Text>
						<Text style={styles.lblColorized}>{'\t\u2022'} {tool.description} </Text>
						<Text style={styles.lblColorized}>{'\t\u2022'} Equipment: </Text>
						{tool.Equipment.map(equip => (
							<View key={equip.Equip_id}>
								<Text style={styles.lblColorized}>
									{'\t\t\u25E6'} {equip.text}
								</Text>
							</View>
						))}
			        </View>
			    ))}
				<View style={styles.sectionBreak} />

				<Text style={[styles.lblPrimaryHeading, {alignSelf: "center"}]}>Additional Information</Text>
                {sim_otherEquip_energeties.map(section => (
					<View key={section.id}>
						<Text style={styles.lblSecondaryHeading}>{section.title}</Text>
						{section.list.map(subsection => (
							<View key={subsection.List_id}>
								<Text style={styles.lblColorized}>
									{'\t\u2022'} {linkify(subsection.text)}
								</Text>
							</View>
						))}
					</View>
				))}
				</View>
				<Footer />
            </ScrollView>
        </View>
    );
}

const LocalStyles = {
	facilitiesPic: {
		alignSelf: "center",
		width: GetDimension(550, 400, true),
		height: GetDimension(550, 400, false)
	},
};
