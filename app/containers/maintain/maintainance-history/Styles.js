import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.silver,
  },
  historyItem: {
    backgroundColor: Colors.nephritis,
  },
  styleNameInHeader: {
    color: Colors.white,
    fontFamily: Fonts.type.base,
  },
});
