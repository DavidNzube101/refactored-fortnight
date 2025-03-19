import { StyleSheet } from "react-native";
import { windowHeight } from "@src/themes";

const styles = StyleSheet.create({
    NoInternetView: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    titleContainer: { marginTop: windowHeight(-10) },
    couponsList: { marginVertical: windowHeight(5) },

})
export default styles;