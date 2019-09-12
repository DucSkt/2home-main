import { Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { StackBar } from "../../charts";
import styles from "./styles";
import RowView from "../../RowView";

import I18n from "../../../localization";
import { currencyTranslate } from "../../../common/currencyTranslate";
import { log } from "../../../common/Logger";

const RentContent = ({
  date,
  overdue,
  totalCollected,
  totalDue,
  dateTextStyle,
  overdueInfoStyle,
  totalCollectedTextStyle,
  totalDueTextStyle,
  stackBarStyle,
  detailStackBarStyle,
  totalCollectedBarBackgroundColor,
  totalDueBarBackgroundColor,
  totalCollectedBarTextStyle,
  totalDueBarTextStyle,
  lang,
}) => {
  const totalLeft = totalDue - totalCollected;
  return (
    <View>
      <RowView>
        <Text style={[styles.dateText, dateTextStyle]}>
          {moment(new Date(date)).isValid()
            ? moment(new Date(date)).format("MMM YYYY")
            : date}
          :
        </Text>
        <Text style={[styles.overdueInfoText, overdueInfoStyle]}>
          {I18n.t("youHave")} ({overdue}) {I18n.t("overdue")}
        </Text>
      </RowView>

      <RowView justifyContent="space-between">
        <Text style={[styles.totalCollectedText, totalCollectedTextStyle]}>
          {I18n.t("totalCollected")}:{" "}
          {currencyTranslate(totalCollected, lang, I18n.t("currency"))}
        </Text>
        <Text style={[styles.totalDueText, totalDueTextStyle]}>
          {I18n.t("totalLeft")}:{" "}
          {currencyTranslate(totalLeft, lang, I18n.t("currency"))}
        </Text>
      </RowView>

      <StackBar
        leftStackValue={totalCollected}
        rightStackValue={totalLeft}
        style={stackBarStyle}
        stackStyle={detailStackBarStyle || { padding: 1 }}
        leftStackTextStyle={totalCollectedBarTextStyle}
        leftStackBackgroundColor={totalCollectedBarBackgroundColor}
        rightStackTextStyle={totalDueBarTextStyle}
        rightStackBackgroundColor={totalDueBarBackgroundColor}
      />
    </View>
  );
};

export default RentContent;
