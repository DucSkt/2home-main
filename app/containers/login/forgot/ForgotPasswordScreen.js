import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  ImageBackground,
  Image,
  Alert,
  Text
} from "react-native";
import { connect } from "react-redux";

import I18n from "../../../localization";

import styles from "./styles";
import Button from "../../../components/text-button/TextButton";
import {Fonts, Images, Colors } from "../../../themes";
import FloatingLabelInput from "../../../components/floating-label-input";
import CloseButton from "../../../components/close-button";
import Validate from '../../../common/Validate';

class ForgotPasswordScreen extends Component {
  state = {
    email: "",
    isFirstTime:true,
    isEmailError:false
  }

  handleTextChange = (email)=> {
    if (this.state.isFirstTime){
      this.setState({isFirstTime:false,email})
      return;
    }
    if ((this.state.email === '' || !Validate.isEmail(this.state.email))){
      this.setState({isEmailError:true,email})
    } else {
      this.setState({isEmailError:false,email})
    }
  }

  onErrorEmail = ()=>{
    let message = ''

    if (this.state.isFirstTime){
      return null
    }

    if (this.state.email === ''){
      message = I18n.t('forgotInputMessageEmpty')
      return <Text style={[styles.errorText,Fonts.style.small]}>{message}</Text>
    }

    if (!Validate.isEmail(this.state.email)) {
      message = I18n.t('forgotInputMessageError')
      return <Text style={[styles.errorText,Fonts.style.small]}>{message}</Text>
    }

    return null;
  }


  onSubmit (){
    Alert.alert('onSubmit')
  }
  onClose =()=>{
    this.props.navigation.goBack()
  }
  render() {
      let inputColor = this.state.isEmailError? Colors.red:Colors.lightGray

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <CloseButton onPress ={this.onClose}/>
          <View style={{ paddingLeft: 18,paddingRight: 18 }}>
            <Text style={[styles.title, Fonts.style.h4SemiBold]}>
              {I18n.t("forgotYourPassword")}
            </Text>
            <Text style={[styles.subtitle, Fonts.style.mediumBase]}>
              {I18n.t("forgotPasswordSubtitle")}
            </Text>
            <FloatingLabelInput
              autoCapitalize ='none'
              inputStyle = {{borderBottomColor:inputColor}}
              hintTinyColor = {inputColor}
              style ={[styles.emailInput]}
              label={I18n.t("emailAddress")}
              value={this.state.email}
              onChangeText={this.handleTextChange}
            />
            {this.onErrorEmail()}
            <Button style={[styles.button]} onPress ={this.onSubmit}>
              <Text style={[styles.textSubmit,Fonts.style.mediumBold]}>{I18n.t('sendResetLink')}</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(ForgotPasswordScreen);
