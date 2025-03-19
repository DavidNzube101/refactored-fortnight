import { StyleSheet } from "react-native";
import { appFonts, windowHeight } from "@src/themes";

const styles = StyleSheet.create({
    countryCodeContainer: { marginTop: windowHeight(17) },
    btn: {
        top: windowHeight(25),
        marginBottom: windowHeight(48),
    },
    confirmPasswordView: { bottom: windowHeight(6.9) },
    passwordView: { bottom: windowHeight(5.3) },
    referralIdView: { bottom: windowHeight(3) },
    emailView: { bottom: windowHeight(1) },
    numberTitle: {
        top: windowHeight(14.3), fontFamily: appFonts.medium,
    },
})
export default styles;