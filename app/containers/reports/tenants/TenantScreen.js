import React, { Component } from 'react';
import { RefreshControl, ScrollView,AlertIOS, View } from 'react-native';

import { connect } from 'react-redux';
import styles from './styles';
import I18n from '../../../localization';
import {
  TotalPropertiesAndUnitsCard,
  RentCard,
  ContractCard
} from '../../../components/HomeCards';
import { Fonts, Colors } from '../../../themes';
import { fetchAPITenant } from '../../../actions';
import EmptyPlaceholder from '../../empty-placeholder/EmptyPlaceholder';
class TenantScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('tenantReport'),
    headerBackTitle: null
  });

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,data,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && !data
    if (condition1 || condition2){
      this.handleRefresh();
    }
  }

  tenantContractChartConfig = () => ({
    valueTextFormat: d => `${d.y}`,
    xStandard: 'x',
    yStandard: 'y',
    barColor: d => (d.x === I18n.t('exp') ? Colors.red : Colors.activeSubtitle),
    valueTextStyle: {
      fill: Colors.lightGray
    },
    chartStyle: {
      padding: {
        top: 0,
        bot: 0,
        left: 75,
        right: 75
      }
    }
  });

  handleRefresh = () => {

    this.props.fetchAPITenant(
      this.props.lang,
      data => {},
      error => {
        AlertIOS.alert('Error', error.message);
      }
    );
  };

  renderRefreshControl = () => (
    <RefreshControl
      refreshing={this.props.fetching}
      onRefresh={this.handleRefresh}
    />
  );

  renderWaitingScreen = () => {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      />
    )
;
  };

  renderSuccessfulFetchingScreen = data => {
    const tenantContractChartConfig = this.tenantContractChartConfig();

    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      >
        <TotalPropertiesAndUnitsCard
          title={I18n.t('totalTenantAndFultureTenants')}
          leftSubtitle={I18n.t('totalTenents')}
          leftSubtitleStyle={{
            fontFamily: Fonts.type.bold
          }}
          rightSubtitleStyle={{
            fontFamily: Fonts.type.bold
          }}
          rightSubtitle={I18n.t('fultureTenants')}
          leftContent={data.tenantCount}
          rightContent={data.futureTenantCount}
        />

        <ContractCard
          title={I18n.t('tenant\'sContract')}
          chartConfig={tenantContractChartConfig}
          data={data.contracts}
        />

        <RentCard data={data.payments} title={I18n.t('rent')} lang={this.props.lang} />
      </ScrollView>
    );
  };

  render() {
    const { error,data,isConnectedInternet } = this.props;
  
    if (!isConnectedInternet && !data){
      return (<EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />);
    }
    if (data) return this.renderSuccessfulFetchingScreen(data);
    return this.renderWaitingScreen();
  }
}

const mapStateToProps = state => {
  const { data, error, fetching } = state.TenantData;
  return {
    data,
    error,
    fetching,
    lang: state.Language,
    isConnectedInternet:state.InternetState.isConnectedInternet,
  };
};

export default connect(
  mapStateToProps,
  { fetchAPITenant }
)(TenantScreen);
