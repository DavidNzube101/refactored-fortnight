import { StyleSheet } from 'react-native';
import { commonStyles } from '../../../../styles/commonStyle';
import { external } from '../../../../styles/externalStyle';
import { appColors, appFonts, fontSizes, windowHeight, windowWidth } from '@src/themes';

const styles = StyleSheet.create({
  mainContainer: { marginBottom: windowHeight(10), marginTop: windowHeight(1) },
  container: {
    ...commonStyles.flexContainer,
  },
  headerContainer: {
    backgroundColor: appColors.whiteColor,
    height: windowHeight(60),
  },
  promoCodeImageBackground: {
    height: windowHeight(120),
    paddingHorizontal: windowWidth(18),
    paddingTop: windowHeight(13),
    paddingBottom: windowHeight(16),
    marginTop: windowHeight(2),  
  },
  promoCodeText: {
    ...commonStyles.mediumTextBlack,
    fontSize: fontSizes.FONT21,
    fontWeight: '600',
    fontFamily: appFonts.bold,
  },
  promoCodeCodeContainer: {
    backgroundColor: appColors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth(12),
    paddingVertical: windowHeight(4.5),
    borderRadius: windowHeight(3),
  },
  promoCodeCodeText: {
    ...commonStyles.regularText,
    color: appColors.buttonBg,
  },
  promoCodeSubtitle: {
    ...commonStyles.regularText,
    width: windowWidth(300),
    marginTop: windowHeight(5),
  },
  dashedLine: {
    height: 0.1,
    width: '102%',
    borderWidth: windowHeight(0.5),
    borderColor: appColors.primaryGray,
    borderStyle: 'dashed',
    marginVertical: windowHeight(9),
  },
  promoCodeValidityContainer: {
    ...external.fd_row,
    ...external.js_space,
    top:windowHeight(2)
  },
  promoCodeUseNow: {
    ...commonStyles.mediumTextBlack12,
    marginLeft: windowWidth(8)
  },
  discountImage: {
    height: windowHeight(50),
    width: windowHeight(50),
  },
  copyView: {
    justifyContent: "center",
    alignItems: "center",
  },
  couponLoader:{ marginBottom: windowHeight(1) }
});
export { styles };
