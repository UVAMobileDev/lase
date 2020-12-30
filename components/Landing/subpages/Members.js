import React, { useContext, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Footer from '../Footer';
import { LightStyles, DarkStyles } from '../../../constants/globalStyle';
import KeyContext from '../../../KeyContext';
import { LinkOpener, GetDimension } from '../../../constants/SimpleFunctions';

// Header image
const membersImage = {
  uri: 'https://lase.mer.utexas.edu/images/group2019.jpg',
  width: 600,
  height: 400,
};

const GradStudents = [
    {
        id: '0',
        name: 'Andrew Briggs',
        email: 'abriggs_at_utexas.edu',
        emaillink: 'mailto:abriggs_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S. in Physics and Mathematics, Bates College 2015 \nM.S. in Electrical Engineering, University of Texas at Austin 2017`,
        bio: `Andrew is an ECE Ph.D. student studying MBE growth`,
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
        emaillink: 'mailto:reljaroudi_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S.in Electrical Engineering, Georgia Institute of Technology 2015 \nFulbright Research Grant, United Arab Emirates 2015-2016 \nM.S. in Electrical Engineering, University of Texas at Austin 2018`,
        bio: `Rasha is an ECE Ph.D. student studying strain engineering and highly-mismatched alloys.`,
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
        emaillink: 'mailto:ashgarcia_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S. in Electrical Engineering and Computer Sciences, University of California, Berkeley 2019`,
        bio: `Ashlee is an ECE Ph.D. student studying MBE growth.`,
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
        emaillink: 'mailto:hardikbjain_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.E.(Hons.) in Electronics and Instrumentation Engineering, Birla Institute of Technology and Science 2011 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2016`,
        bio: `Hardik is a PhD student in the ECE department of UT Austin studying analog photonics and interference cancelation for wireless and wired communication system.`,
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
        emaillink: 'mailto:mokhtari_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S. in Electrical Engineering at Bu-Ali Sina University, 2008-2012 \nM.S. in Microwave and Optics Engineering at Sharif University of Technology, 2012-2015`,
        bio: `Farzad is a Ph.D. student in the ECE department of UT Austin studying high-speed and highly-linear microwave photonics, since 2017.`,
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
        emaillink: 'mailto:taleona3_at_ncsu.edu',
        phone: '(512) 471-5383',
        education: `B.S.in Materials Science and Engineering, North Carolina State University 2018`,
        bio: `Thomas is a Ph.D. student studying the fabrication of emerging materials. As an NNCI REU at UT during Summer 2017, Thomas optically characterized encapsulated high-contrast dielectric gratings.`,
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
        emaillink: 'mailto:sdmarch_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S. in Electrical Engineering, Iowa State University 2013 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2016 \nNational Science Foundation Graduate Research Fellow`,
        bio: `Stephen spent Summer 2013 in the group as a NNIN REU. He returned to the group as an ECE graduate student after spending 2014 working for IBM and is studying novel photodetector devices and materials grown by MBE.`,
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
        emaillink: 'mailto:jandrewmcarthur_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S. in Mechanical Engineering, University of Arkansas 2019`,
        bio: `In 2018, as a summer REU student, Andrew studied the optical properties of III-V semiconductor alloys incorporating boron.`,
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
        emaillink: 'mailto:qmeng19_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S in Microelectronic Science and Engineering, Sichuan University 2018`,
        bio: `Qian is studying the simulation of highly-mismatched III-V alloys.`,
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
        emaillink: 'mailto:akrockwell_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S. in Physics, University of Alabama 2013 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2016 \nNational Science Foundation Graduate Research Fellow`,
        bio: `Ann Kathryn is an ECE Ph.D. student studying the MBE growth of photonic materials, including AlInAsSb-based avalanche photodetectors.`,
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
        emaillink: 'mailto:Scott.D.Sifferman_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S.E in Electrical Engineering, Arizona State University 2004 \nM.S. in Electrical Engineering, Stanford University 2006`,
        bio: `Scott is an ECE Ph.D. student whose research focus is the development and study of devices for mid-infrared and terahertz generation.`,
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
        emaillink: 'mailto:alecskipper_at_utexas.edu',
        phone: '(512) 934-3717',
        education: `B.S. in Electrical and Computer Engineering, University of Texas at Austin 2018 \nB.A. in East Asian Studies, University of Texas at Austin 2017 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2018`,
        bio: `Alec is an ECE Ph.D. student who joined the group as an undergraduate and is studying lateral epitaxial overgrowth by MBE.`,
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
        emaillink: 'mailto:coreywhite_at_utexas.edu',
        phone: '(512) 471-5383',
        education: `B.S. in Electrical Engineering, North Carolina State University 2019 \nNational Science Foundation Graduate Research Fellow`,
        bio: `Corey is Ph.D. student studying dilute-boride sources and detectors on silicon. As an REU student during Summer 2018, Corey worked on characterizing B-III-V alloys for use as photodetectors.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/Cwhite.jpg',
            width: 100,
            height: 150,
        }
    },

]
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
const Staff = [
  {
    id: '0',
    name: 'Terry Mattord',
    email: 'tmattord_at_mail.utexas.edu',
    emaillink: 'mailto:tmattord_at_mail.utexas.edu',
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
    emaillink: 'mailto:christine.wood_at_austin.utexas.edu',
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
const Postdocs = [
  {
    id: '0',
    name: 'Kumar Appaiah (Associate Professor, IIT Bombay EE Dept.)',
    email: null,
    phone: null,
    website: 'https://www.ee.iitb.ac.in/~akumar/',
    cv: null,
    education: `B.Tech. in Electrical Engineering, Indian Institute of Tech. Madras, India 2008 \nM.Tech. in Comm. Engineering, Indian Institute of Tech. Madras, India 2008 \nPh.D. in Electrical and Computer Engineering, University of Texas at Austin 2013`,
    bio: `Kumar was co-supervised with Prof. Sriram Vishwanath and worked on signal processing, electronic dispersion compensation and MIMO for optical fibers. After graduation, he joined the Qualcomm Research to apply advanced modulation techniques to visible light communication links. He is currently an Associate Prof. at IIT-Bombay.`,
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
    emaillink: 'mailto:acrook_at_mail.utexas.edu',
    phone: '(512) 471-5383',
    website: 'lase.ece.utexas.edu/acrook',
    cv: 'AMC_CV.pdf',
    cvlink: 'https://lase.mer.utexas.edu/acrook/documents/AMC_CV.pdf',
    education: `B.S. in Electrical and Computer Engineering, UC Santa Barbara 2007 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2009 \nPh.D. in Electrical and Computer Engineering, University of Texas at Austin 2012`,
    bio: `Adam was an ECE Ph.D. student studying the MBE growth and optical properties of midinfrared compound semiconductor and rare-earth nanocomposite optical materials. Upon graduation, he joined the R&D division at Lockheed Martin in Goleta, CA. Check out a pic of Seth built taken with one of their IR cameras here. He then moved to Raytheon as a program manager, before joining FLIR in 2019 as a Principal Device Physicist.`,
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
    emaillink: 'mailto:vdasika_at_austin.utexas.edu',
    phone: '(512) 471-5383',
    publications: 'Here',
    publicationslink: 'http://lase.ece.utexas.edu/publications.php?last=Dasika',
    cv: null,
    education: `B.S.E. in Electrical Engineering, University of Michigan, Ann Arbor 2002 \nM.S.E. in Electrical Engineering, University of Michigan, Ann Arbor 2004 \nPh.D. in Electrical Engineering, University of Michigan, Ann Arbor 2010`,
    bio: `Vaishno was a postdoctoral scholar working on the molecular beam epitaxial growth, fabrication, and nanoscale characterization of metal:semiconductor nanocomposites and related materials in collaboration with Prof. Ed Yu. After her postdoc, she joined Texas Instruments in Dallas, TX before moving to Cree as a Research Scientist.`,
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
    emaillink: 'mailto:daniel.ironside_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    education: `B.S. in Aerospace Engineering, Saint Louis University 2010 \nB.S. in Physics, Saint Louis University 2010 \nM.S. in Electrical Engineering, Washington University in St. Louis 2012 \nPh.D. in Electrical and Computer Engineering, The University of Texas at Austin 2019`,
    bio: `Dan was an ECE PhD student studying the application of new metamaterial functionality to photonic devices. After graduation, he joined Tactual Labs working on human-machine interfaces.`,
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
    emaillink: 'mailto:erica.krivoy_at_utexas.edu',
    phone: '(512) 471-5383',
    website: 'http://emkrivoy.com',
    cv: null,
    education: `B.S. Physics, Carnegie Mellon University 2007 \nM.S. Electrical and Computer Engineering, University of Texas at Austin 2010 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2013`,
    bio: `Erica was an ECE PhD student studying the MBE growth and properties of new rare-earth/group-V compounds, including LaAs, LuAs, and LaxLu1-xAs, as well as the applications of these materials to plasmonics, buried transparent contacts, and metamorphic buffer layers. She is now a technical specialist / patent agent with Fish & Richardson, an intellectual property law firm.`,
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
    emaillink: 'mailto:smaddox_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    education: `B.S. in Electrical and Computer Engineering, University of Texas at Austin 2009 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2011 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2015`,
    bio: `As an ECE PhD student and postdoctoral scholar with the LASE group, Scott researched and developed compound semiconductor materials and devices including InAs and GaSb-based high-gain, low-noise avalanche photodiodes grown by molecular beam epitaxy (MBE). Following his postdoc, he joined the Portland Technology Development (PTD) group at Intel in Hillsboro, OR.`,
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
    emaillink: 'mailto:kyle.mcnicholas_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    education: `B.S. in Electrical and Computer Engineering, The Ohio State University 2011 \nM.S. in Electrical and Computer Engineering, The Ohio State University 2012 \nPh.D. in Electrical and Computer Engineering, The University of Texas at Austin 2019`,
    bio: `As a PhD student, Kyle studied the growth and properties of highly-mismatched alloys incorporating boron and rare-earth pnictide alloys using molecular beam epitaxy. After graduating, he joined MIT Lincoln Laboratory as a member of the technical staff.`,
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
    emaillink: 'mailto:hnair_at_mail.utexas.edu',
    phone: '(512) 471-5383',
    website: 'uts.cc.utexas.edu/~hnair',
    cv: null,
    education: `B.Tech in Engineering Physics, Indian Institute of Technology Madras, India 2006 \nM.S. Electrical and Computer Engineering, University of Texas at Austin 2009 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2013`,
    bio: `Hari was an ECE Ph.D. student that developed a new approach to extend the emission wavelength of mid-infrared diode lasers. After making the group's first laser, he joined Prof Darrell Schlom's lab at Cornell as a postdoctoral scholar.`,
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
    emaillink: 'mailto:rodolfo.salas_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    education: `B.S. Electrical Engineering, University of Oklahoma 1999 \nM.S. Electrical Engineering, University of Oklahoma 2006 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2015`,
    bio: `Rodolfo was an ECE Ph.D. student studying the MBE growth and optical properties of RE-As based nanocomposite materials for heterodyne THz generation. After graduation, he moved to Boston, MA and joined MIT Lincoln Labs as a full-time member of the technical staff. He is currently a researcher at Lockheed Martin.`,
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
    emaillink: 'mailto:eswalker_at_utexas.edu',
    phone: '(512) 471-5383',
    website: null,
    cv: null,
    education: `B.S. in Materials Science Engineering, Carnegie Mellon University 2012 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2014 \nPh.D. Electrical and Computer Engineering, University of Texas at Austin 2018`,
    bio: `Emily was an ECE PhD student studying the MBE growth, transfer, and electronic properties of group-V thin films (Bi and Bi1-xSbx) for spintronic devices. After her PhD, she joined the Components Research group at Intel in Hillsboro, OR.`,
    image: {
      uri: 'https://lase.mer.utexas.edu/images/EmilyWalker.jpg',
      width: 100,
      height: 150,
    },
  },
]
const Masters = [
    {
        id: '0',
        name: 'Sarah Muschinske (Massachusetts Institute of Technology)',
        education: null,
        bio: `Sarah recieved both her Bachelor's and her Master's degree in electrical engineering at UT Austin. Her projects included transfer process development for and transport studies on epitaxial Bi and Bi1-xSbx thin films. She began her PhD studies in electrical engineering at MIT in Fall 2018.`,
        image: {
          uri: 'https://lase.mer.utexas.edu/images/sarah.jpg',
        },
    },

    {
        id: '1',
        name: 'Nathanial Sheehan (Skorpios Technologies)',
        education: `B.S. in Electrical Engineering, University of California, Santa Barbara 2012 \nM.S. in Electrical and Computer Engineering, University of Texas at Austin 2014`,
        bio: `Nate studied low dimensional structures and compound semiconductor device fabrication.`,
        image: {
          uri: 'https://lase.mer.utexas.edu/images/sheehan.jpg',
        },
    },
]
const TeacherResearchers = [
    {
        id: '0',
        name: 'Ashley Bachmayer',
        bio: `Ashley is a high school science teacher in Killeen, TX. She spent Summer 2016 working with the LASE group as a NASCENT RET investigating wafer bonding of nanomembranes using indium for molecular beam epitaxy regrowth.`,
        image: {
          uri: 'https://lase.mer.utexas.edu/images/ashleyb.jpg',
        },
    },

    {
        id: '1',
        name: 'Pedro Merced',
        bio: `Pedro is a high school pre-calculus and calculus teacher in Manor, TX. Through the NSF Research Experience for Teachers (RET) program, he spent Summer 2014 with the group testing mid-infrared laser devices and investigating their operation.`,
        image: {
          uri: 'https://lase.mer.utexas.edu/images/PedroPicture.jpg',
        },
    },

    {
        id: '2',
        name: 'Steve Trenfield',
        bio: `Steve is a high school mathematics teacher in Austin, TX. He spent Summer 2015 working as a NASCENT RET investigating the effects of elevated temperature on mid-infrared LEDs.`,
        image: {
          uri: 'https://lase.mer.utexas.edu/images/SteveTrenfield.jpg',
        },
    }
]
const UndergradResearchers = [
    {
        id: '0',
        name: 'George Adams',
        bio: `George was an ECE undergraduate at UT-Austin who graduated from UT-Austin with a BS in Electrical and Computer Engineering in 2015. He spent the Spring 2014 semester learning cleanroom fabrication processes and etching gallium antimonide. He is currently a Software Engineer at Cerner Corporation.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/george.jpg',
        },
    },

    {
        id: '1',
        name: 'Brent Bouslog',
        bio: `Brent is an undergraduate Electrical Engineering student at the University of Texas. He studied the optical properties of III-V semiconductors.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/BBouslog.jpg',
        },
    },

    {
        id: '2',
        name: 'Gavin Campbell',
        bio: `Gavin is currently a MatSE graduate student at Northwestern. He spent the summer of 2010 with the group as an NNIN REU studying the annealing stability of nanoparticle enhanced tunnel junctions.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/gavin.jpg',
        },
    },

    {
        id: '3',
        name: 'Robert Chen',
        bio: `Robert completed the M.S. and Ph.D. in Electrical Engineering at Stanford University and is now gainfully employed at Apple. He was an undergraduate researcher from Spring 2007 through Summer 2008, where he studied the optical properties of dilute-nitride materials. He co-developed the group's photoluminescence and photoreflectance measurement setups.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/RobertChen.jpg',
        },
    },

    {
        id: '4',
        name: 'Harold Fu',
        bio: `Harold was a Cornell University undergraduate who spent Summer 2015 in the group as an NNIN REU. He studied the optical characteristics of AlInAsSb digital alloys films using photoluminescence and Fourier transform infrared (FTIR) spectroscopy.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/HaroldFu.jpg',
        },
    },

    {
        id: '5',
        name: 'Chris Gaytan',
        bio: `Chris is an undergraduate at the University of Texas at El Paso. Chris was a 2012 Summer Research Academy student studying the optical properties of annealed highly mismatched alloys for photonic device applications.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/CGaytan.jpg',
        },
    },

    {
        id: '6',
        name: 'Joel Guo',
        bio: `Joel is an undergraduate ECE student at the University of Texas at Austin. He worked with the LASE group from the Spring 2015 semester through the Spring 2017 semester learning optical materials characterization tools and techniques.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/joel.jpg',
        },
    },

    {
        id: '7',
        name: 'Abigail Johnson',
        bio: `Abigail is an ECE undergraduate at UT-Austin, expecting to graduate with a BS in Computer Engineering in May 2017. She spent the Spring 2014 semester with the LASE group learning cleanroom fabrication processes and depositing silicon nitride. During Summer 2016, she worked as a Software Engineer at IBM.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/abigail.jpg',
        },
    },

    {
        id: '8',
        name: 'Ze Lyu',
        bio: `Ze is an ECE undergraduate at the University of Texas at Austin. He worked on test station hardware integration.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/zelyu.jpg',
        },
    },

    {
        id: '9',
        name: 'Thien-An Nguyen',
        bio: `In 2011, Thien-An was an NSF REU student studying scanned probe microscopy of ErAs/GaAs tunnel junctions, working jointly with Prof. Ed Yu. He is currently a graduate student at UT-Austin working with Prof. Zheng Wang.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/TNguyen.jpg',
        },
    },

    {
        id: '10',
        name: 'Julio Novo',
        bio: `Julio was an ECE and Physics undergraduate at UT-Austin who graduated from UT-Austin with a BS in Electrical Engineering and Physics in Fall 2015. He was with the Bank group from Spring 2014 to Spring 2015 and worked on developing cleanroom fabrication processes for III-V optoelectronic devices. In Summer 2015, he interned at Samsung. He was hired in early 2016 as a Process Engineer at Intel.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/julio.jpg',
        },
    },

    {
        id: '11',
        name: 'Iram Olivares',
        bio: `Iram is an undergraduate Electrical Engineering student at the University of Texas. In Fall 2018, he studied studying the optical properties of III-V semiconductors supported by the Texas Research Experience program,.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/Iram.jpg',
        },
    },

    {
        id: '12',
        name: 'Alonzo Ramon',
        bio: `Alonzo is an undergraduate Computer Engineering student at the University of Texas at San Antonio. He is working on the fabrication of materials for 3D optoelectronic devices.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/ARamon.jpg',
        },
    },

    {
        id: '13',
        name: 'Sam Steakley',
        bio: `Sam is an undergraduate Physics student at Williams College in Williamstown, MA. He spent the summer with the LASE group as a NNCI REU studying the effects of doping on optical absorbtion in III-V mixed alloys.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/sams.jpg',
        },
    },

    {
        id: '14',
        name: 'Susan Tan',
        bio: `Susan was an ECE undergraduate at the University of Texas at Austin. From 2016-2018, she worked on test station design and component integration, and laser device characterization. She later worked on the analysis of magnetotransport data from thin bismuth films grown by MBE. After graduation, she began her Ph.D. studies at Princeton in Fall 2018.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/susant.jpg',
        },
    },

    {
        id: '15',
        name: 'Fernando Torres',
        bio: `Fernando is an undergraduate at the University of Texas at El Paso expecting to graduate with a BS in Electrical Engineering in May 2017. He was a Summer 2015 REU student through the NASCENT program researching membrane liftoff and transfer. He had an internship at Texas Instruments in Summer 2016.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/FernandoTorres.jpg',
        },
    },

    {
        id: '16',
        name: 'Nathaniel Wendt',
        bio: `Nate was an undergraduate at Gonzaga University and a 2012 NNIN REU student studying optimum annealing conditions of highly mismatched alloys in order to maximize optical quality as determined by photoluminescence. He is currently a graduate student at UT-Austin.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/NWendt.jpg',
        },
    },

    {
        id: '17',
        name: 'Evan Wineland',
        bio: `Evan was a undergraduate at Carnegie Mellon University who spent Summer 2013 in the group working on software data collection development.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/EvanWineland.jpg',
        },
    },

    {
        id: '18',
        name: 'Ben Xiang',
        bio: `Ben is currently employed at Cisco. He was an undergraduate researcher in Summer 2008, where he co-developed the group's photoreflectance measurement setup.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/IMG_6715.jpg',
        },
    },

    {
        id: '19',
        name: 'Alice Yau',
        bio: 'Alice is an ECE undergraduate at the University of Texas at Austin. In 2017, she studied the effect of growth conditions on electrical properties in epitaxial bismuth thin films.',
        image: {
            uri: 'https://lase.mer.utexas.edu/images/alice.jpg',
        },
    },

    {
        id: '20',
        name: 'Sagi Zisman',
        bio: `Sagi was an undergraduate researcher building an automated electroluminescence test setup. He is currently a graduate student at UT-Austin, working with Prof. Mark Raizen in Physics.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/SagiPicture.jpg',
        },
    },
]
const YoungScholars = [
    {
        id: '0',
        name: 'Enid Cruz',
        bio: `Enid is a high school student in Manor, TX. She worked as a NASCENT Young Scholar during Summer 2019. She focused on measuring the effects of strain in thin GaInAsSb films on flexible substrates. .`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/ECruz.png',
        },
    },

    {
        id: '1',
        name: `E'Maurai Glass`,
        bio: `E'Maurai is a high school student in Austin, TX. He worked on wafer bonding of nanomembranes using indium through the NASCENT Young Scholars program during Summer 2017.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/glass.jpg',
        },
    },

    {
        id: '2',
        name: 'Jocelyn Kim',
        bio: `Jocelyn is a high school student in Austin, TX. She worked on further developing an indium bonding process in nanomembrane preparation during the Summer of 2017 as a part of the NASCENT Young Scholars program.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/jocelyn.jpg',
        },
    },

    {
        id: '3',
        name: 'Claire Lungwitz',
        bio: `Claire is a high school student in Austin, TX. She spent Summer 2016 working with the LASE group as a NASCENT Young Scholar working on citric acid etching of III-V semiconductors.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/clairel.jpg',
        },
    },

    {
        id: '4',
        name: 'Clarence Marshall',
        bio: `Clarence is a high school student in Manor, TX, in his second year with the Nascent Young Scholars program. In Summer 2016 he investigated citric acid etch rates for III-V semiconductor substrates.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/clarencem.jpg',
        },
    },

    {
        id: '5',
        name: 'Daniela Rodriguez',
        bio: `Daniela is a high school student in Manor, TX, in her second year with the Nascent Young Scholars program. She worked on etching of III-V semiconductor substrates using citric acid during Summer 2016.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/danielar.jpg',
        },
    },

    {
        id: '6',
        name: 'Guillermo Rodriguez',
        bio: `Guillermo is a high school student in Manor, Tx, in his second year with the Nascent Young Scholars Program. In the Summer of 2019 he focused efforts towards the one dimensional strain of thin films on flexible substrates.`,
        image: {
            uri: 'https://lase.mer.utexas.edu/images/GRodriguez.jpg',
        },
    },
]

export default function Members(props) {
    const { dark } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    return (
        <ScrollView style={[styles.componentBackground, {paddingHorizontal: 5}]}>
            <View
                style={{ justifyContent: 'center', alignItems: 'center',}}>
                <Image style={{width: GetDimension(600, 400, true), height: GetDimension(600, 400, false)}} source={membersImage}/>
            </View>
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblPrimaryHeading}>Principal Investigator</Text>
            </View>
            <View style={{marginBottom: 10}}>
                <View style={[styles.imageTextContainer, {paddingBottom: 5}]}>
                    <Image style={{height: 150, width: 100, marginRight: 10}} source={{uri: "https://lase.mer.utexas.edu/images/Seth_Bank_High.jpg"}}/>
                    <View style={{flex: 1}}>
                        <Text style={[styles.lblColorized, styles.infoHeader]}>Seth R. Bank</Text>
                        <Text style={[styles.lblColorized, styles.italics]}>Cullen Trust for Higher Education Endowed Professorship in Engineering #6</Text>
                        <Text style={[styles.lblColorized, styles.infoHeader]}>Email: <Text style={styles.link} onPress={LinkOpener("mailto:sbank@ece.utexas.edu")}>sbank_at_ece.utexas.edu</Text></Text>
                        <Text style={[styles.lblColorized, styles.infoHeader]}>Phone: <Text style={styles.info}>(512) 471-9669</Text></Text>
                        <Text style={[styles.lblColorized, styles.infoHeader]}>CV: <Text style={styles.link} onPress={LinkOpener("https://lase.mer.utexas.edu/documents/SRB_CV.pdf")}>SRB_CV.pdf</Text></Text>
                        <Text style={[styles.lblColorized, styles.infoHeader]}>Scholar: <Text style={styles.link} onPress={LinkOpener("http://scholar.google.com/citations?user=Ey4P2ywAAAAJ")}>Profile</Text></Text>
                    </View>
                </View>
                <Text style={[styles.lblColorized, styles.bio, {marginHorizontal: 10}]}>
                    <Text>{"\tSeth Bank received the B.S. degree from the University of Illinois at Urbana-Champaign in 1999 and the M.S. and Ph.D. degrees in 2003 and 2006 from Stanford University, all in electrical engineering. In 2006, he was a post-doctoral scholar at the University of California at Santa Barbara. He joined the faculty of the University of Texas at Austin in 2007, where he is currently a full professor and holder of Cullen Trust for Higher Education Endowed Professorship in Engineering #6.\n"}</Text>
                    <Text>{"His current research interests are centered on the growth of analog/digital alloy semiconductors (e.g. AlInAsSb) and metal/semiconductor hetero- and nano-structures (e.g. ErAs nanoparticles in GaAs) and their application to plasmonics, silicon-based lasers, avalanche photodiodes, mid-IR lasers, sensors, THz generation and sensing, and high-speed transistors. He has coauthored >350 papers and presentations that have been cited >4500 times, with a Hirsch-Index of 36.\n"}</Text>
                    <Text>{"\tHis group has received 5 Best Paper Awards and he has received the 2008 Young Investigator Award at the North American MBE Conference (NAMBE), a 2008 Young Faculty Award from DARPA, the 2009 Young Scientist Award from the International Symposium on Compound Semiconductors (ISCS), a Presidential Early Career Award for Scientists and Engineers (PECASE) in 2009 (nominated by ARO), an AFOSR Young Investigator Program (YIP) Award in 2009, an ONR Young Investigator Program (YIP) Award in 2010, a Faculty Early Career Development (CAREER) Program Award from the NSF in 2010, as well as the 2019 Gordon T. Lepley IV Memorial Teaching Award from UT.\n"}</Text>
                    <Text>{"\tHe has been the Program Chair of the AVS North American MBE meeting (NAMBE), as well as a Program and General Chair for the IEEE/OSA Conference on Lasers and Electro-Optical (CLEO) and the IEEE Device Research Conference (DRC). He is currently a Board Member of IEEE DRC and was a Steering Committee member of OSA/IEEE CLEO; he is an active member of the Electronic Materials Conference (EMC) committee and has helped organize other conferences, including the IEEE Electron Device Meeting (IEDM), InP and Related Materials (IPRM), and the IEEE Photonics Society Annual Meeting (IPC).\n"}</Text>
                </Text>
            </View>
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Graduate Students</Text>
            </View>
            {
            //renders the array of grad students in a readable layout
            GradStudents.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.lblColorized, styles.infoHeader]}>{item.name}</Text>
                            <Text style={styles.lblColorized}>
                                <Text style={styles.infoHeader}>Email: </Text>
                                <Text style={styles.link} onPress={LinkOpener(item.emaillink)}>{item.email}</Text>
                            </Text>
                            <Text style={styles.lblColorized}>
                                <Text style={styles.infoHeader}>Phone: </Text>
                                <Text style={styles.info}>{item.phone}</Text>
                            </Text>
                            <Text style={[styles.lblColorized, styles.bio]}>{item.education}</Text>
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
            ))
            }
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Undergraduate Students</Text>
            </View>
            {
            //renders the array of undergrad students in a readable layout
            UndergradStudents.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.lblColorized, styles.infoHeader]}>{item.name}</Text>
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
            ))
            }
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Staff</Text>
            </View>
            {
            //renders the array of staff in a readable layout
            Staff.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.lblColorized, styles.infoHeader]}>{item.name}</Text>
                            {item.email ? (
                                <Text style={styles.lblColorized}>
                                    <Text style={styles.infoHeader}>Email: </Text>
                                    <Text style={styles.link} onPress={LinkOpener(item.emaillink)}>{item.email}</Text>
                                </Text>) : (<View/>)}
                            {item.phone ? (
                                <Text style={styles.lblColorized}>
                                    <Text style={styles.infoHeader}>Phone: </Text>
                                    <Text style={styles.info}>{item.phone}</Text>
                                </Text>) : (<View/>)}
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
            ))
            }
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Alumni (Ph.D.'s and Postdocs)</Text>
            </View>
            {
            //renders the array of alumni postdocs staff in a readable layout
            Postdocs.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={styles.infoHeader}>{item.name}</Text>
                            {item.email ? (
                                <Text style={styles.lblColorized}>
                                    <Text style={styles.infoHeader}>Email: </Text>
                                    <Text style={styles.link} onPress={LinkOpener(item.emaillink)}>{item.email}</Text>
                                </Text>) : (<View/>)}
                            {item.phone ? (
                                <Text style={styles.lblColorized}>
                                    <Text style={styles.infoHeader}>Phone: </Text>
                                    <Text style={styles.info}>{item.phone}</Text>
                                </Text>) : (<View/>)}
                            {item.cv ? (
                                <Text style={styles.lblColorized}>
                                    <Text style={styles.infoHeader}>CV: </Text>
                                    <Text style={styles.link} onPress={LinkOpener(item.cvlink)}>{item.cv}</Text>
                                </Text>) : (<View/>)}
                            {item.website ? (
                                <Text style={styles.lblColorized}>
                                    <Text style={styles.infoHeader}>Website: </Text>
                                    <Text style={styles.link} onPress={LinkOpener(item.website)}>{item.website}</Text>
                                </Text>) : (<View/>)}
                            {item.publications ? (
                                <Text style={styles.lblColorized}>
                                    <Text style={styles.infoHeader}>Publications: </Text>
                                    <Text style={styles.link} onPress={LinkOpener(item.publicationslink)}>{item.publications}</Text>
                                </Text>) : (<View/>)}
                            <Text style={[styles.lblColorized, styles.bio]}>{item.education}</Text>
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
                ))
            }
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Alumni (Master's)</Text>
            </View>
            {
            //renders the array of alumni masters staff in a readable layout
            Masters.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.lblColorized, styles.infoHeader]}>{item.name}</Text>
                            {
                            item.education ? (<Text style={styles.bio}>{item.education}</Text>) : (<View/>)
                            }
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
                ))
            }
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Alumni (Teacher Researchers)</Text>
            </View>
            {
            //renders the array of alumni teacher researchers staff in a readable layout
            TeacherResearchers.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.lblColorized, styles.infoHeader]}>{item.name}</Text>
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
                ))
            }
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Alumni (Undergraduate Researchers)</Text>
            </View>
            {
            //renders the array of alumni undergraduate researchers staff in a readable layout
            UndergradResearchers.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.lblColorized, styles.infoHeader]}>{item.name}</Text>
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
                ))
            }
            <View style={styles.sectionBreak}/>
            <View>
                <Text style={styles.lblSecondaryHeading}>Alumni (Young Scholars)</Text>
            </View>
            {
            //renders the array of alumni young scholars staff in a readable layout
            YoungScholars.map(item => (
                <View key={item.id}>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.image} source={item.image}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.lblColorized, styles.infoHeader]}>{item.name}</Text>
                            <Text style={[styles.lblColorized, styles.bio]}>{item.bio}</Text>
                        </View>
                    </View>
                </View>
                ))
            }
            <Footer />
        </ScrollView>
    );
}

const LocalStyles = {
    imageTextContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    textContainer: {
        flex: 1,
    },
    sectionHeader:{
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 20,
        paddingTop: 20,
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
        flexShrink: 1,
        textAlign: 'left',
    },
    image: {
        marginLeft: 8,
        marginRight: 12,
        width: 100,
        height: 150,
    },
};
