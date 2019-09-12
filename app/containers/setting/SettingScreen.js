import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Button,
  AlertIOS,
  AsyncStorage
} from 'react-native';
import {logout, fetchAPICustomerProfile} from '../../actions'
import { connect } from 'react-redux';
import { DialogComponent } from 'react-native-dialog-component';
import { Avatar } from 'react-native-elements';
import I18n from '../../localization';
import Styles from './Styles';
import SettingItem from '../../components/setting-item/SettingItem';
import Images from '../../themes/Images';
import Colors from '../../themes/Colors';
import Constants from '../../common/Constants';
import { Fonts } from '../../themes';

class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <Text style={Fonts.style.headerTitle}>{I18n.t('account')}</Text>
    )
  });

  defaultHeightValue = Dimensions.get('window').height;

  constructor(props) {
    super(props);
    this.state = {
      rowHeight: new Animated.Value(this.defaultHeightValue)
    };
  }
  componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && error
    if (condition1 || condition2){
      this.handleRefresh()
    }
  }

  handleRefresh = ()=>{
    this.props.fetchAPICustomerProfile(data =>{

    }, error =>{

    })
  }
  customerOnPress = () => {
    this.props.navigation.navigate('CustomerProfile');
  };

  changePasswordOnPress = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  onPressChangeLanguage = () => {
    this.props.navigation.navigate('ChangeLanguage');
  };

  onPressNotification = () => {
    this.props.navigation.navigate('Notification');
  };

  onLogoutPress() {
    this.props.navigation.goBack(null);
    this.props.logout(_=>{
      this.props.navigation.navigate('LoginNavigator');
    },error =>{
      AlertIOS.alert(I18n.t("error",error))
    });
  }

  showLogoutPopup() {
    this.props.navigation.navigate({
      routeName: 'overlay',
      params: {
        content: () => this.renderLogoutDialog()
      }
    });
  }

  renderLogoutDialog() {
    return (
      <View style={Styles.logoutContainer}>
        <Text style={Styles.logoutText}>Do you want to logout?</Text>
        <View style={Styles.buttonsContainer}>
          <Button
            title="Cancel"
            color={Colors.black}
            titleStyle={Styles.confirmButton}
            onPress={() => this.props.navigation.goBack(null)}
          />
          <Button
            title="Confirm"
            color={Colors.orange}
            titleStyle={Styles.cancelButton}
            onPress={this.onLogoutPress.bind(this)}
          />
        </View>
      </View>
    );
  }
  componentDidMount(){
    this.handleRefresh()
  }
  render() {
    const {firstName='',lastName=''} = this.props.customerInfo
    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.viewUserName}>
            <Text style={Styles.textUserName}>{firstName} {lastName} </Text>
          </View>

          <SettingItem
            textLeft={I18n.t('customerprofile')}
            iconRight={Images.customer}
            onPress={this.customerOnPress}
          />
          <SettingItem
            textLeft={I18n.t('changepassword')}
            iconRight={Images.changepassword}
            onPress={this.changePasswordOnPress}
          />
          <SettingItem
            textLeft={I18n.t('language')}
            textRight={this.props.lang === 'en' ? 'English' : 'Vietnamese'}
            icon={false}
            onPress={this.onPressChangeLanguage}
          />
          <SettingItem
            textLeft={I18n.t('notification')}
            iconRight={Images.notificationwhite}
            onPress={this.onPressNotification}
          />
          <SettingItem
            textLeft={I18n.t('logout')}
            iconRight={Images.logout}
            onPress={this.showLogoutPopup.bind(this)}
          />
        </View>
        <DialogComponent
          ref={dialogComponent => {
            this.dialogComponent = dialogComponent;
          }}
        >
          <View>
            <Text>Hello</Text>
          </View>
        </DialogComponent>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.Language,
  customerInfo:state.CustomerProfile.data||{},
  error:state.CustomerProfile.error,
  isConnectedInternet:state.InternetState.isConnectedInternet,
});
const mapDispatchToProps = {
  logout,
  fetchAPICustomerProfile
};

export default connect(mapStateToProps,mapDispatchToProps)(SettingScreen);

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SettingScreen);
