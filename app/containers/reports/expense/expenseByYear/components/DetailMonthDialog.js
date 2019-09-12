import React, { PureComponent } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import { Colors, Fonts } from '../../../../../themes';
import { HorizontalChartBar } from '../../../../../components/charts';
import CloseButton from '../../../../../components/close-button';
import { currencyTranslate } from '../../../../../common/currencyTranslate';
import I18n from '../../../../../localization';

export default class DetailMonthExpenseDialog extends PureComponent {
  cancelOnPress = () => {
    this.props.backScreen();
  };

  cashFlowChartConfig = data => {
    const convertData = data.map((element) => {
      const key = element.name.length > 10 ? element.name.substring(0, 9) + "..." : element.name
      return ({
        ...element,
        key
      })
    });

    console.log('DetailMonthExpenseDialog - data :', convertData);

    return {
      valueTextFormat: d => {
        if (d.amount <= 0) return '';
        return currencyTranslate(d.amount, this.props.lang, I18n.t('currency'));
      },
      chartStyle: {
        padding: {
          top: 0,
          bot: 0,
          left: 75,
          right: 75
        }
      },
      data: convertData,
      xStandard: 'key',
      yStandard: 'amount',
      barColor: Colors.red,
      valueTextStyle: {
        fill: Colors.lightGray,
      },
      labelStyle: {
        fontFamily: Fonts.type.base
      }
    };
  };

  render() {
    const { title, data, titleStyle, style } = this.props;
    const chartConfig = this.cashFlowChartConfig(data.data);
    return (
      <View style={[styles.container, style]}>
        <CloseButton style={styles.closeButton} onPress={this.cancelOnPress} />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Divider
          style={{
            backgroundColor: Colors.divider,
            marginBottom: 10
          }}
        />
        <ScrollView >
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
        </ScrollView>
        <View style={{ padding: 10 }} />
      </View>
    );
  }
}
