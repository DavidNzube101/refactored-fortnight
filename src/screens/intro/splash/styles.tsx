import { StyleSheet } from 'react-native';
import { windowHeight } from '@src/themes';

const styles = StyleSheet.create({
  img: {
    width: '60%',
    height: windowHeight(45),
    resizeMode: 'contain',
  },
  splashBg:{ position: "absolute", height: "100%", width: "100%" }
});
export { styles };
