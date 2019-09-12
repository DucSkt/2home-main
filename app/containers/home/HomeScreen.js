import React, { Component } from "react";
import {
  ScrollView,
  RefreshControl,
  Text,
  AlertIOS,
  View,
  NetInfo,
  AsyncStorage,
  AppState,
} from "react-native";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";
import _ from "lodash";
import styles from "./styles";
import { Colors, Fonts } from "../../themes";
import {
  OccupancyCard,
  RentCard,
  TotalPropertiesAndUnitsCard,
  CashFlowCard,
  ContractCard,
} from "../../components/HomeCards";

import I18n from "../../localization";
import {
  fetchAPIDashboard,
  changeConnectInternet,
  fetchGetNumberNotificationRequest,
  fetchAPICustomerProfile,
} from "../../actions";
import Constants from "../../common/Constants";
import { currencyTranslate } from "../../common/currencyTranslate";
import EmptyPlaceholder from "../empty-placeholder/EmptyPlaceholder";
import { refreshToken, logout } from "../../actions/AuthenticationAction";
import PushNotification from "react-native-push-notification";
import { PushNotificationIOS } from 'react-native';
import { registerDevice } from "../../actions/RegisterDeviceAction";
import DeviceInfo from "react-native-device-info";
import { log } from "../../common/Logger";
class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <Text style={Fonts.style.headerTitle}>{I18n.t("home")}</Text>
    ),
    headerBackTitle: null,
  });

  state = {
    appState: AppState.currentState,
  };
  async componentWillMount() {
    await this._handleRefreshToken(true);
  }

  _handleRefreshToken = async isFetchingDashboard => {
    await this.props.refreshToken(
      async data => {
        if (isFetchingDashboard) {
          await this.handleRefresh();
        }

        this.props.fetchGetNumberNotificationRequest(
          number => {
            console.log("number notification: ", number);
          },
          error => {},
        );
      },
      error => {
        this.props.logout(
          _ => {
            this.props.navigation.navigate("LoginNavigator");
          },
          error => {
            this.props.navigation.navigate("LoginNavigator");
          },
        );
      },
    );
  };

  _handleAppStateChange = async nextAppState => {
    console.log("_handleAppStateChange!");
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      this._handleRefreshToken(false);
    }
    this.setState({ appState: nextAppState });
  };

  async componentDidMount() {
    await AppState.addEventListener("change", this._handleAppStateChange);
    await NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange,
    );
    this.handleNotification();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { isConnectedInternet, lang, data } = this.props;
    const condition1 = nextProps.lang !== lang;
    const condition2 =
      nextProps.isConnectedInternet && !isConnectedInternet && !data;
    if (condition1 || condition2) {
      this.handleRefresh();
    }
  }
  handleConnectivityChange = isConnected => {
    console.log("handleConnectivityChange: ", isConnected);
    this.props.changeConnectInternet(isConnected);
  };

  cashFlowChartConfig = data => {
    // Rename month correct format and sort data
    let convertData = Array.from(data);
    moment.locale(this.props.lang);
    if (typeof data[0].key === "number") {
      convertData = _.sortBy(data, [e => e.key])
        .map(e => {
          const date = moment(new Date(2018, e.key - 1, 1));
          e.key = date.format("MMM");
          return e;
        })
        .reverse();
    } else {
      convertData = convertData.reverse();
    }

    return {
      valueTextFormat: d => {
        if (d.amount <= 0) return "";
        return currencyTranslate(d.amount, "en", "USD");
      },
      data: convertData,
      xStandard: "key",
      yStandard: "amount",
      barColor: Colors.activeSubtitle,
      valueTextStyle: {
        fill: Colors.lightGray,
        fontSize: Fonts.size.input,
      },
    };
  };

  tenantContractChartConfig = () => ({
    valueTextFormat: d => `${d.y}`,
    xStandard: "x",
    yStandard: "y",
    barColor: d => (d.x === I18n.t("exp") ? Colors.red : Colors.activeSubtitle),
    valueTextStyle: {
      fill: Colors.lightGray,
      fontSize: Fonts.size.input,
    },
    labelStyle: {
      fontSize: Fonts.size.h1,
    },
    chartStyle: {
      padding: {
        top: 0,
        bot: 0,
        left: 75,
        right: 75,
      },
    },
  });

  handleRefresh = async () => {
    await this.props.fetchAPIDashboard(
      this.props.lang,
      data => {},
      error => {
        AlertIOS.alert("Error", error.message);
      },
    );
  };

  handleNotification = () => {
    var _this = this;
    PushNotification.configure({
      onRegister: function(dict) {
        // log(dict.token)
        console.log("token =" + dict.token);
        // _this.setState({ pushToken: dict.token });

        const uniqueId = DeviceInfo.getUniqueID();
        console.log("unique id = " + uniqueId);

        // log(uniqueId);
        // log(this.state.pushToken);
        //
        _this.props.registerDevice(uniqueId, dict.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      requestPermissions: true,
    });
  };

  renderRefreshControl = () => (
    <RefreshControl
      refreshing={this.props.fetching}
      onRefresh={this.handleRefresh}
    />
  );

  // TODO: render error screen here!
  renderErrorScreen = err => <Text>Handling err</Text>;

  renderWaitingScreen = () => {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      />
    );
  };

  renderSuccessfulFetchingScreen = data => {
    const cashFlowChartConfig = this.cashFlowChartConfig(data.cashFlow);
    const tenantContractChartConfig = this.tenantContractChartConfig();
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.props.fetching}
            onRefresh={this.handleRefresh}
          />
        }
      >
        <TotalPropertiesAndUnitsCard
          title={I18n.t("totalPropertiesAndUnits")}
          leftSubtitle={I18n.t("properties")}
          rightSubtitle={I18n.t("units")}
          leftContent={data.propCount}
          rightContent={data.occupancy.total}
        />

        <OccupancyCard
          title={I18n.t("occupancy")}
          leftSubTitle={I18n.t("occupied")}
          rightSubTitle={I18n.t("vacant")}
          processStyle={{
            backgroundColor: Colors.inActiveSubtitle,
            width: 4,
            size: 150,
            tintColor: Colors.activeSubtitle,
            textStyle: styles.OccupancyProcessTextStyle,
            rotation: 180,
          }}
          tenantedValue={data.occupancy.occupied}
          untenantedValue={data.occupancy.vacant}
        />

        <RentCard
          data={data.incomes}
          title={I18n.t("rent")}
          lang={this.props.lang}
        />

        <CashFlowCard
          title={I18n.t("cashFlow")}
          chartConfig={cashFlowChartConfig}
          dividerStyle={{
            height: Constants.DividerHeight + 0.3,
          }}
        />

        <ContractCard
          title={I18n.t("tenant'sContract")}
          chartConfig={tenantContractChartConfig}
          data={data.contracts}
        />
      </ScrollView>
    );
  };

  render() {
    const { data, isConnectedInternet, error } = this.props;
    if (!isConnectedInternet && !data) {
      return <EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />;
    }
    if (data) return this.renderSuccessfulFetchingScreen(data);
    return this.renderWaitingScreen();
  }
}

const mapStateToProps = state => ({
  data: state.DashBoardData.data,
  error: state.DashBoardData.error,
  fetching: state.DashBoardData.fetching,
  isConnectedInternet: state.InternetState.isConnectedInternet,
  lang: state.Language,
});

export default connect(
  mapStateToProps,
  {
    fetchAPIDashboard,
    logout,
    fetchAPICustomerProfile,
    changeConnectInternet,
    refreshToken,
    fetchGetNumberNotificationRequest,
    registerDevice,
  },
)(HomeScreen);
