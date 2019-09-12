import { StyleSheet } from "react-native";
import { Fonts } from "../../../themes";

export default StyleSheet.create({
  container: {},

  subTitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30
  },

  rightSubTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.input,
  },

  leftSubTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.input,
  },

  content: {
    alignItems: "center"
  },
  occupancyProcessStyle: {
    fontSize: Fonts.size.h2
  }
});
