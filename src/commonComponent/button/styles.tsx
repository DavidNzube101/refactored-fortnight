import { StyleSheet } from 'react-native';
import { windowHeight } from '@src/themes';
import { appColors } from '@src/themes';
import { external } from '../../styles/externalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.buttonBg,
    height: windowHeight(40),
    borderRadius: windowHeight(4.2),
    ...external.ai_center,
    ...external.js_center,
    paddingVertical: windowHeight(10),
    alignItems: "center",
    justifyContent: "center",
  },
});
export { styles };
