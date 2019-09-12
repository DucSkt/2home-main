import { StyleSheet } from "react-native";
import Colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";

export default (styles = StyleSheet.create({
  Button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  Text: {
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
    color: Colors.white
  },
  imageContainer: {
    position: "absolute",
    left: 0,
    top: 9,
    bottom: 0
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 15
  }
}));
