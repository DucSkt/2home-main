import { createStackNavigator } from "react-navigation";
import LoginScreen from '../containers/login/LoginScreen'
import ForgotPasswordScreen from '../containers/login/forgot/ForgotPasswordScreen'
import ChangePassAtFirstScreen from '../containers/change-pass-at-first/ChangePassFirstTimeScreen'

const LoginNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  ForgotPasswordScreen: ForgotPasswordScreen,
  ChangePassAtFirstScreen:ChangePassAtFirstScreen,
},{
    headerMode:'none',
});


export default LoginNavigator;
