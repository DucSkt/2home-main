import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "./button_login";
import { Colors, Fonts } from "../themes";
import I18n from "../localization";

export default class ShowHideButton extends Component {
  static defaultProps = {
    value: true,
    onPress: () => {},
    hideValue: <Icon name="eye-slash" size={20} color={Colors.white} />,
    showValue: <Icon name="eye" size={20} color={Colors.white} />
  };

  render() {
    const title = this.props.value
      ? this.props.hideValue
      : this.props.showValue;
    return (
      <Button
        title={title}
        style={[styles.buttonStyle]}
        color={Colors.white}
        onPress={this.props.onPress}
      >
        {title}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "transparent"
  },
  textStyle: {
    fontSize: Fonts.size.small,
    color: Colors.whiteSmoke
  }
});
