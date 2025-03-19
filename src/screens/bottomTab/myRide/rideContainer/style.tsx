import { StyleSheet } from 'react-native';
import { commonStyles } from '../../../../styles/commonStyle';
import { appColors, appFonts, fontSizes, windowHeight, windowWidth } from '@src/themes';
import { external } from '../../../../styles/externalStyle';


const styles = StyleSheet.create({
  main: { flex: 1 },
  addressContainer: {
    backgroundColor: appColors.whiteColor,
    shadowColor: appColors.blackColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: windowHeight(5.9),
    paddingHorizontal: windowWidth(24),
    paddingVertical: windowHeight(12),
  },
  dashedLine: {
    height: 0.1,
    width: '100%',
    borderBottomWidth: windowHeight(0.9),
    borderColor: appColors.primaryGray,
    borderStyle: 'dashed',
    marginVertical: windowHeight(8),
  },
  pickUpLocationStyles: {
    ...commonStyles.regularText,
    fontWeight: '300',
    fontSize: fontSizes.FONT16,
    color: appColors.primaryText,
  },
  itemStyle: {
    ...commonStyles.regularText,
    fontWeight: '300',
    fontSize: fontSizes.FONT16,
    color: appColors.primaryText,
  },
  icon: {
    borderStyle: 'dotted',
    height: windowHeight(20),
    borderLeftWidth: windowHeight(0.9),
    marginHorizontal: windowHeight(5),
    borderLeftColor: appColors.regularText,
  },
  container: {
    ...external.mh_20,
    ...external.mt_20,
  },
  rideInfoContainer: {
    width: '100%',
    backgroundColor: appColors.whiteColor,
    borderRadius: windowHeight(5.9),
    paddingHorizontal: windowHeight(12),
    paddingTop: windowHeight(12),
    paddingVertical: windowHeight(9),
  },
  profileImage: {
    width: windowWidth(50),
    height: windowHeight(35),
    resizeMode: 'contain'
  },
  profileTextContainer: {
    ...external.mh_20,
    ...external.fg_1,
  },
  profileName: {
    ...commonStyles.mediumTextBlack12,
    fontSize: fontSizes.FONT19,
  },
  carInfoContainer: {
    alignItems: 'center',
    marginTop: windowHeight(3),
  },
  carInfoText: {
    ...commonStyles.regularText,
  },
  tripImage: {
    width: windowWidth(50),
    height: windowHeight(25),
    resizeMode: 'contain',
  },
  tripTextContainer: {
    ...external.ph_13,
    ...external.fg_1,
  },
  tripIDText: {
    ...commonStyles.mediumTextBlack12,
  },
  tripCostText: {
    ...commonStyles.mediumTextBlack12,
    color: appColors.price,
    marginVertical: windowHeight(2.9),
  },
  tripDateText: {
    ...commonStyles.regularText,
    paddingLeft: windowWidth(6),
  },
  iconContainer: {
    ...external.fd_row,
    ...external.js_space,
    ...external.mh_20,
  },
  serviceMainView: { justifyContent: "space-between" },
  serviceView: { marginTop: windowHeight(12) },
  service_name: {
    color: appColors.buttonBg,
    fontFamily: appFonts.regular,
  },
  service_name_view: {
    backgroundColor: appColors.lightButton,
    paddingHorizontal: windowWidth(18),
    borderRadius: windowHeight(10),
    height: windowHeight(18),
    alignItems: "center",
    justifyContent: "center",
  },
  service_category: {
    color: appColors.darkPurpal,
    fontFamily: appFonts.regular,
  },
  service_category_view: {
    backgroundColor: appColors.lightPurpal,
    paddingHorizontal: windowWidth(18),
    marginHorizontal: windowHeight(10),
    borderRadius: windowHeight(10),
    height: windowHeight(18),
    alignItems: "center",
    justifyContent: "center",
  },
  MessageMainView: {
    width: windowWidth(100),
    justifyContent: "space-between",
  },
  MessageView: {
    alignItems: "center",
    justifyContent: "center", height: windowHeight(30),
    width: windowHeight(30),
    borderRadius: windowHeight(20),
    borderWidth: windowHeight(0.9),
  },
  safetyCallView: {
    alignItems: "center",
    justifyContent: "center", height: windowHeight(30),
    width: windowHeight(30),
    borderRadius: windowHeight(20),
    borderWidth: windowHeight(0.9),
  },
  starContainer: { alignItems: "flex-end", justifyContent: "center" },
  iconMainView: {
    alignItems: "flex-end",
    height: windowHeight(32),
    justifyContent: "space-between",
  },
  iconView: {  alignItems: "center" },
  bgmodal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.modelBg,
  },
  background: {
    paddingVertical: windowHeight(17),
    paddingHorizontal: windowWidth(12),
    borderRadius: windowHeight(10),
  },
  title: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT18,
    textAlign: 'center',
    marginHorizontal: windowWidth(20),
    paddingTop: windowHeight(10),
    paddingBottom: windowHeight(5),
  },
  userAlign: {
    alignItems: 'center',
    marginTop: windowHeight(18)
  },
  modalImage: {
    height: windowHeight(52),
    width: windowWidth(76),
    resizeMode: 'contain',
  },
  modalName: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT19
  },
  modalMail: {
    fontSize: fontSizes.FONT15
  },
  lineImage: {
    height: windowHeight(4.8),
    width: windowHeight(284),
    marginVertical: windowHeight(8),
    resizeMode: 'stretch',
  },
  rate: {
    fontFamily: appFonts.medium
  },
  tips: {
    marginTop: windowHeight(18),
    fontFamily: appFonts.medium
  },
  border2: {
    borderBottomWidth: windowHeight(0.1),
    marginVertical: windowHeight(18),
    borderBottomColor: appColors.primaryGray
  },
  comment: {
    fontFamily: appFonts.medium,
    marginVertical: windowHeight(8)
  },
  textinput: {
    height: windowHeight(85),
    borderWidth: windowHeight(0.1),
    borderColor: appColors.primaryGray,
    borderRadius: windowHeight(5),
  },
  payment: {
    fontFamily: appFonts.medium,
    marginVertical: windowHeight(8)
  },
  modalPaymentView: {
    borderWidth: windowHeight(0.1),
    paddingVertical: windowHeight(8),
    marginBottom: windowHeight(16),
    borderRadius: windowHeight(5),
    borderColor: appColors.primaryGray,
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth(10)
  },
  paymentView: {
    marginHorizontal: windowWidth(12),
    marginVertical: windowHeight(6)
  },
  mailInfo: {
    marginHorizontal: windowWidth(6),
    justifyContent: 'center'
  },
  mail: {
    fontFamily: appFonts.regular
  },
  payBtn: {
    backgroundColor: appColors.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth(95),
    borderRadius: windowHeight(7.9),
    marginHorizontal: windowWidth(6),
    height: windowHeight(35)
  },
  containerReview: {
    height: windowHeight(44),
    borderWidth: windowHeight(0.1),
    borderColor: appColors.primaryGray,
    borderRadius: windowHeight(5),
    marginTop: windowHeight(8),
    justifyContent: 'space-between',
  },
  starIcon: {
    marginHorizontal: windowWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingView: {
    alignItems: 'center',
    marginHorizontal: windowWidth(18),
    justifyContent: 'center',
  },
  borderVertical: {
    borderColor: appColors.primaryGray,
    borderRightWidth: windowHeight(0.1),
    height: windowHeight(16),
    marginHorizontal: windowWidth(18)
  },
  rating: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT16,
  },
  buttonContainer: {
    marginTop: windowHeight(8),
  },
  button: {
    paddingVertical: windowHeight(8),
    paddingHorizontal: windowWidth(10),
    borderRadius: windowHeight(5),
    marginHorizontal: windowWidth(6),
    flex: 1,
    alignItems: 'center',
    borderWidth: windowHeight(0.1),
    marginVertical: windowHeight(4)
  },
  buttonText: {
    fontFamily: appFonts.medium,
  },
  contain: {
    justifyContent: "space-between",
    marginHorizontal: windowWidth(15),
    marginBottom: windowHeight(2),
    marginTop: windowHeight(6),
  },
  type: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT18
  },
  leftRadius: {
    height: windowHeight(12.5),
    width: windowWidth(25),
    bottom: 0,
    position: "absolute",
    borderTopRightRadius: windowHeight(24),
    borderRightWidth: windowHeight(0.1),
    borderTopWidth: windowHeight(0.1),
    borderTopColor: appColors.border,
    borderRightColor: appColors.border,
  },
  rightRadius: {
    height: windowHeight(12.5),
    width: windowWidth(25),
    bottom: 0,
    right: 0,
    position: "absolute",
    borderTopLeftRadius: windowHeight(49),
    borderLeftWidth: windowHeight(0.9),
    borderTopWidth: windowHeight(0.9),
    borderLeftColor: appColors.border,
    borderTopColor: appColors.border,
  },
  border: {
    borderWidth: windowHeight(0.4),
    marginHorizontal: windowWidth(15),
  },
  PendingRideContainer: {
    height: windowHeight(22),
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: windowHeight(10),
  },
  containerStyle: {
    paddingBottom: windowHeight(50),
  },
});

export { styles };
