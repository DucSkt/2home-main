import React, { Component } from 'react';
import { Button } from 'react-native-elements';

const ButtonComp = ({
  style,
  title,
  onPress,
  bgColor,
  textColor,
  textStyle
}) => (
  <Button
    style={style}
    backgroundColor={bgColor}
    title={title}
    color={textColor}
    onPress={onPress}
    textStyle={textStyle}
  />
);

export default ButtonComp;
