import { StyleSheet } from "react-native";
import {
  appColors,
  appFonts,
  fontSizes,
  windowHeight,
  windowWidth,
} from "@src/themes";

const style = StyleSheet.create({
  otpTextInput: {
    backgroundColor: appColors.lightGray,
    borderColor: appColors.lightGray,
    borderWidth: windowHeight(0.3),
    borderRadius: windowHeight(6),
    width: windowWidth(60),
    height: windowHeight(40),
    borderBottomWidth: windowHeight(0.3),
    color: appColors.primaryText,
    textAlign: "center",
    fontSize: fontSizes.FONT22,
    marginTop: windowHeight(10),
    fontFamily: appFonts.bold,
  },
  inputContainer: {
    alignSelf:'center',
    alignItems:'center'
  },
  otpContainer: {
    color: appColors.textRed,
    width:'100%',
    justifyContent:'center',
  },
  otpInput: {
    borderRadius: windowHeight(5),
    textAlign:"center",
  },
  otpTitle: {
    fontFamily: appFonts.semiBold,
    fontSize: fontSizes.FONT19,
    paddingTop: windowHeight(25),
  },
});
export { style };
