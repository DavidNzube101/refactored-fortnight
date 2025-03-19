import { StyleSheet } from "react-native";
import {
  windowHeight,
  windowWidth,
  appColors,
  appFonts,
} from "@src/themes";


const styles = StyleSheet.create({
  countryCodeContainer: {
    width: windowWidth(100),
    height: windowHeight(42),
    backgroundColor: appColors.lightGray,
    borderRadius: windowHeight(4),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: windowHeight(0.9),
    borderColor: appColors.border,
  },
  inputText: {
    marginHorizontal: windowWidth(5),
    width: '100%'
  },
  phoneNumberInput: {
    width: windowWidth(330),
    backgroundColor: appColors.lightGray,
    borderRadius: windowHeight(4),
    marginHorizontal: windowHeight(9),
    paddingHorizontal: windowHeight(9),
    borderWidth: windowHeight(0.3),
    height: windowHeight(42),
  },
  iconContainer: {
    height: windowHeight(39),
    width: windowWidth(10),
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: windowHeight(3),
    marginHorizontal: windowWidth(5),
  },
  dialCode: {
    color: appColors.regularText,
    fontFamily: appFonts.regular,
    left: windowHeight(2),
  },
  emptySpace: {
    height: windowHeight(80),
  },
  sociallogin: {
    color: appColors.primaryText,
    fontFamily: appFonts.medium,
    marginHorizontal: windowWidth(8),
  },
  socialContainer: {
    justifyContent: "space-between",
    marginTop: windowHeight(10),
  },
  socialView: {
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: windowHeight(12),
    paddingHorizontal: windowHeight(12),
    backgroundColor: appColors.lightGray,
    borderRadius: windowHeight(5),
    width: "47%",
  },
  faceBook: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: windowHeight(14),
    borderRadius: windowHeight(5),
    marginTop: windowHeight(15),
    backgroundColor: appColors.lightGray,
  },
  orImg: {
    width: "100%",
    resizeMode: "contain",
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
    top: windowHeight(8.3),
    height: windowHeight(40),
  },
  countryCode: {
    justifyContent: "space-between",
    width: windowWidth(55),
  },
  forgetPW: {
    color: appColors.buttonBg,
    fontFamily: appFonts.regular,
  },
  guestImage: {
    height: windowHeight(15),
    width: windowHeight(20),
    resizeMode: "contain",
  },
  warningText: {
    color: appColors.alertRed,
    marginTop: windowHeight(5),
  },
  demoBtn: {
    borderWidth: 1,
    borderColor: appColors.buttonBg,
    borderRadius: windowHeight(5),
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight(41.5),
    marginVertical: windowHeight(15),
  },
  demoBtn1: {
    borderWidth: 1,
    borderColor: appColors.buttonBg,
    borderRadius: windowHeight(5),
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight(41.5),
    marginVertical: windowHeight(15),
    position: "absolute",
    bottom: windowHeight(5),
    width: "100%",
  },
  demoBtnText: {
    color: appColors.buttonBg,
    fontFamily: appFonts.medium,
  },
});

export default styles;
