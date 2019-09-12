import React, { Component } from 'react';
import { View, Text, AlertIOS, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../localization';
import Buttons from '../../../components/text-button/TextButton';
import Styles from './Styles';
import ExitButton from '../../../components/close-button';
import ChangePasswordTextInput from './ChangePasswordTextInput';
import { changePassword } from '../../../actions/setting/ChangePasswordAction';
import FloattingInput from '../../../components/floating-label-input';
import Color from '../../../themes/Colors';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      error: false
    };
  }

  exitPress = () => {
    this.props.navigation.goBack();
  };

  saveChangePress = () => {

      if (this.state.newPassword !== this.state.confirmNewPassword) {
        this.setState({ error: true });
        Keyboard.dismiss();
      } else {
        
        this.setState({ error: false });
        this.props.changePassword(
          this.state.oldPassword,
          this.state.newPassword,
          data => {AlertIOS.alert(I18n.t('changePassSuccess')); },
          error => {
            AlertIOS.alert(I18n.t('Error'), error.message);
          }
        );
        Keyboard.dismiss();
      }

  };

  errorText = () => {
    if (this.props.error)
      return (
        <View style={Styles.viewError}>
          <Text style={Styles.textError}>{I18n.t('passworddonotmatch')}</Text>
        </View>
      );
  };

  render() {
    return (
      <View style={Styles.container}>
        <ExitButton style={Styles.exitButton} onPress={this.exitPress} />
        <View style={Styles.userNameView}>
          <Text style={Styles.textUserName}>{I18n.t('changepassword')}</Text>
        </View>

        <View>
          <View style={Styles.textInput}>
            <FloattingInput
              autoCapitalize="none"
              Setting
              inputStyleSetting={Color.orange}
              hintTinyColorSetting={Color.orange}
              selectionColor={Color.orange}
              label={I18n.t('currentpassword')}
              secureTextEntry
              onChangeText={text => {
                this.setState({ oldPassword: text });
              }}
            />
          </View>
          <View style={Styles.textInput}>
            <FloattingInput
              autoCapitalize="none"
              Setting
              inputStyleSetting={Color.orange}
              hintTinyColorSetting={Color.orange}
              selectionColor={Color.orange}
              label={I18n.t('newpassword')}
              secureTextEntry
              onChangeText={text => {
                this.setState({ newPassword: text });
              }}
            />
          </View>
          <View style={Styles.textInput}>
            <FloattingInput
              autoCapitalize="none"
              Setting
              inputStyleSetting={Color.orange}
              hintTinyColorSetting={Color.orange}
              selectionColor={Color.orange}
              label={I18n.t('confirmnewpassword')}
              secureTextEntry
              onChangeText={text => {
                this.setState({ confirmNewPassword: text });
              }}
            />
          </View>
          {this.errorText()}
        </View>

        <Buttons style={Styles.button} onPress={this.saveChangePress}>
          <Text style={Styles.textInButton}>{I18n.t('savechange')}</Text>
        </Buttons>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default (ChangePassword = connect(
  mapStateToProps,
  { changePassword }
)(ChangePassword));
