import React, { Component } from 'react';
import { Text } from 'react-native';

import { HorizontalChartBar } from '../../charts';
import CustomCard from '../CustomCard';

export default class CashFlowCard extends Component {
  static defaultProps = {
    chartConfig: {}
  };

  renderChart = chartConfig => (
    <HorizontalChartBar
      style={chartConfig.style}
      hasAnimate={chartConfig.hasAnimate}
      animDuration={chartConfig.animDuration}
      chartStyle={chartConfig.chartStyle}
      barColor={chartConfig.barColor}
      valueTextFormat={chartConfig.valueTextFormat}
      labelStyle={chartConfig.labelStyle}
      valueTextStyle={chartConfig.valueTextStyle}
      barRatio={chartConfig.barRatio}
      data={chartConfig.data}
      xStandard={chartConfig.xStandard}
      yStandard={chartConfig.yStandard}
    />
  );

  renderErrorChart = () => null;

  render() {
    const { title, style, chartConfig, titleStyle, dividerStyle } = this.props;
    const checkData = chartConfig.data
      ? [...new Set(chartConfig.data.map(i => i.key))]
      : null;
    const chart =
      checkData.length <=0
        ? this.renderErrorChart()
        : this.renderChart(chartConfig);
    return (
      <CustomCard
        title={title}
        style={style}
        titleStyle={titleStyle}
        dividerStyle={dividerStyle}
      >
        {chart}
      </CustomCard>
    );
  }
}
