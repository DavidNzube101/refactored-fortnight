import { StyleSheet } from 'react-native';
import { appColors } from '@src/themes';
import { appFonts, fontSizes, windowHeight, windowWidth } from '@src/themes';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    mainView:{ alignItems: "center", justifyContent:'center'},
    info:{ marginHorizontal: windowWidth(5) ,  alignItems:"center"},
    image: {
        height: windowHeight(230),
        width: windowHeight(230),
        resizeMode: 'contain'
    },
    title: {
        fontFamily: appFonts.bold,
        fontSize: fontSizes.FONT23,
    },
    details: {
        fontFamily: appFonts.regular,
        color: appColors.regularText,
        textAlign: 'center',
        marginVertical: windowHeight(10),
        marginHorizontal: windowWidth(30)
    },
    refButton: {
        backgroundColor: appColors.buttonBg,
        paddingHorizontal: windowHeight(20),
        paddingVertical: windowHeight(8),
        borderRadius: windowHeight(4)
    },
    refText: {
        color: appColors.whiteColor,
        fontFamily: appFonts.regular
    }
});
export { styles };
