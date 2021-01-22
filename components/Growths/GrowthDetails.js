import React, { useState, useEffect, useContext, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Table, TableWrapper, Col, Rows } from 'react-native-table-component';
const fetch = require("node-fetch");
import { BASE_URL } from '../../constants/API';
import { LightStyles, DarkStyles, Colors } from '../../constants/globalStyle';
import KeyContext from '../../KeyContext';
import { AntDesign } from '@expo/vector-icons';

const tableLabels = ["id", "SampleID", "grower", "machine","date", "holderID","growthNum","substrate", "substrateSize",
    "GaTip", "GaBase", "GaFlux", "InTip","InBase", "InFlux", "AlBase", "AlFlux", "Er", "ErFlux", "Si",
    "Be","GaTe","AsSub","AsCrk","AsValve","AsFlux","SbSub","SbCrk","SbValve","SbFlux","NRF","ReflectedRF","NFlow","ForlinePressure","PyroDeox","TCDeox",
    "PyroGrowth","TCGrowth","GCPressure","BFBackground","HVP","PyroOffset","Description","Ga_Tip","Ga_Base","Ga_Flux","In_Tip",
    "In_Base","In_Flux","Al_Base", "Al_Flux","La_Temp","La_Flux","Lu_Temp","Lu_Flux","As_Sub","As_Crk","Chamber_Background","BF_Background",
    "Bi_Temp","Bi_Flux","Bi_Tip","Bi_Base","Gd_Temp","Gd_Flux", "B_Temp","B_Flux","waferTracked", "GaP_Temp", "GaP_Flux"];

const materialLabels = ["id", "mat_name", "mat_description", "GrowthNum", "Name", "GaTe_temp",
    "AsFlux", "SubstrateTemp", "NShutter", "NPower", "As_flux", "ReflectedRF", "SampleID", "AsShutter",
    "SbValve", "SubstrateTC", "mat_Rot", "GaTeShutter", "SiTemp", "AsValve", "GaShutter", "mat_TC",
    "ErShutter", "Si_temp", "BeShutter", "SbShutter", "Description", "BeTemp", "InShutter", "GaTeTemp",
    "As_valve", "SiShutter", "ForlinePressure", "Be_temp", "mat_pyro", "NFlow", "SbFlux", "AlShutter",
    "NOptical"];

function Layer({layerData}) {
    const { dark, key } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(
            materialLabels.filter(label => layerData[label] ? true : false)
            .map(label => [label, layerData[label]])
        );
    }, []);

    if(!data) return (<View />);
    return (
        <View style={{marginVertical: 5}}>
            <View>
                <Text style={styles.layerTitle}>{layerData.mat_name} - {layerData.mat_description}</Text>
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    >
                    {expanded ? (
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <AntDesign name="caretup" size={20} color="black" />
                            <Text> Hide details</Text>
                        </View>
                    ) : (
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <AntDesign name="caretdown" size={20} color="black" />
                            <Text> Show details</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            {expanded ?
                (<Table
                    style={{margin: 5}}
                    borderStyle={{borderWidth: 1}}>
                    <Rows data={data} />
                </Table>) : (<View />)
            }
        </View>
    );
}

export default function GrowthDetails(props) {
    const { dark, key } = useContext(KeyContext);
    const [styles, updateStyles] = useReducer(() => StyleSheet.create({...(dark ? DarkStyles : LightStyles), ...LocalStyles}), {});
    useEffect(updateStyles, [dark]);

    const [growth, setGrowth] = useState(null);
    const [labels, setLabels] = useState(null);
    const [tableData, setTableData] = useState(null);
    useEffect(() => {
        let grw = props.route.params.growth;
        grw.SampleID = props.route.params.sampleID;
        let mapping = tableLabels.map(label => grw[label]);
        setTableData(
            tableLabels
            .filter(label => grw[label] ? true : false)
            .map(label => [label, grw[label]])
        );

        setLabels(tableLabels.filter((_, i) => mapping[i] ? true : false));
        setGrowth(mapping.filter(entry => entry ? true : false).map(entry => [entry]));
    }, []);

    const [layers, setLayers] = useState({loaded: false, data: []});
    useEffect(() => {
        async function get() {
            let { statusCode, materials } = await fetch(`${BASE_URL}/machine/${props.route.params.growth.machine}/materials/${props.route.params.sampleID}`, {
                headers: {"x-api-key": key}
            }).then(r => r.json());
            if(statusCode != 200) setLayers({loaded: true, data: []});
            else {
                materials = materials.filter(({GrowthNum}) => GrowthNum === props.route.params.growth.growthNum);
                setLayers({loaded: true, data: materials});
            }
        }
        get();
    }, [props.route.params.growth, props.route.params.sampleID]);

    if(!tableData) return (<View/>);
    return (
        <View style={[styles.componentBackground, {padding: 3, height: "100%"}]}>
            <ScrollView>
                <View style={{width: Platform.OS === "web" ? "50%" : "95%", alignSelf: "center"}}>
                    <Table
                        style={styles.titleTable}>
                        <Rows
                            textStyle={[styles.lblColorized, {fontSize: 16, marginBottom: 4}]}
                            data={[
                                ["Description", props.route.params.growth.Description],
                                ["Grower", props.route.params.growth.grower],
                            ]}
                            />
                    </Table>
                </View>

                <View style={{paddingBottom: 20}}>
                    <Text style={[styles.lblSecondaryHeading, styles.bold]}>All data for growth {props.route.params.sampleID}-{growth[0][0]}:</Text>
                </View>

                <TableWrapper style={{padding: 5}}>
                    <Table
                        borderStyle={{borderWidth: 1, borderColor: dark ? "#fff" : "#000"}}>
                        <Rows
                            textStyle={styles.lblColorized}
                            style={{paddingHorizontal: 2}}
                            data={tableData} />
                    </Table>
                </TableWrapper>

                <View style={styles.sectionBreak} />
                {layers.loaded && layers.data.length > 0 ? (
                    <View>
                        <Text style={[styles.lblColorized, styles.layerLabel]}>Found {layers.data.length} layer{layers.data.length === 1 ? "" : "s"} associated with this growth.</Text>
                        {layers.data.map((layerData, i) => (
                            <Layer
                                key={i}
                                layerData={layerData} />))}
                    </View>
                ) : layers.loaded && layers.data.length === 0 ? (
                    <View>
                        <Text style={[styles.lblColorized, styles.bold, styles.layerLabel]}>This growth has no layers associated with it.</Text>
                    </View>
                ) : (
                    <View>
                        <ActivityIndicator />
                    </View>
                )}
                <View style={{height: 45}} />
            </ScrollView>
        </View>
    );
}

// StyleSheet
const LocalStyles = {
    titleTable: {
        marginBottom: 15,
    },
    layerTitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    layerLabel: {
        fontSize: 16,
        textDecorationLine: "underline",
        alignSelf: "center",
        marginBottom: 10,
    },
    divider: {
        height: 1,
        borderColor: "#000",
        borderWidth: 1,
        width: "95%",
        marginVertical: 10,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 5,
    },
}
