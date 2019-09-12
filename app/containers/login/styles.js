import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../themes';

export default StyleSheet.create({
  container: {
    flexGrow: 1
  },
  opacityView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'space-between'
  },
  backgroundImage: {
    flex: 1
  },

  topView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginLogo: {
    width: 165,
    height: 165
  },

  bottomView: {
    margin: 10
  },
  loginField: {
    borderColor: Colors.inActiveSubtitle,
    borderBottomWidth: 0.8,
    marginBottom: 20
  },
  warningText: {
    color: Colors.error,
    alignSelf: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input
  },
  confirmField: {
    margin: 10
  },
  loginButton: {
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 30
  },
  loginBack: {
    backgroundColor:Colors.transparent,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 30
  },
  forgotPasswordTextStyle:{
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    textDecorationLine: 'underline'
  },
  forgetPasswordButton:{
  },
  forgetPasswordField:{
   justifyContent: 'center',
   alignItems: 'center'
  }
});
