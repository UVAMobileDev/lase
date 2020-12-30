// A collection of tiny, repeatedly used, helper functions.
import { Platform, Linking, Dimensions } from 'react-native';

export const onWeb = Platform.OS === "web";
const w = Dimensions.get('window').width;

export function LinkOpener(url) {
    if(onWeb) return () => window.open(url, "_blank");
    return () => Linking.openURL(url);
}

// Scales images based on the screen's width.
export function GetDimension(width, height, getWidth) {
    if(getWidth) {
        return width > w ? w : width;
    } else {
        return width > w ? (w / width) * height : height;
    }
}
