import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../../../themes";

export default StyleSheet.create({
  container: {},

  dateText: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.base,
    fontWeight: "bold",
    margin: 5
  },
  overdueInfoText: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.base,
    alignSelf: "center",
    margin: 5
  },

  rentInfoRow: {
    justifyContent: "space-between",
    flex: 1
  },
  totalCollectedText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: Colors.activeSubtitle,
    flex: 1,
  },
  totalDueText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    color: Colors.inActiveSubtitle,
    textAlign: 'center',
    flex: 1,
  },

  ratio: {
    flex: 1
  },
  detailRatio: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});
