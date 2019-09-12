import React, { Component } from 'react';
import { Image } from 'react-native';
import { Images } from '../themes';

const ImageNoti = () => (
  <Image
    source={require('../images/checked.png')}
    style={{ width: 10, height: 10 }}
  />
);
export default ImageNoti;
