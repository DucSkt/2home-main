import React from "react";
import { Text, View } from "react-native";

import { Colors } from "../../../themes";
import { HorizontalChartBar } from "../../charts";
import styles from "./styles";

const ContractContentItem = ({ data, date, chartConfig, dateTextStyle }) => (
  <View>
    <Text style={[styles.dateTextStyle, dateTextStyle]}>{date} :</Text>
    <HorizontalChartBar
      data={data}
      style={chartConfig.style}
      xStandard={chartConfig.xStandard || "x"}
      yStandard={chartConfig.yStandard || "y"}
      barColor={chartConfig.barColor || Colors.activeSubtitle}
      valueTextFormat={chartConfig.valueTextFormat}
      valueTextStyle={chartConfig.valueTextStyle}
      labelStyle={chartConfig.labelStyle}
      chartStyle={chartConfig.chartStyle}
    />
  </View>
);

export default ContractContentItem;
