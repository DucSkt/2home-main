import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../../../themes";

export default StyleSheet.create({
  container: {},
  content: {
    flexDirection: "row",
    justifyContent: "space-around"
  },

  left: {
    padding: 10,
    alignSelf: 'center',
    flex: 1
  },

  leftSubtitle: {
    marginBottom: 5,
    alignSelf: 'center',
    fontSize: Fonts.size.input,
    textAlign: 'center',
    fontFamily: Fonts.type.base
  },
  leftContent: {
    alignSelf: "center",
    fontSize: Fonts.size.giant,
    fontFamily: Fonts.type.medium,
    color: Colors.orange
  },

  right: {
    padding: 10,
    flex: 1
  },
  rightSubtitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 5
  },
  rightContent: {
    alignSelf: "center",
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.giant,
    color: Colors.orange
  }
});
