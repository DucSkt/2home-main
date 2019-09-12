import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel
} from "victory-native";
import PropTypes from "prop-types";
import { View } from "react-native";

import { Metrics, Colors, Fonts } from "../../../themes";
import styles from "./styles";
import I18n from '../../../localization';

export default class App extends React.Component {


  static propTypes = {
    hasAnimate: PropTypes.bool,
    animDuration: PropTypes.number,
    chartStyle: PropTypes.object,
    barColor: PropTypes.any, // barcolor can be a function return a string or just a string
    valueTextFormat: PropTypes.func,
    labelStyle: PropTypes.object,
    valueTextStyle: PropTypes.object,
    barRatio: PropTypes.number,
    data: PropTypes.array,
    xStandard: PropTypes.string,
    yStandard: PropTypes.string
  };

  static defaultProps = {
    hasAnimate: false,
    animDuration: 1000,
    chartStyle: {},
    barColor: Colors.activeSubtitle,
    valueTextFormat: {},
    labelStyle: {},
    valueTextStyle: {},
    barRatio: 0.8,
    data: [
      { month: I18n.t("jan"), earnings: 0 },
      { month: I18n.t("feb"), earnings: 0 },
      { month: I18n.t("mar"), earnings: 0 },
      { month: I18n.t("apr"), earnings: 0 },
      { month: I18n.t("may"), earnings: 0 },
      { month: I18n.t("jun"), earnings: 0 },
      { month: I18n.t("july"), earnings: 0 },
      { month: I18n.t("aug"), earnings: 0 },
      { month: I18n.t("sep"), earnings: 0 },
      { month: I18n.t("oct"), earnings: 0 },
      { month: I18n.t("nov"), earnings: 0 },
      { month: I18n.t("dec"), earnings: 0 }
    ],
    xStandard: "month",
    yStandard: "earnings"
  };


  render() {
    const {
      style,
      hasAnimate,
      animDuration,
      chartStyle,
      barColor,
      valueTextFormat,
      labelStyle,
      valueTextStyle,
      barRatio,
      data,
      xStandard,
      yStandard
    } = this.props;


    return (
      <View style={[styles.container, style]}>
        <VictoryChart
          height={(data.length || 1) * (chartStyle.barHeight || 30)}
          width={chartStyle.width || Metrics.screenWidth - 70}
          domainPadding={chartStyle.domainPadding || 10}
          padding={
            chartStyle.padding || { top: 0, bottom: 0, left: 50, right: 50 }
          }
        >
          <VictoryBar
            horizontal
            animate={
              hasAnimate
                ? {
                    duration: animDuration,
                    onLoad: {
                      duration: animDuration
                    }
                  }
                : false
            }
            barRatio={barRatio}
            labels={valueTextFormat}
            labelComponent={<VictoryLabel style={{...valueTextStyle,flex:1}}/>}
            style={{
              labels: {...labelStyle,flex: 1},
              data: { fill: barColor }
            }}
            data={data}
            x={xStandard}
            y={yStandard}
          />
          <VictoryAxis
            dependentAxis
            crossAxis={false}
            style={{
              axis: { stroke: Colors.gainsboro }
            }}
          />
        </VictoryChart>
      </View>
    );
  }
}
