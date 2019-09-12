/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { CheckBox } from 'react-native-elements';
import { changeLanguage } from '../../../actions';
import { Colors } from '../../../themes';

type Props = {};
export default class CheckLanguage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  render() {
    const { onItemPress, index } = this.props;
    return (
      <View style={styles.container}>
        <CheckBox
          containerStyle={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',
            borderColor:Colors.transparent
          }}
          checkedIcon="check-circle"
          uncheckedIcon="circle-o"
          checkedColor="orange"
          size={19}
          iconRight
          onPress={() => {
            onItemPress(index);
          }}
          checked={this.props.isChecked}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
