import { StyleSheet } from 'react-native';
import { external } from '../../../../styles/externalStyle';
import { appColors, windowHeight } from '@src/themes';

const styles = StyleSheet.create({
  container: {
    ...external.fx_1,
    ...external.pt_13,
    backgroundColor: appColors.whiteColor,
  },
  signInView: { marginHorizontal: windowHeight(12) },
  signInMainView: {
    position: "absolute",
    bottom: windowHeight(10),
    width: "100%",
  },
});
export { styles };
