import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { Colors, Fonts } from '../../../../themes';

const EnterField = ({ style, title, create, hasPasswordField, onBlur,onSubmitEditing }) => (
  <View style={[style, styles.container]}>
    <CreateFieldName
      title={title}
      textColor={Colors.lightGray}
      style={[styles.noneMargin]}
      textStyle={Fonts.style.small}
    />
    <Input
      onEntry={create}
      style={styles.textInput}
      onChange={text => {
        create(text);
      }}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
      autoFocus
      isPasswordField={hasPasswordField}
    />
  </View>
);

const CreateFieldName = ({ title, textColor, onPress, style, textStyle }) => (
  <Button
    onPress={onPress}
    bgColor="transparent"
    title={title}
    textColor={textColor}
    style={[style, styles.noneMargin]}
    textStyle={[styles.textTitleCreateFieldStyle, textStyle]}
  />
);

const styles = StyleSheet.create({
  container: {},
  noneMargin: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  textInput: {
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    fontSize: Fonts.size.input
  },
  textTitleCreateFieldStyle: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.base
  }
});

export { EnterField, CreateFieldName };
