import React, { Component, PureComponent } from "react";

import { connect } from "react-redux";

import { View, Text, Platform, Image } from "react-native";

import BadgeNotification from "./BadgeNotification";

import { tintColorTab, styles } from "./Styles";
import { Fonts } from "../../themes";

class NotificationTabIcon extends PureComponent {
  render() {
    const { iconName, focused, titleLabel } = this.props;
    const color = focused
      ? tintColorTab.activeTintColor
      : tintColorTab.inactiveTintColor;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={iconName} style={[styles.icon, { tintColor: color }]} />
        <View
          style={{
            position: "absolute",
            top: 0,
            right: Platform.OS === "ios" ? 6 : 6
          }}
        >
          <BadgeNotification
            badgeNumber={this.props.number}
            focused={focused}
          />
        </View>

        <Text style={[{ color: color }, Fonts.style.tabLabel]}>
          {titleLabel}
        </Text>
      </View>
    );
  }
}

// badge Number state will be here
const mapStateToProps = state => {
  return ({
    number:state.NumberNotifcation.data === null? 0:state.NumberNotifcation.data
  });
}

export default connect(mapStateToProps)(NotificationTabIcon);
