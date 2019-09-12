import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Styles from "./Styles";
import PropTypes from 'prop-types';
export default class Button extends Component {
  static propTypes = {
    activeOpacity: PropTypes.number,
  };

  static defaultProps = {
    activeOpacity:0.8
  };
  render() {
    return (
      <TouchableOpacity
        style={[Styles.Button, this.props.style]}
        onPress={this.props.onPress}
        activeOpacity ={this.props.activeOpacity}
      >
        <View style={Styles.imageContainer}>
          <Image
            style={[Styles.image, this.props.imageStyle]}
            source={this.props.imageSource}
          />
        </View>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
