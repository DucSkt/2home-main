import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Fonts } from '../themes';
import ShowHideButton from './ShowHideButton';

class Input extends Component {
  static DefaultProps = {
    isPasswordField: false,
    clearOnSubmit: true
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showPassword: true
    };
  }

  create = () => {
    this.props.onEntry(this.state.text);
    this.setState({ text: '' });
  };

  onSubmit = ev => {
    this.props.onEntry(ev.nativeEvent.text);
    if(this.props.onSubmitEditing) this.props.onSubmitEditing();
    if (this.props.clearOnSubmit) {
      this.setState({ text: '' });
    }
  };

  onChange = text => {
    this.setState({ text });
    if (this.props.onChange) {
      this.props.onChange(text);
    }
  };

  toggleSwitch = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword
    });
  };

  onBlur = () => {
    if (this.state.text === '') this.props.onBlur();
  };

  renderShowHideButton = showPassword => (
    <ShowHideButton onPress={this.toggleSwitch} value={!showPassword} />
  );

  passwordField = () => {
    const { style, autoFocus } = this.props;
    const { text, showPassword } = this.state;
    const showHideButton =
      text === '' ? null : this.renderShowHideButton(showPassword);
    return (
      <View style={styles.passwordField}>
        <TextInput
          style={[
            styles.nameField,
            styles.wideButton,
            styles.haveSwitchInput,
            Fonts.normal,
            style
          ]}
          multiline={false}
          autoCorrect={false}
          onChangeText={this.onChange}
          onSubmitEditing={this.onSubmit}
          autoFocus={autoFocus}
          secureTextEntry={showPassword}
          onBlur={this.onBlur}
        />
        {showHideButton}
      </View>
    );
  };

  normalField = () => {
    const { style, autoFocus } = this.props;
    return (
      <TextInput
        style={[styles.nameField, styles.wideButton, Fonts.normal, style]}
        multiline={false}
        autoCorrect={false}
        onChangeText={this.onChange}
        onSubmitEditing={this.onSubmit}
        autoFocus={autoFocus}
        onBlur={this.onBlur}
      />
    );
  };

  render() {
    const content = this.props.isPasswordField
      ? this.passwordField()
      : this.normalField();
    return content;
  }
}

export default Input;

const styles = StyleSheet.create({
  nameField: {
    backgroundColor: 'transparent',
    color: 'white'
  },
  haveSwitchInput: {
    flex: 1
  },
  wideButton: {
    justifyContent: 'center'
  },
  passwordField: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
