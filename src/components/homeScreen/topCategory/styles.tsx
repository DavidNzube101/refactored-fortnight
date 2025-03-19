import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '@src/themes';
import { commonStyles } from '../../../styles/commonStyle';
import { appColors } from '@src/themes';
import { external } from '../../../styles/externalStyle';

const styles = StyleSheet.create({
  container: {
    marginBottom: windowHeight(15),
    alignItems: 'center',
  },
  topCategoryTitle: {
    textAlign: 'right',
    width: '100%',
    paddingHorizontal: windowWidth(20),
    marginTop: windowHeight(10)
  },

  mainContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: windowHeight(68),
    paddingVertical: windowHeight(9.3),
    marginHorizontal: windowHeight(9),
  },
  itemContainer: {
    width: windowWidth(210),
    borderWidth: windowHeight(1),
    borderColor: appColors.lightGray,
    backgroundColor: appColors.whiteColor,
    borderRadius: windowHeight(5),
    ...commonStyles.shadowContainer,
    height: windowHeight(68),
    marginHorizontal: windowWidth(10),
    marginBottom: windowHeight(15),

  },
  itemText: {
    ...commonStyles.mediumTextBlack12,
    color: appColors.primaryText,
    fontSize: fontSizes.FONT19

  },
  iconContainer: {
    ...external.fd_row,
    ...external.js_space,
    ...external.mt_10,
    ...external.ai_center,
  },

  carImage: {
    width: windowWidth(90),
    resizeMode: 'contain',
    height: windowHeight(50),
    position: 'absolute',
    bottom: windowHeight(4.8)
  },
  itemSeparator: {
    width: windowWidth(28),
  },
  listContainer: { width: "100%", alignItems: "center" },
});
export { styles };
