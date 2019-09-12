import React, { Component } from 'react';
import { View, Text, AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../localization';
import Buttons from '../../../components/text-button/TextButton';
import Styles from './Styles';
import ExitButton from '../../../components/close-button';
import CustomerProfileTextInput from './CustomerProfileTextInput';
import { fetchAPICustomerProfile } from '../../../actions/setting/CustomerProfileAction';

class CustomerProfile extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  };

  exitPress = () => {
    this.props.navigation.goBack();
  };

  componentWillMount() {
    const { data } = this.props;
    if (data === null) this.handleRefresh(true);
    else {
      this.setState({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.phone
      });
    }
  }

  componentDidMount() {}

  handleRefresh = (isShowHUD = false) => {
    if (isShowHUD) {
      this.props.navigation.navigate({
        routeName: 'spinnerOverlay'
      });
    }
    this.props.fetchAPICustomerProfile(
      this.props.lang,
      data => {
        if (isShowHUD) {
          this.props.navigation.goBack(null);
        }
        this.setState({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone
        });
      },
      error => {
        if (isShowHUD) {
          this.props.navigation.goBack(null);
        }
        AlertIOS.alert('Error', error.message);
      }
    );
  };

  render() {
    console.log('data', this.props.data);
    return (
      <View style={Styles.container}>
        <ExitButton style={Styles.exitButton} onPress={this.exitPress} />
        <View style={Styles.userNameView}>
          <Text style={Styles.textUserName}>{I18n.t('customerprofile')}</Text>
        </View>
        <CustomerProfileTextInput data={this.state} />
        <Buttons style={Styles.button} onPress={this.exitPress}>
          <Text style={Styles.textInButton}>OK</Text>
        </Buttons>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.CustomerProfile.data,
  error: state.CustomerProfile.error,
  fetching: state.CustomerProfile.fetching,
  lang: state.Language
});

export default connect(
  mapStateToProps,
  { fetchAPICustomerProfile }
)(CustomerProfile);
