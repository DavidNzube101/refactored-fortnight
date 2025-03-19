import { StyleSheet } from 'react-native';
import { appFonts, fontSizes, windowHeight } from '@src/themes';
import { appColors } from '@src/themes';
import { commonStyles } from '../../../styles/commonStyle';
import { external } from '../../../styles/externalStyle';

const styles = StyleSheet.create({
  mainContainer: { flex: 1, height: '100%' },
  viewContainer: {
    position: 'absolute',
    bottom: windowHeight(0),
    width: '90%',
    alignSelf: 'center',
    marginBottom: windowHeight(13),
  },
  textContainer: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT16,
    ...external.ph_20,
    color: appColors.primaryText,
    marginTop:windowHeight(18)
  },
  inputContainer: {
    ...commonStyles.shadowContainer,
    ...external.mh_20,
    ...external.ph_20,
    ...external.pv_15,
    borderRadius: windowHeight(5.8),
    marginTop:windowHeight(15),
  },
  codeContainer:{ marginTop: windowHeight(2) },
  lastName:{ bottom: windowHeight(16) },
  firstName:{ bottom: windowHeight(13) },
});
export { styles };
