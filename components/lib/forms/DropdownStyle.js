import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/globalStyle';

// Styles copied from the react-native-picker-select sample snack, with some modifications
// https://snack.expo.io/@lfkwtz/react-native-picker-select
const DropdownLight = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: Colors.neutral1,
        borderRadius: 4,
        color: Colors.text,
        paddingRight: 30,
        backgroundColor: Colors.base,
    },
    inputAndroid: { // Covers Android & Web platforms
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderWidth: 2,
        borderColor: Colors.neutral1,
        borderRadius: 8,
        color: Colors.text,
        paddingRight: 30,
        backgroundColor: Colors.base,
    },
});

const DropdownDark = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: Colors.neutral1,
        borderRadius: 4,
        color: Colors.textDark,
        paddingRight: 30,
        backgroundColor: Colors.baseDark,
    },
    inputAndroid: { // Covers Android & Web platforms
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderWidth: 2,
        borderColor: Colors.neutral1,
        borderRadius: 8,
        color: Colors.textDark,
        paddingRight: 30,
        backgroundColor: Colors.baseDark,
    },
});


export {
    DropdownLight,
    DropdownDark
}
