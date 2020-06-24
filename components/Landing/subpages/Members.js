import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform, Dimensions } from 'react-native';

//header image
const membersImage = {
  uri: 'https://lase.mer.utexas.edu/images/group2019.jpg',
  width: 500,
  height: 500,
};

//principal investigator's infomation
const PrincipalInvestigator = [
  {
    id: '0',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/Seth_Bank_High.jpg',
      width: 100,
      height: 150,
    },
    name: 'Seth R. Bank',
    title: 'Cullen Trust for Higher Education Endowed Professorship in Engineering #6',
    email: 'sbank_at_ece.utexas.edu',
    phone: '(512) 471-9669',
    cv: 'SRB_CV.pdf',
    scholar: 'Profile',
    bio: `
    Seth Bank received the B.S. degree from the University of Illinois at Urbana-Champaign in 1999 and the M.S. and Ph.D. degrees in 2003 and 2006 from Stanford University, all in electrical engineering. In 2006, he was a post-doctoral scholar at the University of California at Santa Barbara. He joined the faculty of the University of Texas at Austin in 2007, where he is currently a full professor and holder of Cullen Trust for Higher Education Endowed Professorship in Engineering #6.

    His current research interests are centered on the growth of analog/digital alloy semiconductors (e.g. AlInAsSb) and metal/semiconductor hetero- and nano-structures (e.g. ErAs nanoparticles in GaAs) and their application to plasmonics, silicon-based lasers, avalanche photodiodes, mid-IR lasers, sensors, THz generation and sensing, and high-speed transistors. He has coauthored >350 papers and presentations that have been cited >4500 times, with a Hirsch-Index of 36.
    His group has received 5 Best Paper Awards and he has received the 2008 Young Investigator Award at the North American MBE Conference (NAMBE), a 2008 Young Faculty Award from DARPA, the 2009 Young Scientist Award from the International Symposium on Compound Semiconductors (ISCS), a Presidential Early Career Award for Scientists and Engineers (PECASE) in 2009 (nominated by ARO), an AFOSR Young Investigator Program (YIP) Award in 2009, an ONR Young Investigator Program (YIP) Award in 2010, a Faculty Early Career Development (CAREER) Program Award from the NSF in 2010, as well as the 2019 Gordon T. Lepley IV Memorial Teaching Award from UT.
    He has been the Program Chair of the AVS North American MBE meeting (NAMBE), as well as a Program and General Chair for the IEEE/OSA Conference on Lasers and Electro-Optical (CLEO) and the IEEE Device Research Conference (DRC). He is currently a Board Member of IEEE DRC and was a Steering Committee member of OSA/IEEE CLEO; he is an active member of the Electronic Materials Conference (EMC) committee and has helped organize other conferences, including the IEEE Electron Device Meeting (IEDM), InP and Related Materials (IPRM), and the IEEE Photonics Society Annual Meeting (IPC).`
  }
]

//array of graduate students' infomation
const GradStudents = [
    {
        id: '0',
        name: 'Andrew Briggs',
        email: 'abriggs_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S. in Physics and Mathematics, Bates College 2015 \nM.S. in Electrical Engineering, University of Texas at Austin 2017 \nAndrew is an ECE Ph.D. student studying MBE growth`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/abriggs.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '1',
        name: 'Rasha El-Jaroudi',
        email: 'reljaroudi_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S.in Electrical Engineering, Georgia Institute of Technology 2015 \nFulbright Research Grant, United Arab Emirates 2015-2016 \nM.S. in Electrical Engineering, University of Texas at Austin 2018 \nRasha is an ECE Ph.D. student studying strain engineering and highly-mismatched alloys.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/reljaroudi2.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '2',
        name: 'Ashlee Garcia',
        email: 'ashgarcia_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S. in Electrical Engineering and Computer Sciences, University of California, Berkeley 2019 \nAshlee is an ECE Ph.D. student studying MBE growth.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/AGarcia.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '3',
        name: 'Hardik Jain',
        email: 'hardikbjain_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.E.(Hons.) in Electronics and Instrumentation Engineering, Birla Institute of Technology and Science 2011 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2016 \nHardik is a PhD student in the ECE department of UT Austin studying analog photonics and interference cancelation for wireless and wired communication system.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/HJain.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '4',
        name: 'Farzad Mokhtari Koushyar',
        email: 'mokhtari_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S. in Electrical Engineering at Bu-Ali Sina University, 2008-2012 \nM.S. in Microwave and Optics Engineering at Sharif University of Technology, 2012-2015 \nFarzad is a Ph.D. student in the ECE department of UT Austin studying high-speed and highly-linear microwave photonics, since 2017.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/Farzard.png',
            width: 100,
            height: 150,
        }
    },

    {
        id: '5',
        name: 'Thomas Leonard',
        email: 'taleona3_at_ncsu.edu',
        phone: '(512) 471-5383',
        bio: `B.S.in Materials Science and Engineering, North Carolina State University 2018 \nThomas is a Ph.D. student studying the fabrication of emerging materials. As an NNCI REU at UT during Summer 2017, Thomas optically characterized encapsulated high-contrast dielectric gratings.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/thomas.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '6',
        name: 'Stephen March',
        email: 'sdmarch_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S. in Electrical Engineering, Iowa State University 2013 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2016 \nNational Science Foundation Graduate Research Fellow \nStephen spent Summer 2013 in the group as a NNIN REU. He returned to the group as an ECE graduate student after spending 2014 working for IBM and is studying novel photodetector devices and materials grown by MBE.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/StephenMarch.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '7',
        name: '(Joshua) Andrew McArthur',
        email: 'jandrewmcarthur_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S. in Mechanical Engineering, University of Arkansas 2019 \nIn 2018, as a summer REU student, Andrew studied the optical properties of III-V semiconductor alloys incorporating boron.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/JoshuaMcArthur.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '8',
        name: 'Qian Meng',
        email: 'qmeng19_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S in Microelectronic Science and Engineering, Sichuan University 2018 \nQian is studying the simulation of highly-mismatched III-V alloys.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/Qian_Meng.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '9',
        name: 'Ann Kathryn Rockwell',
        email: 'akrockwell_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S. in Physics, University of Alabama 2013 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2016 \nNational Science Foundation Graduate Research Fellow \nAnn Kathryn is an ECE Ph.D. student studying the MBE growth of photonic materials, including AlInAsSb-based avalanche photodetectors.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/AK_Rockwell_new.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '10',
        name: 'Scott D. Sifferman',
        email: 'Scott.D.Sifferman_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S.E in Electrical Engineering, Arizona State University 2004 \nM.S. in Electrical Engineering, Stanford University 2006 \nScott is an ECE Ph.D. student whose research focus is the development and study of devices for mid-infrared and terahertz generation.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/siff.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '11',
        name: 'Alec M. Skipper',
        email: 'alecskipper_at_utexas.edu',
        phone: '(512) 934-3717',
        bio: `B.S. in Electrical and Computer Engineering, University of Texas at Austin 2018 \nB.A. in East Asian Studies, University of Texas at Austin 2017 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2018 \nAlec is an ECE Ph.D. student who joined the group as an undergraduate and is studying lateral epitaxial overgrowth by MBE.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/alec.jpg',
            width: 100,
            height: 150,
        }
    },

    {
        id: '12',
        name: '(Rachel) Corey White',
        email: 'coreywhite_at_utexas.edu',
        phone: '(512) 471-5383',
        bio: `B.S. in Electrical Engineering, North Carolina State University 2019 \nNational Science Foundation Graduate Research Fellow \nCorey is Ph.D. student studying dilute-boride sources and detectors on silicon. As an REU student during Summer 2018, Corey worked on characterizing B-III-V alloys for use as photodetectors.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/Cwhite.jpg',
            width: 100,
            height: 150,
        }
    },

]

//array of undergraduate students' information
const UndergradStudents = [
  {
    id: '0',
    name: 'Brent Bouslog',
    bio: 'Brent is an undergraduate Electrical Engineering student at the University of Texas. He is studying the optical properties of III-V semiconductors.',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/BBouslog.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '1',
    name:'Eric Chen',
    bio: 'Eric is an undergraduate Electrical Engineering major working on the fabrication and optical characterization of novel III-V materials.',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/EChen.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '2',
    name:'Teddy Hsieh',
    bio:'Teddy is a freshman Electrical Engineering and Chemistry major interested in nanotechnology. He is working on the characterization of photonics materials and novel fabrication techniques for 3D devices.',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/THsieh.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '3',
    name:'Akarsh Kumar',
    bio:'Akarsh is an undergraduate Electrical Engineering and Physics student at the University of Texas. He is simulating the band structure of III-V materials using a tight binding approach.',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/AKumar.jpeg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '4',
    name: 'Alonzo Ramon',
    bio: 'Alonzo is an undergraduate Computer Engineering student at the University of Texas at San Antonio. He is working on the fabrication of materials for 3D optoelectronic devices.',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/ARamon.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '5',
    name: 'Rithvik Ramesh',
    bio: 'Rithvik is an undergraduate Electrical Engineering and Physics student at the University of Texas at Austin. He is working on the characterization of photonics materials and three dimensional device manufacturing techniques.',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/RRamesh.jpg',
      width: 100,
      height: 150,
    },
  },

]

//array of staff information
const Staff = [
  {
    id: '0',
    name: 'Terry Mattord',
    email: 'tmattord_at_mail.utexas.edu',
    phone: '(512) 471-1013',
    bio: 'Terry supports the UT-Austin MBE lab. He is a world-recognizezed expert in MBE and ultra-high vacuum equipment and holds several key patents related to the technology of MBE: the valved arsenic cracker, the heated viewport, and several novel effusion cell designs. He has >20 years experience maintaining, upgrading, and supervising the MBE facility at UT-Austin. He has almost 10 years additional experience as a staff member at Perkin-Elmer in their MBE and physical electronics divisions.',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/TerryMattord.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '1',
    name: 'Christine Wood',
    email: 'christine.wood_at_austin.utexas.edu',
    phone: '(512) 232-9007',
    bio: 'Christine is the group Administrative Assistant. In her “spare” time, she keeps the LASE group running smoothly (despite Seth’s best efforts).',
    image: {
      uri: 'https://lase.mer.utexas.edu/images/cw.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '2',
    name: 'Claire “Bear” Bank',
    bio: 'The ClaireBear was named Chief Executive Officer in early 2009, largely due to her mighty roar. Some suspect nepotism. Her career aspiration is to be the world’s first doggie zoo keeper.',
    email: null,
    phone: null,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/CSB.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '3',
    name: 'Simon “Patience” Connors-Bank',
    bio: 'Simon was named Executive VP of Epitaxy for the LASE Group in 2007, despite his lack of formal education, limited knowledge of the English language, and questionable understanding of basic physics. Some suspect nepotism here as well. His research interests are in the areas of squirrel watching and pursuit.',
    email: null,
    phone: null,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/SimonBank.jpg',
      width: 100,
      height: 150,
    },
  },

]

//array of alumni postdocs information
const Postdocs = [
  {
    id: '0',
    name: 'Kumar Appaiah (Associate Professor, IIT Bombay EE Dept.)',
    email: null,
    phone: null,
    website: 'https://www.ee.iitb.ac.in/~akumar/',
    cv: null,
    bio: `B.Tech. in Electrical Engineering, Indian Institute of Tech. Madras, India 2008 \nM.Tech. in Comm. Engineering, Indian Institute of Tech. Madras, India 2008 \nPh.D. in Electrical and Computer Engineering, University of Texas at Austin 2013 \nKumar was co-supervised with Prof. Sriram Vishwanath and worked on signal processing, electronic dispersion compensation and MIMO for optical fibers. After graduation, he joined the Qualcomm Research to apply advanced modulation techniques to visible light communication links. He is currently an Associate Prof. at IIT-Bombay.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/kumar.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '1',
    name: 'Adam Crook (Principal Device Physicist, FLIR)',
    email: 'acrook_at_mail.utexas.edu',
    phone: '(512) 471-5383',
    website: 'lase.ece.utexas.edu/acrook',
    cv: 'AMC_CV.pdf',
    bio: `B.S. in Electrical and Computer Engineering, UC Santa Barbara 2007 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2009 \nPh.D. in Electrical and Computer Engineering, University of Texas at Austin 2012 \nAdam was an ECE Ph.D. student studying the MBE growth and optical properties of midinfrared compound semiconductor and rare-earth nanocomposite optical materials. Upon graduation, he joined the R&D division at Lockheed Martin in Goleta, CA. Check out a pic of Seth built taken with one of their IR cameras here. He then moved to Raytheon as a program manager, before joining FLIR in 2019 as a Principal Device Physicist.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/AdamCrook.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '2',
    name: 'Vaishno Devi Dasika (Research Scientist, Cree)',
    email: 'vdasika_at_austin.utexas.edu',
    phone: '(512) 471-5383',
    website: 'Here',
    cv: null,
    bio: `B.S.E. in Electrical Engineering, University of Michigan, Ann Arbor 2002 \nM.S.E. in Electrical Engineering, University of Michigan, Ann Arbor 2004 \nPh.D. in Electrical Engineering, University of Michigan, Ann Arbor 2010 \nVaishno was a postdoctoral scholar working on the molecular beam epitaxial growth, fabrication, and nanoscale characterization of metal:semiconductor nanocomposites and related materials in collaboration with Prof. Ed Yu. After her postdoc, she joined Texas Instruments in Dallas, TX before moving to Cree as a Research Scientist.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/vdd.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '3',
    name: 'Daniel Ironside (Tactual Labs)',
    email: 'daniel.ironside_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    bio: `B.S. in Aerospace Engineering, Saint Louis University 2010 \nB.S. in Physics, Saint Louis University 2010 \nM.S. in Electrical Engineering, Washington University in St. Louis 2012 \nPh.D. in Electrical and Computer Engineering, The University of Texas at Austin 2019 \nDan was an ECE PhD student studying the application of new metamaterial functionality to photonic devices. After graduation, he joined Tactual Labs working on human-machine interfaces.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/DIronside.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '4',
    name: 'Erica (Krivoy) Davis (Fish & Richardson)',
    email: 'erica.krivoy_at_utexas.edu',
    phone: '(512) 471-5383',
    website: 'http://emkrivoy.com',
    cv: null,
    bio: `B.S. Physics, Carnegie Mellon University 2007 \nM.S. Electrical and Computer Engineering, University of Texas at Austin 2010 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2013 \nErica was an ECE PhD student studying the MBE growth and properties of new rare-earth/group-V compounds, including LaAs, LuAs, and LaxLu1-xAs, as well as the applications of these materials to plasmonics, buried transparent contacts, and metamorphic buffer layers. She is now a technical specialist / patent agent with Fish & Richardson, an intellectual property law firm.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/Erica_LASE.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '5',
    name: 'Scott Maddox (Intel)',
    email: 'smaddox_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    bio: `B.S. in Electrical and Computer Engineering, University of Texas at Austin 2009 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2011 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2015 \nAs an ECE PhD student and postdoctoral scholar with the LASE group, Scott researched and developed compound semiconductor materials and devices including InAs and GaSb-based high-gain, low-noise avalanche photodiodes grown by molecular beam epitaxy (MBE). Following his postdoc, he joined the Portland Technology Development (PTD) group at Intel in Hillsboro, OR.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/scott_000.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '6',
    name: 'Kyle McNicholas (MIT Lincoln Laboratory)',
    email: 'kyle.mcnicholas_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    bio: `B.S. in Electrical and Computer Engineering, The Ohio State University 2011 \nM.S. in Electrical and Computer Engineering, The Ohio State University 2012 \nPh.D. in Electrical and Computer Engineering, The University of Texas at Austin 2019 \nAs a PhD student, Kyle studied the growth and properties of highly-mismatched alloys incorporating boron and rare-earth pnictide alloys using molecular beam epitaxy. After graduating, he joined MIT Lincoln Laboratory as a member of the technical staff.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/Kyle_McNicholas2.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '7',
    name: 'Hari Nair (Cornell University MSE Dept.)',
    email: 'hnair_at_mail.utexas.edu',
    phone: '(512) 471-5383',
    website: 'uts.cc.utexas.edu/~hnair',
    cv: null,
    bio: `B.Tech in Engineering Physics, Indian Institute of Technology Madras, India 2006 \nM.S. Electrical and Computer Engineering, University of Texas at Austin 2009 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2013 \nHari was an ECE Ph.D. student that developed a new approach to extend the emission wavelength of mid-infrared diode lasers. After making the group's first laser, he joined Prof Darrell Schlom's lab at Cornell as a postdoctoral scholar.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/IMG_2278.JPG',
      width: 100,
      height: 150,
    },
  },

  {
    id: '8',
    name: 'Rodolfo Salas (Lockheed Martin)',
    email: 'rodolfo.salas_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    bio: `B.S. Electrical Engineering, University of Oklahoma 1999 \nM.S. Electrical Engineering, University of Oklahoma 2006 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2015 \nRodolfo was an ECE Ph.D. student studying the MBE growth and optical properties of RE-As based nanocomposite materials for heterodyne THz generation. After graduation, he moved to Boston, MA and joined MIT Lincoln Labs as a full-time member of the technical staff. He is currently a researcher at Lockheed Martin.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/rodolfo_000.jpg',
      width: 100,
      height: 150,
    },
  },

  {
    id: '9',
    name: 'Emily Walker (Intel)',
    email: 'eswalker_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    bio: `B.S. in Materials Science Engineering, Carnegie Mellon University 2012 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2014 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2018 \nEmily was an ECE PhD student studying the MBE growth, transfer, and electronic properties of group-V thin films (Bi and Bi1-xSbx) for spintronic devices. After her PhD, she joined the Components Research group at Intel in Hillsboro, OR.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/EmilyWalker.jpg',
      width: 100,
      height: 150,
    },
  },
]

export default function Members(props) {

    return (
        <View>
            <Text style={styles.header}>Members</Text>
        <View
            style={{ justifyContent: 'center', alignItems: 'center',}}>
            <Image source={membersImage}/>
        <View>

        <View>
            <Text style={styles.sectionHeader}>Principal Investigator</Text>
        </View>
        {
        //renders the principal investigator's info in a readable layout
        PrincipalInvestigator.map(item => (
            <View key={item.id}>
                  <View style={styles.imageTextContainer}>
                      <Image style={styles.image} source={item.image}/>
                          <View style={styles.textContainer}>
                              <Text style={styles.infoHeader}>{item.name}</Text>
                              <Text>{item.title}</Text>
                              <Text style={styles.infoHeader}>Email: <Text style={styles.link}>{item.email}</Text></Text>
                              <Text style={styles.infoHeader}>Phone: <Text style={styles.info}>{item.phone}</Text></Text>
                              <Text style={styles.infoHeader}>CV: <Text style={styles.info}>{item.cv}</Text></Text>
                              <Text style={styles.infoHeader}>Scholar: <Text style={styles.info}>{item.scholar}</Text></Text>
                              <Text style={styles.bio}>{item.bio}</Text>
                          </View>
                    </View>
            </View>
        ))
      }

        <View>
            <Text style={styles.sectionHeader}>Graduate Students</Text>
        </View>
        {
        //renders the array of grad students in a readable layout
        //// TODO: don't displat email and phone headers when fields are null
        GradStudents.map(item => (
            <View key={item.id}>
                  <View style={styles.imageTextContainer}>
                      <Image style={styles.image} source={item.image}/>
                          <View style={styles.textContainer}>
                              <Text style={styles.infoHeader}>{item.name}</Text>
                              <Text style={styles.infoHeader}>Email: <Text style={styles.link}>{item.email}</Text></Text>
                              <Text style={styles.infoHeader}>Phone: <Text style={styles.info}>{item.phone}</Text></Text>
                              <Text style={styles.bio}>{item.bio}</Text>
                          </View>
                    </View>
            </View>
        ))
      }

      <View>
          <Text style={styles.sectionHeader}>Undergraduate Students</Text>
      </View>
      {
      //renders the array of undergrad students in a readable layout
      UndergradStudents.map(item => (
          <View key={item.id}>
                <View style={styles.imageTextContainer}>
                    <Image style={styles.image} source={item.image}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.infoHeader}>{item.name}</Text>
                            <Text style={styles.bio}>{item.bio}</Text>
                        </View>
                  </View>
          </View>
      ))
    }

    <View>
        <Text style={styles.sectionHeader}>Staff</Text>
    </View>
    {
    //renders the array of staff in a readable layout
    Staff.map(item => (
        <View key={item.id}>
              <View style={styles.imageTextContainer}>
                  <Image style={styles.image} source={item.image}/>
                      <View style={styles.textContainer}>
                          <Text style={styles.infoHeader}>{item.name}</Text>
                          <Text style={styles.infoHeader}>Email: <Text style={styles.link}>{item.email}</Text></Text>
                          <Text style={styles.infoHeader}>Phone: <Text style={styles.info}>{item.phone}</Text></Text>
                          <Text style={styles.bio}>{item.bio}</Text>
                      </View>
                </View>
        </View>
    ))
  }


  <View>
      <Text style={styles.sectionHeader}>Alumni (Ph.D.'s and Postdocs</Text>
  </View>
  {
  //renders the array of alumni postdocs staff in a readable layout
  Postdocs.map(item => (
      <View key={item.id}>
            <View style={styles.imageTextContainer}>
                <Image style={styles.image} source={item.image}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.infoHeader}>{item.name}</Text>
                        <Text style={styles.infoHeader}>Email: <Text style={styles.link}>{item.email}</Text></Text>
                        <Text style={styles.infoHeader}>Phone: <Text style={styles.info}>{item.phone}</Text></Text>
                        <Text style={styles.infoHeader}>CV: <Text style={styles.link}>{item.cv}</Text></Text>
                        <Text style={styles.infoHeader}>Website: <Text style={styles.info}>{item.website}</Text></Text>
                        <Text style={styles.bio}>{item.bio}</Text>
                    </View>
              </View>
      </View>
  ))
}


      </View>
  </View>
</View>
    );
}


const styles = StyleSheet.create({

  header: {
    color: '#c60',
    fontSize: 40,
  },

  imageTextContainer: {
    flexDirection: 'row',
    padding: 20,
  },

    textContainer: {
      flexDirection: 'column',
    },

    sectionHeader:{
      fontWeight: "bold",
      fontSize: 15,
      marginLeft: 20,
      paddingTop: 10,
      paddingBottom: 10,
    },

    infoHeader: {
        fontWeight: "bold",
        paddingTop: 5,
        paddingBottom: 5,
    },
    info: {
      fontWeight: "normal",
      paddingTop: 5,
      paddingBottom: 5,
    },

    bio: {
      paddingTop: 10,
      flexWrap: 'wrap',
    },

    link: {
      color: "#c60",
      fontWeight: "normal",
    },

    image: {
        marginLeft: 50,
        marginRight: 20,
    }
});
