import { StyleSheet } from "react-native";
import { windowHeight } from "@src/themes";

const styles = StyleSheet.create({
  container: { 
    paddingBottom: windowHeight(15),
 },
  swipeContainer: { 
    marginHorizontal: windowHeight(8),
 },
});
export default styles;
