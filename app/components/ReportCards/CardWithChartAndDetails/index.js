import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { ListItem, Divider } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import _ from "lodash";
import styles from "./styles";
import CustomCard from "../../HomeCards/CustomCard";
import RowView from "../../RowView";
import { HorizontalChartBar } from "../../charts";
import { Colors, Fonts } from "../../../themes";
import Constants from "../../../common/Constants";
import { currencyTranslate } from "../../../common/currencyTranslate";

const cashFlowDefaultData = [
  { month: "Jan", earnings: 0 },
  { month: "Feb", earnings: 0 },
  { month: "Mar", earnings: 0 },
  { month: "Apr", earnings: 0 },
  { month: "May", earnings: 0 },
  { month: "Jun", earnings: 0 },
  { month: "July", earnings: 0 },
  { month: "Aug", earnings: 0 },
  { month: "Sep", earnings: 0 },
  { month: "Oct", earnings: 0 },
  { month: "Nov", earnings: 0 },
  { month: "Dec", earnings: 0 },
];

class CardWithChartAndDetails extends Component {
  static propTypes = {
    cashData: PropTypes.array,
    chartConfig: PropTypes.any,
    detailItemConfig: PropTypes.any,
  };

  static defaultProps = {
    cashData: cashFlowDefaultData,
    detailItemConfig: {
      detailItemOnclick: () => {},
    },
    chartConfig: {},
  };

  renderItem = item => {
    const { detailItemConfig } = this.props;
    return (
      <RowView>
        <Text
          style={[
            styles.itemTitleStyle,
            Fonts.style.normal,
            detailItemConfig.itemTitleStyle,
          ]}
        >
          {detailItemConfig.itemTitlePrefixesText} {item[Object.keys(item)[0]]}
          {detailItemConfig.itemTitleSuffixesText}
        </Text>
        <Text
          style={[
            styles.itemContentStyle,
            Fonts.style.normalBold,
            detailItemConfig.itemContentStyle,
          ]}
        >
          {detailItemConfig.itemContentPrefixesText}
          {currencyTranslate(
            item[Object.keys(item)[1]],
            detailItemConfig.lang,
            detailItemConfig.currency,
          )}
          {detailItemConfig.itemContentSuffixesText}
        </Text>
      </RowView>
    );
  };

  render() {
    const {
      title,
      style,
      cashData,
      chartConfig,
      detailItemConfig,
    } = this.props;
    if (!_.isArray(cashData) || _.isEmpty(cashData)) return null;
    return (
      <CustomCard
        title={title}
        titleStyle={{ margin: 10 }}
        style={[styles.container, style]}
      >
        <HorizontalChartBar
          data={cashData}
          xStandard={chartConfig.xStandard || "month"}
          yStandard={chartConfig.yStandard || "earnings"}
          barColor={chartConfig.barColor || Colors.activeSubtitle}
          style={chartConfig.style}
          hasAnimate={chartConfig.hasAnimate || false}
          animDuration={chartConfig.animDuration || 1000}
          barRatio={chartConfig.barRatio || 0.7}
          valueTextFormat={
            chartConfig.valueTextFormat ||
            (d => {
              if (d.earnings <= 0) return "";
              return `$${d.earnings}`;
            })
          }
          valueTextStyle={
            chartConfig.valueTextStyle || {
              fill: Colors.lightGray,
            }
          }
          labelStyle={chartConfig.labelStyle}
        />
        <Divider
          style={{
            backgroundColor: Colors.divider,
            height: Constants.DividerHeight,
          }}
        />
        {cashData
          .map(item => (
            <ListItem
              title={this.renderItem(item)}
              onPress={() => detailItemConfig.detailItemOnclick(item)}
              key={item[Object.keys(item)[0]]}
            />
          ))
          .reverse()}
      </CustomCard>
    );
  }
}

export default CardWithChartAndDetails;
