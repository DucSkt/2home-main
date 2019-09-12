import React, { Component } from 'react';
import { View, AsyncStorage ,NetInfo} from 'react-native';

import { connect } from 'react-redux';
import Constants from '../../common/Constants';
import { changeLanguage,changeConnectInternet } from '../../actions';


class AppLoading extends Component {
  async componentWillMount() {
    this.loadLanguage();
  }

  async loadLanguage() {
    try {
      const lang = await AsyncStorage.getItem(Constants.Language);
      if (lang === null || lang === undefined) {
        this.props.changeLanguage(Constants.defaultLanguage);
      } else {
        this.props.changeLanguage(lang);
      }
    } catch (error) {
      this.props.changeLanguage(Constants.defaultLanguage);
    } finally {
      const tokenUser = await AsyncStorage.getItem(Constants.AuthorizationKey);
      if (tokenUser){
        this.props.navigation.navigate('MainTabsNavigator');
      } else {
        this.props.navigation.navigate('LoginNavigator');
      }
    }
  }

  render() {
    return <View style={{ flex: 1 }} />;
  }
}
const mapStateToProps = state => ({lang:state.Language});
export default connect(
  mapStateToProps,
  {changeLanguage,changeConnectInternet }
)(AppLoading);
