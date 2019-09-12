import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import I18n from "../../../../localization";
import { Colors, Fonts, Metrics } from "../../../../themes";
import StackBar from "../../../../components/charts/StackBar";
import { CustomCard } from "../../../../components/HomeCards";

class OccupancyCard extends Component {
  static propTypes = {
    leftValue : PropTypes.number,
    rightValue : PropTypes.number
  };

  static defaultProps={
    leftValue : 0,
    rightValue: 0
  }
  render() {
    let {leftValue, rightValue} = this.props
    const leftLabel = `${leftValue} ${I18n.t('tenanted')}`
    const rightLabel = `${rightValue} ${I18n.t('untenanted')}`
    return (
      <CustomCard   
        title={I18n.t("occupancy")} 
        titleStyle ={styles.title}
        style = {styles.container}
        >
        <View style={styles.containerInfo}>
          <Text style={[styles.leftLabel,Fonts.style.smallSemiBold]}>{leftLabel}</Text>
          <Text style={[styles.rightLabel,Fonts.style.smallSemiBold]}>{rightLabel}</Text>
        </View>
        <StackBar
          leftStackValue={leftValue}
          rightStackValue={rightValue}
          stackStyle={{padding:0}}
          style={styles.stackBar}
        />
      </CustomCard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:Metrics.screenWidth -32,
   },
  title: {
    color: Colors.black,
    marginBottom:8
  },
  divider:{
    marginBottom:8
  },
  leftLabel:{
    color:Colors.activeSubtitle
  },
  rightLabel:{
    color:Colors.steel
  },
  containerInfo:{
    paddingLeft:6,
    paddingRight:6,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  stackBar:{
    height:20
  }
});

export default OccupancyCard;
