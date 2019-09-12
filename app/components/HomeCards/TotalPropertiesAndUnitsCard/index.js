import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import CustomCard from "../CustomCard";
import styles from "./styles";

class TotalPropertiesAndUnitsCard extends Component {
  static propsType = {
    leftContent: PropTypes.number,
    rightContent: PropTypes.number
  };

  render() {
    const {
      style,
      title,
      titleStyle,
      contentStyle,
      leftSubtitle,
      leftSubtitleStyle,
      rightSubtitle,
      rightSubtitleStyle,
      leftContent,
      leftContentStyle,
      rightContent,
      rightContentStyle
    } = this.props;

    return (
      <CustomCard
        title={title}
        titleStyle={[titleStyle]}
        style={[styles.container, style]}
      >
        <View style={[styles.content, contentStyle]}>
          <View style={[styles.left]}>
            <Text style={[styles.leftSubtitle, leftSubtitleStyle]}>
              {leftSubtitle}
            </Text>
            <Text style={[styles.leftContent, leftContentStyle]}>
              {leftContent}
            </Text>
          </View>

          <View style={styles.right}>
            <Text style={[styles.rightSubtitle, rightSubtitleStyle]}>
              {rightSubtitle}
            </Text>
            <Text style={[styles.rightContent, rightContentStyle]}>
              {rightContent}
            </Text>
          </View>
        </View>
      </CustomCard>
    );
  }
}

export default TotalPropertiesAndUnitsCard;
