import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';

import RowView from '../../RowView';
import styles from './styles';
import { Colors, Fonts } from '../../../themes';

class StackBar extends Component {
  static propTypes = {
    animDuration: PropTypes.number
  };

  static defaultProps = {
    animDuration: 0
  };

  constructor() {
    super();
    this.aniValue = new Animated.Value(0);
  }

  componentDidMount = () => {
    Animated.timing(this.aniValue, {
      toValue: 1,
      duration: this.props.animDuration
    }).start();
  };

  render() {
    const {
      style,
      stackStyle,
      leftStackStyle,
      rightStackStyle,
      leftStackValue,
      leftStackTextStyle,
      leftStackBackgroundColor,
      rightStackValue,
      leftText,
      rightText,
      rightStackTextStyle,
      rightStackBackgroundColor
    } = this.props;

    const stackLeftWidth = this.aniValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, leftStackValue]
    });

    return (
      <RowView style={[styles.container, style]}>
        <Animated.View
          style={[
            styles.detailStack,
            {
              flex: stackLeftWidth,
              backgroundColor: leftStackBackgroundColor || Colors.activeSubtitle
            },
            stackStyle,
            leftStackStyle
          ]}
        >
          <Text
            style={[
              { color: Colors.white },
              Fonts.style.small,
              leftStackTextStyle
            ]}
          >
            {leftText}
          </Text>
        </Animated.View>

        <View
          style={[
            styles.detailStack,
            {
              flex: rightStackValue,
              backgroundColor:
                rightStackBackgroundColor || Colors.inActiveSubtitle
            },
            stackStyle,
            rightStackStyle
          ]}
        >
          <Text
            style={[
              { color: Colors.white },
              Fonts.style.small,
              rightStackTextStyle
            ]}
          >
            {rightText}
          </Text>
        </View>
      </RowView>
    );
  }
}

export default StackBar;
