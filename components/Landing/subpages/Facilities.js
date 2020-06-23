import React from 'react';
import { View, Text, StyleSheet, Image,Linking,Platform,Dimensions} from 'react-native';

function superScript(base,power) {
  return (
    <View style = {{flexDirection: 'row'}}>
      <Text style = {{fontSize: 14}}>{base}</Text>
      <Text style = {{fontSize: 7}}>{power}</Text>
    </View>
  );


}
export default function Facilities(props) {

    let currentDate = new Date();
    let displayDate =  parseInt(currentDate.getMonth()+1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
    let displayDateSring = displayDate.toString();
    return (
        <View>
          <View style = {styles.toCenter}>
            <Text style = {styles.textType}>
              <Text style = {styles.textColor}>
                  <Text style = {styles.titleText}> Facilities </Text>
               </Text>
            </Text>
            <Image
              style = {styles.facilitiesPic}
              source = {{uri: 'https://lase.mer.utexas.edu/images/facilities_large.jpg' }}
            />
            <Text> {"\n"} </Text>
          </View>

            <Text
            style = {styles.sectionText}>{'\t'}“Bravo” Varian Gen II MBE (Status: Operational)
            </Text>

              <Text> {'\t'}{'\t'}{'\u2022'} History: Donation from Bell Labs, installed 1994 and refurbished 2007</Text>
              <Text> {'\t'}{'\t'}{'\u2022'} Materials:</Text>

                <Text>
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Er – Veeco 10CC high temperature source{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Ga – Veeco 400g SUMO cell{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} In – Veeco 900g SUMO cell{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Al – Veeco 200g SUMO cell{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} N – SVTA rf plasma source (Status: not installed){'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} As – Veeco 500CC valved-cracker{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Sb – Veeco 200CC valved-cracker{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Bi – Veeco 250g downward-looking SUMO cell{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Si/Be – MBE Komponenten custom dual dopant source (Si filament and Be effusion){'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} GaTe – MBE Komponenten tilted crucible dopant source{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Si – MBE Komponenten filament source{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Be – MBE Komponenten tilted crucible dopant source{'\n'}
                </Text>

              <Text> {'\t'}{'\t'}{'\u2022'} Ancillary Equipment:</Text>
                <Text>
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} kSA multibeam optical stress (MOS) system{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} kSA BandiT bandedge/blackbody temperature measurement{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Staib 15 keV RHEED system{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} kSA RHEED analysis{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Stanford Research Systems RGA 300{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Veeco externally adjustable group-III shutters{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Riber (formerly MBE Control) AMBER growth software{'\n'}
                  {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Veeco 3” substrate manipulator{'\n'}
                </Text>

          <Text
            style = {styles.sectionText}>{'\t'}“Echo” EPI MOD Gen II MBE (Status: Operational)
          </Text>

            <Text> {'\t'}{'\t'}{'\u2022'} History: Purchased in 1995 by NIST, donated to LASE in 2008, refurbished in 2009</Text>
            <Text> {'\t'}{'\t'}{'\u2022'} Materials:</Text>
              <Text>
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} B - MBE Komponenten EBVV vertical e-beam evaporator{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Ga – Veeco 400g SUMO cell{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} In – Veeco 400g SUMO cell{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} P – E-SCIENCE valved GaP decomposition source{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} As – Veeco 500CC valved-cracker{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Bi – Veeco 250g downward-looking SUMO cell{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Si/Be – Veeco dual dopant source{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} GaTe/Er - Veeco dual dopant source{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} La – Veeco 10CC high temperature source (Status: not installed){'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Lu – Veeco 10CC high temperature source (Status: not installed){'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} C – Veeco CBr4 with MBE Control custom injector (Status: not installed){'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Al – Veeco 200g SUMO cell (Status: not installed){'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Gd – Veeco 10CC high temperature source (Status: not installed){'\n'}
              </Text>

            <Text> {'\t'}{'\t'}{'\u2022'} Ancillary Equipment:</Text>
              <Text>
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} kSA BandiT bandedge/blackbody temperature measurement (under installation){'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} MBE Control EZ-RHEED analysis{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Stanford Research Systems RGA 200{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Veeco externally adjustable group-III shutters{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Riber (formerly MBE Control) AMBER growth software{'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Custom cryogen-free P-recovery system (Status: under installation){'\n'}
                {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Veeco 3” substrate manipulator{'\n'}
              </Text>
        <Text
          style = {styles.sectionText}>{'\t'}“Foxtrot” (a.k.a. “The Juice”) Varian Chamber (Status: Under installation)
        </Text>

          <Text> {'\t'}{'\t'}{'\u2022'} History: Donation from UT-Arlington in 2011</Text>
          <Text> {'\t'}{'\t'}{'\u2022'} Materials:</Text>
            <Text>
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Epitaxial plasmonic and emerging materials{'\n'}
            </Text>

          <Text> {'\t'}{'\t'}{'\u2022'} Ancillary Equipment:</Text>
            <Text>
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Thermionics 6-pocket e-beam evaporator{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Veeco dual dopant source{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} MBE Komponenten cooling water nipple and shutter{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Stanford Research Systems RGA 200{'\n'}
            </Text>

            {
              /*
              <Text   style={styles.link}
                      onPress={() => Linking.openURL("http://www.mrc.utexas.edu/")}>Microelectronics Research Center</Text>
              */
            }



        <Text
          style = {styles.sectionText}>{'\t'}Bakeout Structure ( <Text style = {styles.link} onPress= {() => Linking.openURL("https://lase.mer.utexas.edu/images/BOS_v2.jpg")}>BoS </Text>) (Status: Operational, v2.1)
        </Text>

          <Text> {'\t'}{'\t'}{'\u2022'} Outgassing MBE components prior to introducing them to the MBE system</Text>
          <Text> {'\t'}{'\t'}{'\u2022'} Equipment:</Text>
            <Text>
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} CTI CT10 cryo{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Stanford Research Systems RGA 200{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Four 8" arms for baking sources{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} One 10" arm for baking substrate manipulator{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Vertical group-III thermal deposition system (indium currently installed){'\n'}
            </Text>

        <Text
          style = {styles.sectionText}>{'\t'}Optical characterization setups
        </Text>
          <Text>
            {'\t'}{'\t'}{'\u2022'} Photoluminescence (PL): Measuring luminescence efficiency, emission wavelength, and so on{'\n'}
            {'\t'}{'\t'}{'\u2022'} near/mid-IR Reflection/Transmission (R&T): Measuring absorption and band-edge{'\n'}
            {'\t'}{'\t'}{'\u2022'} Pump/probe: Femtosecond carrier dynamics using mode-locked fiber laser{'\n'}
            {'\t'}{'\t'}{'\u2022'} Photoreflectance (PR): Measuring band alignments{'\n'}
          </Text>
          <Text> {'\t'}{'\t'}{'\u2022'} Ancillary Equipment:</Text>
            <Text> {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} LHe cryostat and controller{'\n'}</Text>


        <Text
          style = {styles.sectionText}>{'\t'}Fourier transform infrared spectrometer (FTIR) and IR microscope (<Text style = {styles.link} onPress= {() => Linking.openURL("https://lase.mer.utexas.edu/images/FTIR.jpg")}>Futur-er</Text>)
        </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} FTIR: Bruker Vertex v80
          </Text>
            <Text>
              {/*
                Need to do this
              */}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Vacuum FTIR with high resolution option (Δν {"<"} 0.06 {superScript("cm","-1")}){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Operating range: 5 - 25000 cm-1 (0.4 – 2000 μm){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Step scan{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Rapid scan{'\n'}
            </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} IR Microscope: Bruker Hyperion 2000
          </Text>
            <Text>
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Coupled to FTIR for spatial/spectral/temporal mapping{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Single point MCT detector w/automated stage for imaging{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} ZnSe A ttenuated Total Reflectance (ATR) objective (ZnSe){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Grazing Angle Objective (GAO){'\n'}
            </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} Accessories:
          </Text>
            <Text>
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Keysight B1500A semiconductor device analyzer (1x high-power, 2x high-resolution SMUs){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} MMR variable temperature micro miniature refrigerator w/controller (under installation){'\n'}
            </Text>



        <Text
          style = {styles.sectionText}>{'\t'}Edge-emitting laser (EEL) test setup
        </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} CW, pulsed, and temperature-dependant EEL characterization
          </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} Equipment:
          </Text>
            <Text>
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Vigo high-speed (ns) MCT detector (5μm cutoff){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Thorlabs InGaAs amplified detector (1.5μm cutoff){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Princeton Instruments Acton 2500 spectrometer{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Labsphere Infragold 2" integrating sphere with fiber port{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} ILX Laser drivers - pulsed (LDP-3840B), CW/temperature (LDC-3744){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} ILX temperature-controlled laser mount (LDM-4415){'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Neslab recirculating chiller{'\n'}
            </Text>

        <Text
          style = {styles.sectionText}>{'\t'}Photodetector / Photocurrent spectroscopy setup (visible-to-mid-IR)
        </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} Spectrally-resolved photocurrent/photovoltage response
          </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} Equipment:
          </Text>

            <Text>
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'}  Stanford research systems lock-in amplifier and chopper{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'}  Princeton Instruments Acton 2500 spectrometer{'\n'}
              {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'}  Various light sources{'\n'}
            </Text>

        <Text
          style = {styles.sectionText}>{'\t'}Probe station
        </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} I-V: Tunnel junctions characterization and process flow diagnostics (e.g. TLM)
          </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} Equipment:
          </Text>
            <Text>
            {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Micromanipulator 6200 probe station{'\n'}
            {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} Keysight B1500A semiconductor device analyzer (1x high-power, 2x high-resolution SMUs){'\n'}
            {'\t'}{'\t'}{'\t'}{'\t'}{'\u25E6'} HP 4145 semiconductor parameter analyzer{'\n'}
            </Text>


        <Text
          style = {styles.sectionText}>{'\t'}Simulations
        </Text>
          <Text>
              {'\t'}{'\t'}{'\u2022'} VASP (TACC) - Density Functional Theory (DFT){'\n'}
              {'\t'}{'\t'}{'\u2022'} nextnano (Windows) - k.p, wavefunction solver, electrostatics, etc.{'\n'}
              {'\t'}{'\t'}{'\u2022'} RCWA (Windows) - Rigorous coupled-wave analysis; tool developed by <Text style = {styles.link} onPress= {() => Linking.openURL("http://faculty.uml.edu/vpodolskiy/codes/index.html")}>Podolskiy Group, UML</Text>{'\n'}
              {'\t'}{'\t'}{'\u2022'} COMSOL (Windows) - Finite element method (FEM){'\n'}
              {'\t'}{'\t'}{'\u2022'} Lumerical (Windows) - Finite-difference time-domain (FDTD) and FEM{'\n'}
              {'\t'}{'\t'}{'\u2022'} MEEP (Unix) - FDTD{'\n'}
              {'\t'}{'\t'}{'\u2022'} Monte Carlo (Unix) - APD simulations, including noise; tool developed by <Text style = {styles.link} onPress= {() => Linking.openURL("http://www.ece.virginia.edu/pdg/index.html")}>Campbell Group, UVA</Text>{'\n'}
              {'\t'}{'\t'}{'\u2022'} Band diagramming (Java and Python) - Poisson and Poisson-Schrodinger solvers, e.g. <Text style = {styles.link} onPress= {() => Linking.openURL("https://github.com/scott-maddox/openbandparams")}>OpenBandParams</Text>{'\n'}
            </Text>

        <Text
          style = {styles.sectionText}>{'\t'}Other equipment available through Microelectronics Research Center (NSF-NNCI)
        </Text>

          <Text>
            {'\t'}{'\t'}{'\u2022'} Processing: III-V and Si processing (litho, ICP/RIE dry etch, metallization, etc), wafer bonding, {'\n'}
            {'\t'}{'\t'}{'\u2022'} lapping/polishing, wire bonding, etc.{'\n'}
            {'\t'}{'\t'}{'\u2022'} Characterization: HR-XRD (rotating anode Rigaku SmartLab), AFM, TEM, Hall Effect, PPMS, C-V, etc.{'\n'}
          </Text>

        <Text
          style = {styles.sectionText}>{'\t'}Advanced energetics
        </Text>

          <Text>
            {'\t'}{'\t'}{'\u2022'} Espresso - Illy Francis Francis! Model X7.1 IperEspresso Machine{'\n'}
            {'\t'}{'\t'}{'\u2022'} Pourover (6 cup) - Chemex Classic Series{'\n'}
            {'\t'}{'\t'}{'\u2022'} French Press (20 oz.) - Bodum Chambord (all-metal construction){'\n'}
            {'\t'}{'\t'}{'\u2022'} Jura-Capresso Infinity (commercial-grade conical burr grinder){'\n'}
            {'\t'}{'\t'}{'\u2022'} Dairy - Nespresso Aerocinno Plus{'\n'}
            {'\n'}
          </Text>


        <Text style = {styles.sectionText}>
        {'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}  Last updated {displayDateSring}
        {'\n'}
        {'\n'}
        </Text>

          <View style = {{flex: 1, flexDirection: 'row',justifyContent:"space-between"}}>
            <Text>

              <Text style = {styles.smallText}> {'\t'} © 2012
                <Text style = {styles.contact} onPress= {() => Linking.openURL("http://www.ece.utexas.edu/")}> UT ECE </Text>
                <Text> | </Text>
                <Text style = {styles.contact} onPress= {() => Linking.openURL("https://www.engr.utexas.edu/")}> Cockrell School of Engineering </Text>
                <Text> | </Text>
                <Text style = {styles.contact} onPress= {() => Linking.openURL("https://www.utexas.edu/")}> The University of Texas at Austin {'\n'}</Text>
              </Text>


              <Text style = {styles.smallText}> {'\t'}
                <Text style = {styles.contact} onPress= {() => Linking.openURL("https://policies.utexas.edu/")}> Private Information </Text>
                <Text> | </Text>
                <Text style = {styles.contact} onPress= {() => Linking.openURL("http://www.ece.utexas.edu/")}> Resources for Accesibility </Text>
              </Text>


              <Text style = {styles.smallText}> {'\n'}{'\t'} Comments:
                <Text style = {styles.contact} onPress= {() => Linking.openURL("sbank_at_ece.utexas.edu")}> sbank_at_ece.utexas.edu </Text>
              </Text>

            </Text>
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
    paddingTop: 50,
  },
  toCenter: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  textType: {
    fontFamily: "Coching"
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
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  sectionText: {
    fontSize: 17,
    fontWeight: "bold"
  },
  subsectionText: {
    fontsize:16,
  },
  contact: {
    fontSize: 10,
    color: "#c60",
  },
  smallText:{
    fontSize: 10,
  },
  newStyle: {
    fontSize: 10,
  },
  link: {color: "#c60"},
  logo: {
    width: 200,
    height: 50,
    alignItems: 'flex-end',
  },
  viewLogo: {
    alignItems: 'flex-end',
  },

});
