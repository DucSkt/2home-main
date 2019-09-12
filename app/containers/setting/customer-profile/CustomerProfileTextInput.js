import React, { Component } from 'react';
import { View, Text } from 'react-native';
import I18n from '../../../localization';
import FloattingInput from '../../../components/floating-label-input';
import Color from '../../../themes/Colors';
import Styles from './Styles';

export default class CustomerProfileTextInput extends Component {
  render() {
    console.log('data', this.props.data);
    const { email, address, firstName, lastName, phone } = this.props.data;
    return (
      <View>
        <View style={Styles.textInput}>
          <FloattingInput
            autoCapitalize="none"
            Setting
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t('firstname')}
            editable={false}
            selectTextOnFocus={false}
            value={firstName}
          />
        </View>
        <View style={Styles.textInput}>
          <FloattingInput
            autoCapitalize="none"
            Setting
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t('lastname')}
            editable={false}
            selectTextOnFocus={false}
            value={lastName}
          />
        </View>
        <View style={Styles.textInput}>
          <FloattingInput
            autoCapitalize="none"
            Setting
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t('email')}
            editable={false}
            selectTextOnFocus={false}
            value={email}
          />
        </View>
        <View style={Styles.textInput}>
          <FloattingInput
            autoCapitalize="none"
            Setting
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t('wheredoyoulive')}
            editable={false}
            selectTextOnFocus={false}
            value={address}
          />
        </View>
        <View style={Styles.textInput}>
          <FloattingInput
            autoCapitalize="none"
            Setting
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t('yourphone')}
            editable={false}
            selectTextOnFocus={false}
            value={phone}
          />
        </View>
      </View>
    );
  }
}
