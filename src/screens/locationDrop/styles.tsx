import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/commonStyle";
import { appColors, appFonts, fontSizes, windowHeight, windowWidth } from "@src/themes";
import { external } from "../../styles/externalStyle";

const styles = StyleSheet.create({
  main:{flex:1},
  container: {
    width: windowHeight(30),
    height: windowHeight(30),
    backgroundColor: appColors.whiteColor,
    borderColor: appColors.primaryGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowHeight(5),
    ...commonStyles.shadowContainer,
  },
  viewContainer: {
    backgroundColor: appColors.whiteColor,
    flex: 1,
    paddingTop: windowHeight(20),
  },
  horizontalView: {
    paddingHorizontal: windowHeight(14),
  },
  subtitleText: {
    ...commonStyles.regularText,
    fontWeight: "300",
    fontSize: fontSizes.FONT16,
    color: appColors.regularText,
  },
  titleText: {
    ...commonStyles.mediumText23,
    fontSize: fontSizes.FONT19,
    width: windowWidth(362),
  },
  iconView: {
    width: windowHeight(27),
    height: windowHeight(27),
    backgroundColor: appColors.lightGray,
    borderRadius: windowHeight(27),
    marginHorizontal: windowHeight(5),
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    ...commonStyles.shadowContainer,
    backgroundColor: appColors.whiteColor,
    borderRadius: windowHeight(5.9),
    marginVertical: windowHeight(12),
    paddingVertical: windowHeight(4),
    borderWidth: windowHeight(0.9),
  },
  recentView: {
    backgroundColor: appColors.lightGray,
    paddingHorizontal: windowHeight(16),
    paddingTop: windowHeight(16),
  },
  chooseAnotherAccount: {
    ...commonStyles.mediumTextBlack12,
    ...external.mh_5,
    fontSize: fontSizes.FONT19,
    color: appColors.buttonBg,
  },
  spaceing: {
    marginHorizontal: windowWidth(8),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColors.modelBg,
  },
  modalContainer: {
    width: 300,
    padding: windowHeight(18),
    backgroundColor: appColors.whiteColor,
    borderRadius: windowHeight(9.8),
    alignItems: "center",
  },
  modalText: {
    marginBottom: windowHeight(18),
    textAlign: "center",
    color: appColors.primaryText,
    fontFamily: appFonts.medium,
  },
  bar: {
    height: windowHeight(2),
    width: windowHeight(35),
    backgroundColor: appColors.buttonBg,
    marginTop: windowHeight(-1),
    position: "absolute",
    bottom: 0,
  },
  fareStyle: {
    ...commonStyles.mediumTextBlack12,
    color: appColors.alertRed,
    paddingHorizontal: windowHeight(5),
  },
  viewContainerToll: {
    backgroundColor: appColors.alertBg,
    borderRadius: windowHeight(4.8),
    ...external.ai_center,
    ...external.js_center,
    ...external.fd_row,
    paddingVertical: windowHeight(12),
    marginTop:windowHeight(18),
    ...external.mh_20,
  },
  dateField: {
    marginTop: windowHeight(12),
    borderRadius: windowHeight(4),
    borderWidth: windowHeight(0.9),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateInput: {
    color: appColors.primaryText,
    fontFamily: appFonts.medium,
    width: "80%",
    marginHorizontal: windowWidth(15),
  },
  locationBtn: {
    height: windowHeight(45),
    width: "47.8%",
    borderRadius: windowHeight(5),
    marginVertical: windowWidth(18),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: windowHeight(18)
  },
  locationBtnText: {
    fontFamily: appFonts.medium,
    marginHorizontal: windowWidth(5),
  },
  historyView: {
    height: windowHeight(28),
    width: windowHeight(28),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowHeight(15),
  },
  historyBtn: {
    height: windowHeight(45),
    alignItems: "center"
  },
  locationText: {
    color: appColors.primaryText,
    fontFamily: appFonts.medium,
    marginHorizontal: windowWidth(10),
    width:'90%',
    textAlign:'left'
  },
  bottomLine: {
    borderBottomWidth: windowHeight(0.9),
  },
  addressMArker: {
    backgroundColor: appColors.lightGray,
    height: windowHeight(30),
    width: windowHeight(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowHeight(40),
  },
  addressItemView: {
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight(50),
  },
  calenderView: { marginHorizontal: windowWidth(10) },
  suggestionsView: {
    marginHorizontal: windowHeight(8),
    marginVertical: windowHeight(3),
  },
  noAddressText: {
    fontSize: fontSizes.FONT22,
    fontFamily: appFonts.regular, textAlign: "center",
  },
  renderItemRecentView:{ paddingHorizontal: windowWidth(15) },
});
export { styles };
