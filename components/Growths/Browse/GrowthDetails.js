import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Col } from 'react-native-table-component';

const fetch = require("node-fetch");


export default function GrowthDetails(props) {
    let growth = props.route.params.growth;
    let sampleID = props.route.params.sampleID;
    const tableTitle = ["id", "SampleID", "Grower", "Machine","Date", "HolderID","GrowthNum","Substrate", "SubstrateSize",
      "GaTip", "GaBase", "GaFlux", "InTip","InBase", "InFlux", "AlBase", "AlFlux", "Er", "ErFlux", "Si",
      "Be","GaTe","AsSub","AsCrk","AsValve","AsFlux","SbSub","SbCrk","SbValve","SbFlux","NRF","ReflectedRF","NFlow","ForlinePressure","PyroDeox","TCDeox",
      "PyroGrowth","TCGrowth","GCPressure","BFBackground","HVP","PyroOffset","Description","Ga_Tip","Ga_Base","Ga_Flux","In_Tip",
      "In_Base","In_Flux","Al_Base", "Al_Flux","La_Temp","La_Flux","Lu_Temp","Lu_Flux","As_Sub","As_Crk","Chamber_Background","BF_Background",
      "Bi_Temp","Bi_Flux","Bi_Tip","Bi_Base","Gd_Temp","Gd_Flux", "B_Temp","B_Flux","waferTracked", "GaP_Temp", "GaP_Flux"];

      const tableData = [[growth.id], [sampleID], [growth.grower], [growth.machine],[growth.date], [growth.holderID],[growth.growthNum],[growth.substrate], [growth.substrateSize],
        [growth.GaTip], [growth.GaBase], [growth.GaFlux], [growth.InTip], [growth.InBase], [growth.InFlux], [growth.AlBase], [growth.AlFlux], [growth.Er], [growth.ErFlux], [growth.Si],
        [growth.Be],[growth.GaTe],[growth.AsSub],[growth.AsCrk],[growth.AsValve],[growth.AsFlux],[growth.SbSub],[growth.SbCrk],[growth.SbValve],[growth.SbFlux],[growth.NRF],[growth.ReflectedRF],[growth.NFlow],[growth.ForlinePressure],[growth.PyroDeox],[growth.TCDeox],
        [growth.PyroGrowth],[growth.TCGrowth],[growth.GCPressure],[growth.BFBackground],[growth.HVP],[growth.PyroOffset],[growth.Description],[growth.Ga_Tip],[growth.Ga_Base],[growth.Ga_Flux],[growth.In_Tip],
        [growth.In_Base],[growth.In_Flux],[growth.Al_Base], [growth.Al_Flux],[growth.La_Temp],[growth.La_Flux],[growth.Lu_Temp],[growth.Lu_Flux],[growth.As_Sub],[growth.As_Crk],[growth.Chamber_Background],[growth.BF_Background],
        [growth.Bi_Temp],[growth.Bi_Flux],[growth.Bi_Tip],[growth.Bi_Base],[growth.Gd_Temp],[growth.Gd_Flux], [growth.B_Temp],[growth.B_Flux], [growth.waferTracked], [growth.GaP_Temp], [growth.GaP_Flux]];

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={{paddingBottom: 20}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Details for growth {growth.id}:</Text>
            </View>
            <TableWrapper style={styles.wrapper}>
                <Table borderStyle={{borderWidth: 1}}>
                    <Col data={tableTitle}/>
                </Table>
                <Table borderStyle={{borderWidth: 1}}>
                <Col data={tableData}/>
                </Table>
            </TableWrapper>
        </View>
        </ScrollView>


    )
}

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 30,
    },
    wrapper: { flexDirection: 'row', },

})
