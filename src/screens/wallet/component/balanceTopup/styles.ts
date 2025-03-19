import { StyleSheet } from "react-native";
import { appColors, fontSizes, appFonts, windowHeight, windowWidth } from '@src/themes'; 

const styles = StyleSheet.create({
    mainBalance: {
        marginTop: windowHeight(16),
        borderRadius: windowHeight(9.3),
        overflow: 'hidden',
        marginHorizontal: windowWidth(20)
    },
    walletImage: {
        height: windowHeight(60),
        width: '100%',
        borderRadius: windowHeight(9.3),
        resizeMode: 'stretch'
    },
    subBalance: {
        position: 'absolute',
        height: windowHeight(40),
        width: '100%',
        justifyContent: 'space-between',
    },
    balanceView: {
        borderRadius: windowHeight(9.3),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight(18),
        marginHorizontal: windowWidth(20),
    },
    balanceTitle: {
        color: appColors.whiteColor,
        fontSize: fontSizes.FONT18,
        marginBottom: windowHeight(0.5),
        fontFamily:appFonts.regular
    },
    totalBalance: {
        fontSize: fontSizes.FONT20,
        color: appColors.whiteColor,
        fontFamily: appFonts.bold,
    },
    topupBtn: {
        height: windowHeight(30),
        width: windowWidth(150),
        backgroundColor: appColors.whiteColor,
        borderRadius: windowHeight(5),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: windowHeight(15),
        marginHorizontal: windowWidth(20)
    },
    topupTitle: {
        color: appColors.buttonBg,
        fontFamily: appFonts.medium
    },
    dashLine: {
        borderBottomWidth: windowHeight(0.9),
        borderStyle: 'dashed',
        borderColor: appColors.darkBorder,
        marginHorizontal: windowWidth(20),
        marginTop: windowHeight(15)
    },
})
export default styles