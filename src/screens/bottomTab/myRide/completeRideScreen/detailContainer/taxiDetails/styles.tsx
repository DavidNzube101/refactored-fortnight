import { StyleSheet } from 'react-native';
import { appColors, windowHeight, windowWidth } from '@src/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight(80),
    backgroundColor: appColors.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    width: windowWidth(80),
    height: windowHeight(45),
    resizeMode:'contain',
  },
  vehicleContainer: {
    backgroundColor: appColors.lightGray,
    height: windowHeight(60),
    width: windowHeight(60),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowHeight(4),
  },
  platNumberView: {
    justifyContent: "center",
    paddingTop: windowHeight(5),
    alignItems: "center",
  },
  vehicle_info: {
    color: appColors.buttonBg,
    marginLeft: windowHeight(5),
  },
  vehicleView:{ justifyContent: "flex-end", alignItems: "flex-end" }
});
export { styles };
