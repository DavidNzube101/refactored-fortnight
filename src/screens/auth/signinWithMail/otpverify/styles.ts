import { StyleSheet } from "react-native";
import { fontSizes, windowHeight, windowWidth, appColors } from "@src/themes";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.lightGray,
  },
  backBtn: {
    borderWidth: windowHeight(0.9),
    height: windowHeight(30),
    width: windowHeight(30),
    borderRadius: windowHeight(5),
    alignItems: "center",
    justifyContent: "center",
    margin: windowHeight(10),
    zIndex: 2,
    backgroundColor: appColors.whiteColor,
  },
  img: {
    height: windowHeight(230),
    width: windowHeight(280),
    resizeMode: "contain",
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
  },
  topContainer: {
    height: "55%",
  },
  bottomContainer: {
    height: "45%",
    borderTopLeftRadius: windowHeight(20),
    borderTopRightRadius: windowHeight(20),
    backgroundColor: appColors.whiteColor,
    paddingHorizontal: windowWidth(15),
    paddingTop: windowHeight(10),
  },
  sendBtn: {
    position: "absolute",
    bottom: windowHeight(10),
    width: "100%",
    marginHorizontal: windowWidth(15),
  },
  otpTextInput: {
    backgroundColor: appColors.lightGray,
    borderColor: appColors.lightGray,
    borderWidth: 0.5,
    borderRadius: windowHeight(5.8),
    width: windowWidth(60),
    height: windowHeight(40),
    borderBottomWidth: 0.5,
    textAlign: "center",
    fontSize: fontSizes.FONT22,
  },
  otpContainer: {
    height: windowHeight(75),
  },
  otpField: {
    justifyContent: "space-between",
    width: "100%",
    color: appColors.textRed,
  },
  otpInput: {
    width: windowWidth(60),
    height: windowHeight(40),
    borderRadius: windowHeight(5),
  },
});
export { style };
