import { StyleSheet } from 'react-native';
import { appColors } from '@src/themes';
import { commonStyles } from '../../../../styles/commonStyle';
import { windowHeight } from '@src/themes';

const styles = StyleSheet.create({
  mainView: { paddingVertical: windowHeight(18),paddingHorizontal:windowHeight(18) },
  container: {
    backgroundColor: appColors.whiteColor,
    marginHorizontal: windowHeight(5.9),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight(5),
    borderWidth: windowHeight(0.9),
    paddingHorizontal: windowHeight(8),
    paddingVertical: windowHeight(8),
    right: windowHeight(6),
    ...commonStyles.shadowContainer,
    borderColor: appColors.border,
  },
});
export { styles };
