import React, { Component } from 'react';
import { View, Text ,Image ,TouchableOpacity, StyleSheet } from 'react-native';
import Styles from './Styles';
export default class SettingItem extends Component {

  static defaultProps={
    icon : true,
  }

  iconOrText=()=>{
    if(this.props.icon){
      return  <Image style={Styles.icon}  source={this.props.iconRight} />
    }
    else {
      return <Text style={Styles.text} >{this.props.textRight} </Text>
    }
  }

  render() {
    let iconViewStyle = this.props.icon ? {position: 'absolute',top: 11,bottom: 0,left: 0} : {position: 'absolute',top: 11,bottom: 0,right: 0};

    let iconView = StyleSheet.flatten(iconViewStyle);

    return (
      <View style={Styles.container } >
         <View style={Styles.underlined} ></View>
        <TouchableOpacity style={Styles.itemView}  onPress={this.props.onPress} >
          <Text style={Styles.textInItem} >
            {this.props.textLeft}
          </Text>
          <View style={iconView}>
                {this.iconOrText()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
