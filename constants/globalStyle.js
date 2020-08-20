import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
const onWeb = Platform.OS === "web";

const Colors = {
    base: "#fcfcfc",
    baseDark: "#2F3061",
    contrast: "#333333",
    contrastDark: "#2e4860",
    highlight: "#ff8f26",
    highlightDark: "#589e83"
}

const LightStyles = {

    mainBackground: {
        flex: 1,
        backgroundColor: Colors.base,
    },
    screenContainer: {
        flex: 1,
        paddingTop: onWeb ? 0 : Constants.statusBarHeight,
        backgroundColor: Colors.contrast,
    },
};

const DarkStyles = {

    mainBackground: {
        flex: 1,
        backgroundColor: Colors.baseDark,
    },
    screenContainer: {
        flex: 1,
        paddingTop: onWeb ? 0 : Constants.statusBarHeight,
        backgroundColor: Colors.contrastDark,
    },
};

export {
    LightStyles,
    DarkStyles,
    Colors
};
