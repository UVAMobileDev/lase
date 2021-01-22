import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
const onWeb = Platform.OS === "web";

const Colors = {
    base: "#fcfcfc",
    baseDark: "#232323",
    text: "#000000",
    textDark: "#eaeaea",
    contrast: "#2F3061",
    contrastDark: "#ff2629",
    highlight: "#589e83",
    highlightDark: "#ff8f26",
    good: "",
    caution: "",
    bad: "",
    neutral1: "#999999",
    neutral2: "",

}

// Colors.reduce((acc, key, i) => ({...acc, [key]: Date.now() + i}), {})
// const Placeholder = {
//
// }


const ShapeStyles = {
    // CONSTRUCTION ELEMENTS
    screenContainer: { // For full screen components, this should be applied to the top level view to place the proper margin on top
        flex: 1,
        paddingTop: onWeb ? 0 : Constants.statusBarHeight,
    },
    componentBackground: { // For direct children of full screen components, apply this style to the top level view to fill the viewport
        flex: 1,
    },
    horiztonalItemWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    sectionBreak: {
        width: "92%",
        alignSelf: "center",
        marginVertical: 10,
        borderBottomWidth: 2,
    },

    // FORM INPUT ELEMENTS
    txt: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: Colors.neutral1,
        height: 40,
    },
    lblFormLabel: {
        marginRight: 10,
    },

    // TEXT ELEMENTS
    lblPrimaryHeading: {
        fontSize: 20,
    },
    lblSecondaryHeading: {
        fontSize: 17,
    },
    lblTertiaryHeading: {
        fontSize: 15,
    },
    lblColorized: { // If you want to have color adaptive text that doesn't get conformed to any standard size

    },

    // TEXT FORMATTING
    bold: {
        fontWeight: "bold",
    },
    italics: {
        fontStyle: "italic",
    },
    underline: {
        textDecorationLine: "underline",
    },
    mono: {

    },
    link: {
        color: "#c60",
        textDecorationLine: "underline",
    },
    mini: {
        fontSize: 10,
    }

}

const Lights = {
    // CONTRUCTION ELEMENTS
    componentBackground: {
        backgroundColor: Colors.base,
    },
    screenContainer: {
        backgroundColor: Colors.highlight,
    },
    sectionBreak: {
        borderColor: Colors.contrast,
    },

    // FORM INPUT ELEMENTS
    txt: {
        color: Colors.text
    },
    lblFormLabel: {
        color: Colors.contrast,
    },

    // TEXT ELEMENTS
    lblPrimaryHeading: {
        color: Colors.contrast,
    },
    lblSecondaryHeading: {
        color: Colors.text,
    },
    lblTertiaryHeading: {
        color: Colors.text,
    },
    lblColorized: {
        color: Colors.text,
    },
};

const Darks = {
    componentBackground: {
        backgroundColor: Colors.baseDark,
    },
    screenContainer: {
        backgroundColor: Colors.highlightDark,
    },
    sectionBreak: {
        borderColor: "#ffffff",
    },

    // FORM INPUT ELEMENTS
    txt: {
        color: Colors.textDark,
    },
    lblFormLabel: {
        color: Colors.contrastDark,
    },

    // TEXT ELEMENTS
    lblPrimaryHeading: {
        color: Colors.contrastDark,
    },
    lblSecondaryHeading: {
        color: Colors.textDark,
    },
    lblTertiaryHeading: {
        color: Colors.textDark,
    },
    lblColorized: {
        color: Colors.textDark,
    },
};

function consolidate(colorStyles, shapeStyles) {
    return Object.keys(colorStyles)
            .reduce((acc, key) =>
                shapeStyles[key] ? {
                    ...acc,
                    [key]: {
                        ...colorStyles[key],
                        ...shapeStyles[key]
                    }
                } : {
                    ...acc,
                    [key]: colorStyles[key]
                }, 0);
}

const LightStyles = consolidate(ShapeStyles, Lights);
const DarkStyles = consolidate(ShapeStyles, Darks);
export {
    LightStyles,
    DarkStyles,
    Colors
};
