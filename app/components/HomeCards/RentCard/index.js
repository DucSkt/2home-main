import React, { Component } from "react";
import PropTypes from "prop-types";
import { Divider } from "react-native-elements";

import { FlatList, Text, View } from "react-native";
import CustomCard from "../CustomCard";
import RentContent from "./RentContent";
import { Fonts, Colors } from "../../../themes";
import Constants from "../../../common/Constants";

export default class RentCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
  };

  static defaultProps = {
    title: "Rent",
    data: [],
  };

  renderRentCardItem = ({ item, index }) => {
    const {
      data,
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
    } = this.props;

    if (index < data.length - 1) {
      return (
        <View style={{ marginBottom: 10 }}>
          <RentContent
            date={item.period}
            overdue={item.overdueCount}
            totalCollected={item.current}
            totalDue={item.total}
            dateTextStyle={dateTextStyle}
            overdueInfoStyle={overdueInfoStyle}
            totalCollectedTextStyle={totalCollectedTextStyle}
            totalDueTextStyle={totalDueTextStyle}
            stackBarStyle={stackBarStyle}
            detailStackBarStyle={detailStackBarStyle}
            totalCollectedBarBackgroundColor={totalCollectedBarBackgroundColor}
            totalDueBarBackgroundColor={totalDueBarBackgroundColor}
            totalCollectedBarTextStyle={totalCollectedBarTextStyle}
            totalDueBarTextStyle={totalDueBarTextStyle}
            lang={lang}
          />
          <Divider
            style={{
              backgroundColor: Colors.divider,
              marginTop: 20,
              height: Constants.DividerHeight,
            }}
          />
        </View>
      );
    }

    return (
      <RentContent
        date={item.period}
        overdue={item.overdueCount}
        totalCollected={item.current}
        totalDue={item.total}
        dateTextStyle={dateTextStyle}
        overdueInfoStyle={overdueInfoStyle}
        totalCollectedTextStyle={totalCollectedTextStyle}
        totalDueTextStyle={totalDueTextStyle}
        stackBarStyle={stackBarStyle}
        detailStackBarStyle={detailStackBarStyle}
        totalCollectedBarBackgroundColor={totalCollectedBarBackgroundColor}
        totalDueBarBackgroundColor={totalDueBarBackgroundColor}
        totalCollectedBarTextStyle={totalCollectedBarTextStyle}
        totalDueBarTextStyle={totalDueBarTextStyle}
        lang={lang}
      />
    );
  };

  render() {
    const { data, title, titleStyle } = this.props;
    const renderFlatlist = data ? (
      <FlatList
        data={data}
        renderItem={this.renderRentCardItem}
        keyExtractor={item => item.period.toString()}
      />
    ) : null;

    return (
      <CustomCard
        title={title}
        titleStyle={[titleStyle]}
        dividerStyle={{
          backgroundColor: Colors.divider,
          height: Constants.DividerHeight + 0.2,
        }}
      >
        {renderFlatlist}
      </CustomCard>
    );
  }
}
