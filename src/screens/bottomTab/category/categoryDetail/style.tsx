import { StyleSheet } from 'react-native';
import { commonStyles } from '../../../../styles/commonStyle';
import { external } from '../../../../styles/externalStyle';
import { appColors , appFonts, fontSizes, windowHeight, windowWidth } from '@src/themes'; 

const styles = StyleSheet.create({
  textContainer: {
    ...commonStyles.regularText,
    ...external.pt_5,
    color: appColors.categoryTitle,
  },
  img: {
    width: windowWidth(350),
    height: windowHeight(120),
  },
  itemSeparator: {
    width: windowWidth(25),
  },
  readyText: {
    ...commonStyles.mediumTextBlack12,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT19,
    color: appColors.whiteColor,
  },
  imgBg: {
    height: windowHeight(82),
    width: windowWidth(438),
    ...external.mv_10,
  },
});
export { styles };
