import React, { Component } from 'react';
import {
  Keyboard,
  Platform,
  View,
  ImageBackground,
  Image,
  Text,
  Animated,
  LayoutAnimation,
  UIManager,
  AlertIOS,
  AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import I18n from '../../localization';

import styles from './styles';
import { Images, Colors, Fonts } from '../../themes';
import LoginField from './components/LoginField';
import Button from '../../components/Button';
import ButtonLogin from '../../components/button_login';

// import UserAPI from '../../services/UserAPI';
import Validate from '../../common/Validate';
import { login } from '../../actions/AuthenticationAction';

import { log } from '../../common/Logger';


const TOPVIEW_FLEX = 10;
const MINTOPVIEW_FLEX = 1;
const ANIM_DURATION = 100;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushToken: '1234567890',
      text: '',
      username: '',
      password: '',
      isKeyboardShowing: false,
      isShowingWarningText: false,
      warningTextMsg: '',
      isUsernameValid: false,
      isPasswordValid: false,
      isSpinnerAnimating: true
    };
    this.topViewFlex = new Animated.Value(TOPVIEW_FLEX);
  }

  // componentWillMount() {
  //   // const response = UserAPI.login(this.state.username, this.state.password);
  //   // response.then(token => {
  //   //   console.log(token);
  //   // });
  // }

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
      // console.log(this.state.pushToken);
      

      this.props.navigation.navigate('MainTabsNavigator');
    }
  }

  componentDidMount() {

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

  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPasswordScreen');
  };

  validateLogin = () => {
    // TODO: validate account
    Keyboard.dismiss();
    if (!this.state.isUsernameValid) {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidEmail')
      });
    } else if (!this.state.isPasswordValid) {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidPassword')
      });
    } else {
      this.props.login(this.state.username, this.state.password, (cognitoUser, userAttr) => {
        this.props.navigation.goBack(null);
        const okText = I18n.t('ok')
        AlertIOS.alert(
          "",
          I18n.t('firstTimeLogin'),
          [
            { text: okText, onPress: () => { this.onMoveToConfirmPass(cognitoUser, userAttr) } },
          ]
        )
      });
      this.props.navigation.navigate({
        routeName: 'spinnerOverlay'
      });
    }
  };
  onMoveToConfirmPass = (cognitoUser, userAttr) => {
    this.props.navigation.navigate('ChangePassAtFirstScreen', { cognitoUser, userAttr })
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
                  title={I18n.t('userName')}
                  style={styles.loginField}
                  create={this.onEmailChange.bind(this)}
                />
                <LoginField
                  title={I18n.t('password')}
                  style={styles.loginField}
                  create={this.onPasswordChange.bind(this)}
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
                    {I18n.t('signIn')}
                  </Text>
                </ButtonLogin>

                <View style={[styles.forgetPasswordField]}>
                  <Button
                    bgColor="transparent"
                    textColor={Colors.whiteSmoke}
                    title={I18n.t('forgotYourPassword')}
                    style={[styles.forgetPasswordButton]}
                    onPress={this.forgotPassword}
                    textStyle={[styles.forgotPasswordTextStyle]}
                  />
                </View>
              </View>
            </Animated.View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }

  onEmailChange(text) {
    if (text === '') {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        username: '',
        isUsernameValid: false
      });
    } else if (text.replace(/ /g, '') === '') {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidUsername'),
        isUsernameValid: false
      });
    } else {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        username: text,
        isUsernameValid: true
      });
    }
  }

  onPasswordChange(text) {
    if (text === '') {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        password: '',
        isPasswordValid: false
      });
    } else if (text.replace(/ /g, '') === '') {
      this.setState({
        isShowingWarningText: true,
        warningTextMsg: I18n.t('invalidPassword'),
        isPasswordValid: false
      });
    } else {
      this.setState({
        isShowingWarningText: false,
        warningTextMsg: '',
        password: text,
        isPasswordValid: true
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
  { login }
)(LoginScreen);
