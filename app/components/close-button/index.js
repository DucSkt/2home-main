import React, { Component, PureComponent } from "react";
import { View,TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Fonts, Colors, Images } from "../../themes";
import PropTypes from "prop-types";
export default class FloatingLabelIput extends PureComponent {

  static propTypes = {
    activeOpacity: PropTypes.number
  };
  static defaultProps = {
    closeIconSource: Images.close,
  };

  render() {
    const { onPress,closeIconSource, activeOpacity,style, ...props } = this.props;
    return (  
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <View style={[styles.container,style]}>
            <Image source={closeIconSource} style={styles.close} {...props}/>
          </View>
        </TouchableOpacity>
    );
  }
}
