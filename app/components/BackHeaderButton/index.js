import React, { Component } from 'react'
import { Text, StyleSheet, View,Image } from 'react-native'
import { Images } from '../../themes';
import styles from './Styles'
export default class BackHeaderButton extends React.PureComponent {
    static defaultProps ={
        backIconSource:Images.left_arrow
    }
  render() {
    return (
        <View style={[styles.container,this.props.style]}>
          <Image source ={this.props.backIconSource} style ={this.props.imageStyle}/>  
        </View>
        
    )
  }
}

