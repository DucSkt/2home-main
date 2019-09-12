import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-switch';
import Styles from './Styles';
import { Colors } from '../../../themes';
import ImageNoti from '../../../components/ImageNoti';
import ImageNotiX from '../../../components/ImageNotiX';

export default class CheckNotification extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: true };
  }

  render() {
    const { onItemPress, index } = this.props;
    console.log('index', index);
    return (
      <View style={Styles.checknotification}>
        <Switch
          onValueChange={value => {
            this.setState({ toggled: value });
            onItemPress(index);
          }}
          value={this.state.toggled}
          backgroundActive={Colors.orange}
          backgroundInactive="#EEEEEE"
          circleBorderWidth={0}
          circleSize={25}
          renderInsideCircle={() => {
            if (this.state.toggled === true) {
              return <ImageNoti />;
            }
            return <ImageNotiX />;
          }}
        />
      </View>
    );
  }
}
