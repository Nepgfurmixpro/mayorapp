import { Linking } from "react-native";
import { Platform } from "react-native";

function openMapsApp(lat: number, long: number, label: string) {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${long}`;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url!)
}

export {
    openMapsApp
}