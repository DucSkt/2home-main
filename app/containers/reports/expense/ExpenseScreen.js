import React, { Component } from "react";
import { ScrollView, RefreshControl, Text, AlertIOS, View } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { log } from "../../../common/Logger";
import styles from "./styles";
import I18n from "../../../localization";
import { CardWithChartAndDetails } from "../../../components/ReportCards";
import { Colors } from "../../../themes";
import { fetchAPIExpense } from "../../../actions";
import { currencyTranslate } from "../../../common/currencyTranslate";
import EmptyPlaceholder from "../../empty-placeholder/EmptyPlaceholder";
class ExpenseScreen extends Component {
  static navigationOptions = () => ({
    tabBarLabel: I18n.t("expense"),
  });

  componentWillReceiveProps(nextProps) {
    const { isConnectedInternet, error, lang } = this.props;
    const condition1 = nextProps.lang !== lang;
    const condition2 =
      nextProps.isConnectedInternet && !isConnectedInternet && error;
    if (condition1 || condition2) {
      this.handleRefresh();
    }
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh = () => {
    this.props.fetchAPIExpense(
      this.props.lang,
      data => {},
      error => {
        AlertIOS.alert("Error ", error.message);
      },
    );
  };

  detailItemOnclick = item => {
    this.props.navigation.navigate("ExpenseByYear", {
      year: item[Object.keys(item)[0]],
    });
  };

  renderRefreshControl = () => (
    <RefreshControl
      refreshing={this.props.fetching}
      onRefresh={this.handleRefresh}
    />
  );

  // TODO: render error screen here!
  renderErrorScreen = () => <Text>Handling err</Text>;

  renderWaitingScreen = () => {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      />
    );
  };

  renderSuccessfulScreen = data => {
    log("before: " + JSON.stringify(data));
    const convertData = _.sortBy(data, [e => e.key]).map(e => {
      e.key = e.key.toString();
      return e;
    });
    log("after: " + JSON.stringify(convertData));

    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      >
        <CardWithChartAndDetails
          title={I18n.t("expenseCashflow")}
          cashData={convertData}
          chartConfig={{
            barColor: Colors.red,
            xStandard: "key",
            yStandard: "amount",
            valueTextFormat: d => {
              if (d.amount <= 0) return "";
              return currencyTranslate(
                d.amount,
                this.props.lang,
                I18n.t("currency"),
              );
            },
          }}
          detailItemConfig={{
            // itemTitleStyle={},
            // itemTitlePrefixesText="",
            itemTitleSuffixesText: ` ${I18n.t("expense")}: `,
            // itemContentStyle={},
            itemContentPrefixesText: "",
            // itemContentSuffixesText=""
            detailItemOnclick: this.detailItemOnclick,
            lang: "en",
            currency: "USD",
          }}
        />
      </ScrollView>
    );
  };

  render() {
    const { data, isConnectedInternet } = this.props;
    if (!isConnectedInternet && !data) {
      return <EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />;
    }
    if (data) return this.renderSuccessfulScreen(data);
    return this.renderWaitingScreen();
  }
}

const mapStateToProps = state => ({
  data: state.ExpenseData.data,
  error: state.ExpenseData.error,
  fetching: state.ExpenseData.fetching,
  lang: state.Language,
  isConnectedInternet: state.InternetState.isConnectedInternet,
});

export default connect(
  mapStateToProps,
  { fetchAPIExpense },
)(ExpenseScreen);
