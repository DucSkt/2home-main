import React, { Component } from 'react';
import { View, Text } from 'react-native';
import I18n from "../../../localization";
import FloattingInput from '../../../components/floating-label-input';
import Color from '../../../themes/Colors';
import Styles from './Styles';
export default class ChangePasswordTextInput extends Component {

  state = {
    currentpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  }
  
  getNewPass = () => {
    this.props.getPassword(this.state.currentpassword , this.state.newpassword , this.state.confirmnewpassword)
  }

  errorText = () => {
    if(this.props.error)
    return <View style={Styles.viewError}>
    <Text style={Styles.textError}>{I18n.t("passworddonotmatch")}</Text>
  </View>
  }

  render() {
    return ( 
      <View>
         <View style={Styles.textInput} >
          <FloattingInput
            autoCapitalize='none'
            Setting={true}
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t("currentpassword")}
            value={this.state.currentpassword}
            onChangeText={(text) => {
              this.setState({ currentpassword: text })
            }}
          />
           </View>
        <View style={Styles.textInput} >
          <FloattingInput
            autoCapitalize='none'
            Setting={true}
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t("newpassword")}
            value={this.state.newpassword}
            onChangeText={(text) => {
              this.setState({ newpassword: text })
            }}
          />
        </View>
        <View style={Styles.textInput} >
          <FloattingInput
            autoCapitalize='none'
            Setting={true}
            inputStyleSetting={Color.orange}
            hintTinyColorSetting={Color.orange}
            selectionColor={Color.orange}
            label={I18n.t("confirmnewpassword")}
            value={this.state.confirmnewpassword}
            onChangeText={(text) => {
              this.setState({ confirmnewpassword: text })
            }}
          />
        </View> 
        {this.errorText()}
      </View>
    );
  }
}


