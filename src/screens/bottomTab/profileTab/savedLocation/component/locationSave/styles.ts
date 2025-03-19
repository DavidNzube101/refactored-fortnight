import { StyleSheet } from "react-native";
import { appColors, fontSizes, appFonts, windowHeight, windowWidth } from "@src/themes";

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  mapView:{ height: "100%" },
  mapView1:{ height: "100%" },

  backView: {
    height: windowHeight(33),
    width: windowHeight(33),
    position: "absolute",
    zIndex: 2,
    marginHorizontal: windowHeight(10),
    top: windowHeight(10), borderRadius: windowHeight(7.3),
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    position: "absolute",
    marginTop: "18%",
    right: windowHeight(8.5),
    left: windowHeight(9.5),
    backgroundColor: appColors.whiteColor,
    alignItems: "center",
    borderRadius: windowHeight(7.3),
  },
  textInput: {
    backgroundColor: appColors.whiteColor,
    color: appColors.blackColor,
    width: windowWidth(390),
    fontFamily: appFonts.medium,
    textAlign: "left",
  },
  pointerMarker: {
    position: "absolute",
    top: "53%",
    left: "50%",
    width: windowHeight(30),
    height: windowHeight(30),
    transform: [{ translateX: -15 }, { translateY: -15 }],
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: appColors.buttonBg,
    position: "absolute",
    height: windowHeight(43),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowHeight(6.5),
    bottom: windowHeight(10),
    right: windowHeight(10),
    left: windowHeight(10),
  },
  confirmText: {
    color: appColors.whiteColor,
    fontFamily: appFonts.semiBold,
  },
  pinImage: {
    width: windowHeight(30),
    height: windowHeight(30),
  },
  title: {
    color: appColors.primaryText,
    fontFamily: appFonts.bold,
    textAlign: "center",
    justifyContent: "center",
    fontSize: fontSizes.FONT22,
  },
  subtitle: {
    color: appColors.primaryText,
    fontFamily: appFonts.semiBold,
    textAlign: "left",
    justifyContent: "center",
    fontSize: fontSizes.FONT21,
    marginBottom: windowHeight(5),
    marginHorizontal: windowWidth(8),
  },
  container: {
    paddingVertical: windowHeight(12),
  },
  optionContain: {
    justifyContent: "space-between",
    marginTop:windowHeight(11)
  },
  optionContainer: {
    alignItems: "center",
    marginBottom: windowHeight(10),
    backgroundColor: appColors.whiteColor,
    borderRadius: windowWidth(8),
    paddingVertical: windowHeight(6),
    paddingHorizontal: windowWidth(19),
    borderWidth: windowHeight(0.9),
    borderColor: appColors.border,
  },
  radioButton: {
    height: windowWidth(25),
    width: windowWidth(25),
    borderRadius: windowHeight(10),
    justifyContent: "center",
    alignItems: "center",
    marginRight: windowWidth(12),
    backgroundColor: appColors.whiteColor,
    borderWidth: windowHeight(0.9),
    borderColor: appColors.border,
  },
  radioSelected: {
    height: windowHeight(8.5),
    width: windowHeight(8.5),
    borderRadius: windowHeight(4),
    backgroundColor: appColors.whiteColor,
    borderWidth: windowHeight(0.9),
    borderColor: appColors.border,
  },
  optionLabel: {
    fontSize: fontSizes.FONT18,
    color: appColors.regularText,
    fontFamily: appFonts.medium,
  },
  btnContainer: {
    justifyContent: "space-between",
  },
  selectedOptionContainer: {
    backgroundColor: appColors.buttonBg,
  },
  selectedOptionLabel: {
    color: appColors.whiteColor,
  },
  selectedOptionRadio: {
    backgroundColor: appColors.radioBg,
    borderColor: appColors.radioBg,
  },
  titleInput: {
    borderWidth: windowHeight(0.9),
    borderColor: appColors.border,
    borderRadius: windowWidth(8),
    marginVertical: windowHeight(8),
    color: appColors.primaryText,
    fontFamily: appFonts.regular,
    paddingHorizontal: windowWidth(18),
    height:windowHeight(40)
  },
  modelView: { alignItems: "flex-end" },
  inputLine: {
    width: windowHeight(0.5),
    height: windowHeight(30),
    borderLeftWidth: windowHeight(0.9),
  },
  addressMarkerIcon: {
    borderRadius: windowHeight(8),
    alignItems: "center",
    justifyContent: "center", width: windowHeight(40),
    height: windowHeight(40),
  },
});
export default styles;
