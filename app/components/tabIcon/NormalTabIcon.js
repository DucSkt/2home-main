import React, { PureComponent } from "react";
import { View, Image, Text } from "react-native";

import { tintColorTab, styles } from "./Styles";
import { Fonts } from "../../themes";

class NormalTabIcon extends PureComponent {
  render() {
    const { iconName, focused, titleLabel } = this.props;
    var color = focused
      ? tintColorTab.activeTintColor
      : tintColorTab.inactiveTintColor;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={iconName} style={[styles.icon, { tintColor: color }]} />
        <Text style={[{ color: color }, Fonts.style.tabLabel]}>
          {titleLabel}
        </Text>
      </View>
    );
  }
}

export default NormalTabIcon;
