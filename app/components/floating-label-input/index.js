import React, { Component ,PureComponent} from 'react'
import { Text, StyleSheet, View,TextInput,Animated } from 'react-native'
import styles from './styles'
import { Fonts, Colors } from '../../themes';
import PropTypes from "prop-types";
export default class FloatingLabelIput extends PureComponent {
  static propTypes = {
    minimumHintSize:PropTypes.number,
    maximumHintSize:PropTypes.number,
    hintFont:PropTypes.string,
    hintColor:PropTypes.string,
    hintTinyColor:PropTypes.string,
    hintAnimDuration:PropTypes.number
  };
  static defaultProps={
    minimumHintSize: Fonts.size.small,
    maximumHintSize: Fonts.size.medium,
    hintFont:Fonts.type.base,
    hintColor:Colors.hintColor,
    hintTinyColor:Colors.black,
    hintAnimDuration:200
  }
   state = {
      isFocused: false,
      inputStyleSetting: '#555',
      labelStyleSetting: Colors.hintColor
    };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }
 
  handleFocus = () => {
    this.setState({ isFocused: true });
    if(this.props.Setting){
        this.setState({ 
          inputStyleSetting: this.props.inputStyleSetting,
          labelStyleSetting: this.props.hintTinyColorSetting
         })
    }
  }  
  handleBlur = () => {
    this.setState({ isFocused: false });
    if(this.props.Setting){
      this.setState({ 
        inputStyleSetting: '#555',
        labelStyleSetting: Colors.hintColor
       })
  }
  }
     
  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: this.props.hintAnimDuration,
    }).start();
  }

  render() {
    const { label,minimumHintSize,maximumHintSize, hintColor,hintTinyColor,style,inputStyle,Setting,
      inputStyleSetting,hintTinyColorSetting,selectionColor,
      ...props } = this.props;

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [17, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [maximumHintSize,minimumHintSize],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [hintColor, hintTinyColor],
      }),
    };
    const paddingTop = minimumHintSize+8
    return (
      <View style={[{paddingTop},style]}>
        <Animated.Text style={[labelStyle , {color: this.state.labelStyleSetting }]}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={[styles.inputStyle,{borderBottomColor:this.state.inputStyleSetting},inputStyle]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          selectionColor={selectionColor}
        />
      </View>
    );
  }
}