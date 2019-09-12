import React, { Component } from 'react';
import {
  Keyboard,
  Platform,
  View,
  ImageBackground,
  Image,
  Text,
  AlertIOS,
  Animated,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import I18n from '../../localization';
import Button from '../../components/Button';
import styles from './styles';
import { Images, Colors } from '../../themes';
import LoginField from '../login/components/LoginField';
import ButtonLogin from '../../components/button_login';
import { requireNewPassword } from '../../actions/AuthenticationAction';

const TOPVIEW_FLEX = 10;
const MINTOPVIEW_FLEX = 1;
const ANIM_DURATION = 100;

class ChangePassAtFirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      newPassword: '',
      confirmPassword: '',
      isKeyboardShowing: false,
      isShowingWarningText: false,
      warningTextMsg: '',
      isNewPasswordValid: false,
      isConfirmPasswordValid: false,
    };
    this.topViewFlex = new Animated.Value(TOPVIEW_FLEX);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.hasError === true) {
      this.props.navigation.goBack(null);
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: nextProps.userData.message
      });
    } else if (
      nextProps.userData.hasError === false &&
      nextProps.userData.authorization !== null
    ) {
      this.props.navigation.goBack(null);
      this.props.navigation.navigate('MainTabsNavigator');
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }

  keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(this.topViewFlex, {
        duration: ANIM_DURATION,
        toValue: MINTOPVIEW_FLEX
      })
    ]).start();
    this.setState({
      isKeyboardShowing: true
    });
  };

  keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.topViewFlex, {
        duration: 100,
        toValue: TOPVIEW_FLEX
      })
    ]).start();

    this.setState({
      isKeyboardShowing: false
    });
  };

  validateLogin = () => {
    // TODO: validate account

    Keyboard.dismiss();

    if (!this.state.isNewPasswordValid) {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidNewPassword')
      });
    } else if (!this.state.isConfirmPasswordValid) {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidNewConfirmPassword')
      });
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('passwordNotTheSame')
      });
    } else {
      const { navigation } = this.props;
      const cognitoUser = navigation.getParam('cognitoUser', null);
      const userAttr = navigation.getParam('userAttr', null);
      if (!cognitoUser && !userAttr) return;
      this.props.requireNewPassword(this.state.confirmPassword, cognitoUser, userAttr, data => {

      }, error => {
        AlertIOS.alert(I18n.t(error),error.message)
      });
      this.props.navigation.navigate({
        routeName: 'spinnerOverlay'
      });
    }
  };
  backToLoginScreen = () => {
    this.props.navigation.goBack(null);
  }
  warningText = () => {
    const { isShowingWarningText } = this.state;
    if (isShowingWarningText)
      return (
        <Text style={styles.warningText}>{this.state.warningTextMsg}</Text>
      );
    return null;
  };

  submitLogin = () => {
    this.validateLogin();
  }

  render() {
    const warningText = this.warningText();
    const marginTopWhenKeyboardPopUp = 20;
    return (

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        keyboardShouldPersistTaps='always'
      >

        <ImageBackground
          source={Images.loginBackground}
          style={styles.backgroundImage}
        >
          <View style={styles.opacityView}>
            <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }} />
            <Animated.View style={[styles.topView, { flex: this.topViewFlex }]}>
              <Image source={Images.loginLogo} style={[styles.loginLogo]} />
            </Animated.View>

            <Animated.View
              style={[
                styles.bottomView,
                {
                  flex: TOPVIEW_FLEX,
                  justifyContent: this.state.isKeyboardShowing
                    ? 'flex-start'
                    : 'flex-end',
                  marginTop: this.state.isKeyboardShowing
                    ? marginTopWhenKeyboardPopUp
                    : 0
                }
              ]}
            >
              <View style={styles.enterInfoField}>
                <LoginField
                  title={I18n.t('newpassword')}
                  style={styles.loginField}
                  create={this.onNewPassordChange.bind(this)}
                  hasPasswordField
                />
                <LoginField
                  title={I18n.t('confirmnewpassword')}
                  style={styles.loginField}
                  create={this.onConfirmPasswordChange.bind(this)}
                  onSubmitEditing={this.submitLogin}
                  hasPasswordField
                />
                {warningText}
              </View>

              <View style={styles.confirmField}>
                <ButtonLogin
                  onPress={this.validateLogin}
                  style={styles.loginButton}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: Colors.white
                    }}
                  >
                    {I18n.t('changepassword')}
                  </Text>
                </ButtonLogin>
                <Button
                    bgColor="transparent"
                    textColor={Colors.whiteSmoke}
                    title={I18n.t('back')}
                    style={{
                      alignSelf: 'center',
                    }}
                    onPress={this.backToLoginScreen}
                  />
              </View>
            </Animated.View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }

  onNewPassordChange(text) {
    if (text === '') {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        newPassword: '',
        isNewPasswordValid: false
      });
    } else if (text.replace(/ /g, '') === '') {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidNewPassword'),
        isNewPasswordValid: false
      });
    } else {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        newPassword: text,
        isNewPasswordValid: true
      });
    }
  }

  onConfirmPasswordChange(text) {
    if (text === '') {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        confirmPassword: '',
        isConfirmPasswordValid: false
      });
    } else if (text.replace(/ /g, '') === '') {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidNewConfirmPassword'),
        isConfirmPasswordValid: false
      });
    } else {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        confirmPassword: text,
        isConfirmPasswordValid: true
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    userData: state.User
  };
}

export default connect(
  mapStateToProps,
  { requireNewPassword }
)(ChangePassAtFirstScreen);

