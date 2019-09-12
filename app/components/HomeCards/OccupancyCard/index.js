import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import CustomCard from '../CustomCard';
import { Colors } from '../../../themes';
import styles from './styles';

export default class OccupancyCard extends Component {
  static propTypes = {
    tenantedValue: PropTypes.number,
    untenantedValue: PropTypes.number,
    processStyle: PropTypes.object
  };

  static defaultProps = {
    tenantedValue: 4,
    untenantedValue: 2,
    processStyle: {
      backgroundColor: Colors.inActiveSubtitle,
      width: 4,
      size: 150,
      tintColor: Colors.activeSubtitle,
      rotation: 180
    }
  };

  state = {
    watching: 'tenanted',
    occupancyProcessValue: 0
  };

  componentDidMount() {
    this.calOccupancyValue();
  }

  calOccupancyValue = () => {
    // cal percent value to set occupancyProcessValue
    const { watching } = this.state;
    const { tenantedValue, untenantedValue } = this.props;
    const totalValue = tenantedValue + untenantedValue;
    const percent =
      watching === 'tenanted'
        ? (tenantedValue / totalValue) * 100
        : (untenantedValue / totalValue) * 100;

    this.setState({
      occupancyProcessValue: Number(percent.toFixed(2)) || 0
    });
  };

  subTitleOnPress = side => {
    if (side === 'leftSubTitle') {
      this.setState({ watching: 'tenanted' }, () => this.calOccupancyValue());
    } else {
      this.setState({ watching: 'untenanted' }, () => this.calOccupancyValue());
    }
  };

  renderContent = (
    processStyle,
    occupancyProcessValue,
    leftSubTitleColor,
    rightSubTitleColor
  ) => {
    const {
      tenantedValue,
      untenantedValue,
      leftSubTitle,
      leftSubTitleStyle,
      rightSubTitle,
      rightSubTitleStyle
    } = this.props;

    return (
      <View>
        <View style={[styles.subTitle]}>
          <Text
            onPress={() => this.subTitleOnPress('leftSubTitle')}
            style={[
              styles.leftSubTitle,
              { color: leftSubTitleColor },
              leftSubTitleStyle
            ]}
          >
            {`${tenantedValue} ${leftSubTitle}`}
          </Text>

          <Text
            onPress={() => this.subTitleOnPress('rightSubTitle')}
            style={[
              styles.rightSubTitle,
              { color: rightSubTitleColor },
              rightSubTitleStyle
            ]}
          >
            {`${untenantedValue} ${rightSubTitle}`}
          </Text>
        </View>
        <View style={[styles.content]}>
          <AnimatedCircularProgress
            size={processStyle.size}
            width={processStyle.width}
            fill={occupancyProcessValue}
            tintColor={processStyle.tintColor}
            backgroundColor={processStyle.backgroundColor}
            rotation={processStyle.rotation}
          >
            {() => (
              <Text
                style={[styles.occupancyProcessStyle, processStyle.textStyle]}
              >{`${occupancyProcessValue}%`}</Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
  };

  render() {
    // Get all props and state
    const {
      style,
      title,
      tenantedValue,
      untenantedValue,
      leftSubTitle,
      leftSubTitleStyle,
      rightSubTitle,
      rightSubTitleStyle,
      processStyle
    } = this.props;

    const { watching, occupancyProcessValue } = this.state;
    // watching occupancy card tab change
    let leftSubTitleColor = Colors.inActiveSubtitle;
    let rightSubTitleColor = Colors.inActiveSubtitle;

    if (watching === 'tenanted') {
      leftSubTitleColor = Colors.activeSubtitle;
    } else {
      rightSubTitleColor = Colors.activeSubtitle;
    }

    let content = null;

    // Render content when tenantedValue or untenantedValue is number
    if (
      !Number.isNaN(Number(tenantedValue)) &&
      !Number.isNaN(Number(untenantedValue))
    )
      content = this.renderContent(
        processStyle,
        occupancyProcessValue,
        leftSubTitleColor,
        rightSubTitleColor
      );

    return (
      <CustomCard title={title} style={[styles.container, style]}>
        {content}
      </CustomCard>
    );
  }
}
