import { windowHeight } from "@src/themes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    markerImage: {
        height: windowHeight(57),
        width: windowHeight(57),
        resizeMode: 'contain',
    },
})
export default styles;