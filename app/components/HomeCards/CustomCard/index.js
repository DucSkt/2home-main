import React from 'react';
import { Card } from 'react-native-elements';

import { Fonts, Colors } from '../../../themes';
import Constants from '../../../common/Constants';
import styles from './styles';

const CustomCard = ({
  style,
  dividerStyle,
  wrapperStyle,
  titleStyle,
  children,
  title
}) => (
  <Card
    title={title}
    titleStyle={[styles.titleStyle, Fonts.style.h6, titleStyle]}
    containerStyle={[styles.containerStyle,style]}
    wrapperStyle={[styles.wrapperStyle,wrapperStyle]}
    dividerStyle={[
      { backgroundColor: Colors.divider, height: Constants.DividerHeight },
      dividerStyle
    ]}
  >
    {children}
  </Card>
);

export default CustomCard;
