import React, { Component } from 'react';
import {
  ScrollView,
  RefreshControl,
  AlertIOS,
  View,
  Text,
  Button
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';
import { DialogComponent } from 'react-native-dialog-component';

import { CashFlowCard } from '../../../../components/HomeCards';
import { CardWithListItems } from '../../../../components/ReportCards';
import DetailMonthDialog from './components/DetailMonthDialog';
import { Colors } from '../../../../themes';
import {
  fetchAPIExpenseByYear,
  fetchExpenseMonthToDateById,
  fetchExpenseYearToDateById,
  refreshExpenseMonthToDateData,
  refreshExpenseYearToDateData
} from '../../../../actions';
import styles from './styles';
import I18n from '../../../../localization';
import { currencyTranslate } from '../../../../common/currencyTranslate';

class ExpenseByYearScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.year} ${I18n.t('expense')}`
  });

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang !== this.props.lang) {
      this.handleRefresh();
    }
  }

  handleRefresh = () => {
    const {
      fetchAPIExpenseByYear,
      refreshExpenseMonthToDateData,
      refreshExpenseYearToDateData,
      navigation
    } = this.props;
    const { year } = navigation.state.params;


    fetchAPIExpenseByYear(
      year,
      this.props.lang,
      data => {

      },
      error => {

        AlertIOS.alert('Error ', error.message)
      });
    refreshExpenseMonthToDateData();
    refreshExpenseYearToDateData();
  };

  // config display detail chart when click month or year to date item
  cashFlowChartConfig = data => {
    let convertData = Array.from(data);
    moment.locale(this.props.lang)
    if (typeof data[0].key === 'number') {
      convertData = _.sortBy(data, [e => e.key])
        .map(e => {
          e.key = moment(new Date(2018, e.key - 1, 1)).format('MMM');
          return e;
        })
        .reverse();
    } else {
      convertData = convertData.reverse();
    }
    return {
      valueTextFormat: d => {
        if (d.amount <= 0) return '';
        return currencyTranslate(d.amount, "en", 'USD');
      },
      data: convertData,
      xStandard: 'key',
      yStandard: 'amount',
      barColor: Colors.red,
      valueTextStyle: {
        fill: Colors.lightGray
      }
    };
  };

  // config summary expense by year card
  expenseSummaryChartConfig = data => {
    console.log('expenseSummaryChartConfig - dataa :',data);
    let convertData = data.map((element,index) => {
      const key = element.name.length>10?element.name.substring(0,9)+"...":element.name
      return ({
      ...element,
      key
    });
  })

    return {
      valueTextFormat: d => {
        if (d.amount <= 0) return '';
        return currencyTranslate(d.amount, this.props.lang, I18n.t('currency'));
      },
      chartStyle: {
        padding: {
          top: 0,
          bot: 0,
          left: 75,
          right: 75
        },
      },
      data: convertData,
      xStandard: 'key',
      yStandard: 'amount',
      barColor: Colors.red,
      valueTextStyle: {
        fill: Colors.lightGray
      }
    };
  };

  // stack config for properties list item of month to date and year to date
  stackConfig = () => ({
    leftStackBackgroundColor: Colors.red
  });

  handleMonthToDateOnPressItem = id => {
    const {
      fetchExpenseMonthToDateById,
      navigation,
      monthToDateDetailData
    } = this.props;

    fetchExpenseMonthToDateById(
      id,
      this.props.lang,
      (idSelect, data) => this.showDetailPopup(id, 'month'),
      error => AlertIOS.alert('Error ', error.message)
    );

    if (monthToDateDetailData.data) {
      const filterSelectedData = monthToDateDetailData.data.filter(
        e => e.id === id
      );

      if (filterSelectedData.length < 1) {
        navigation.navigate({
          routeName: 'overlay',
          params: {
            content: () => this.renderDetailItemWaitingDialog()
          }
        });
      } else {
        this.showDetailPopup(id, 'month');
      }
    } else {
      this.renderDetailItemWaitingDialog();
    }
  };

  handleYearToDateOnPressItem = id => {
    const {
      fetchExpenseYearToDateById,
      navigation,
      yearToDateDetailData
    } = this.props;

    fetchExpenseYearToDateById(
      id,
      this.props.lang,
      (idSelect, data) => this.showDetailPopup(id, 'year'),
      error => AlertIOS.alert('Error ', error.message)
    );

    if (yearToDateDetailData.data) {
      const filterSelectedData = yearToDateDetailData.data.filter(
        e => e.id === id
      );

      if (filterSelectedData.length < 1) {
        navigation.navigate({
          routeName: 'overlay',
          params: {
            content: () => this.renderDetailItemWaitingDialog()
          }
        });
      } else {
        this.showDetailPopup(id, 'year');
      }
    } else {
      this.renderDetailItemWaitingDialog();
    }
  };

  backScreen = () => {
    this.props.navigation.goBack(null);
  };

  showDetailPopup(id, type) {
    const {
      navigation,
      monthToDateDetailData,
      yearToDateDetailData,
      data
    } = this.props;

    let title = '';
    if (type === 'month') {
      const findResult = data.monthToDate.properties.filter(e => e.id === id);
      if (findResult.length > 0)
        title = `${findResult[0].name} ${I18n.t('\'sMonthExpense')}`;

      if (monthToDateDetailData.data) {
        const data = monthToDateDetailData.data.filter(e => e.id === id);
        navigation.navigate({
          routeName: 'overlay',
          params: {
            content: () => this.renderDetailItemDialog(data, title)
          }
        });
      }
    } else {
      const findResult = data.yearToDate.properties.filter(e => e.id === id);
      if (findResult.length > 0)
        title = `${findResult[0].name} ${I18n.t('\'sYearExpense')}`;

      if (yearToDateDetailData.data) {
        const data = yearToDateDetailData.data.filter(e => e.id === id);
        navigation.navigate({
          routeName: 'overlay',
          params: {
            content: () => this.renderDetailItemDialog(data, title)
          }
        });
      }
    }
  }

  renderDetailItemWaitingDialog = () => (
    <ScrollView
      style={styles.waitingDialog}
      refreshControl={this.renderRefreshControl()}
    />
  );

  renderDetailItemDialog(data, title) {
    return (
      <DetailMonthDialog
        backScreen={this.backScreen}
        data={data[0]}
        title={title}
        lang={this.props.lang}
      />
    );
  }

  renderRefreshControl = () => (
    <RefreshControl
      refreshing={this.props.fetching}
      onRefresh={this.handleRefresh}
    />
  );

  renderSuccessFulScreen = data => {
    const cashFlowChartConfig = this.cashFlowChartConfig(data.cashFlow);
    const stackConfig = this.stackConfig();
    const expenseSummaryChartConfig = this.expenseSummaryChartConfig(
      data.expenseDetails
    );
    
    const isSameYear = this.props.navigation.state.params.year === (new Date()).getFullYear().toString()


    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      >
        <CashFlowCard
          title={I18n.t('cashFlow')}
          chartConfig={cashFlowChartConfig}
          titleStyle={{ margin: 10 }}
          style={{ padding: 0 }}
          dividerStyle={{
            backgroundColor: Colors.divider
          }}
        />

        <CashFlowCard
          title={`${this.props.navigation.state.params.year} ${I18n.t(
            '\'sExpense'
          )}`}
          chartConfig={expenseSummaryChartConfig}
          titleStyle={{ margin: 10 }}
          style={{ padding: 0 }}
          dividerStyle={{
            backgroundColor: Colors.divider
          }}
        />

        {isSameYear ?
          <CardWithListItems
            title={I18n.t('monthToDate')}
            style={{
              padding: 0
            }}
            dateCollapseIcon={
              <Icon name="chevron-up" type="entypo" color={Colors.gray} />
            }
            dateExpandIcon={
              <Icon name="chevron-down" type="entypo" color={Colors.gray} />
            }
            detailIcon={
              <Icon name="plus-circle" type="feather" color={Colors.gray} />
            }
            date={data.monthToDate.period}
            dateLeftValue={data.monthToDate.current}
            dateRightValue={data.monthToDate.total}
            data={data.monthToDate.properties}
            stackStyleConfig={stackConfig}
            itemOnPress={this.handleMonthToDateOnPressItem}
            lang={this.props.lang}
          /> : null}

        {isSameYear ?
          <CardWithListItems
            title={I18n.t('yearToDate')}
            style={{
              padding: 0
            }}
            dateCollapseIcon={
              <Icon name="chevron-up" type="entypo" color={Colors.gray} />
            }
            dateExpandIcon={
              <Icon name="chevron-down" type="entypo" color={Colors.gray} />
            }
            detailIcon={
              <Icon name="plus-circle" type="feather" color={Colors.gray} />
            }
            date={data.yearToDate.period}
            dateLeftValue={data.yearToDate.current}
            dateRightValue={data.yearToDate.total}
            data={data.yearToDate.properties}
            stackStyleConfig={stackConfig}
            itemOnPress={this.handleYearToDateOnPressItem}
            lang={this.props.lang}
          />
          : null}

        <DialogComponent
          ref={dialogComponent => {
            this.dialogComponent = dialogComponent;
          }}
        >
          <View>
            <Text>Hello</Text>
          </View>
        </DialogComponent>
      </ScrollView>
    );
  };

  renderWaitingScreen = () => {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.renderRefreshControl()}
      />
    );
  };

  render() {
    const { data } = this.props;

    if (data) return this.renderSuccessFulScreen(data);
    return this.renderWaitingScreen();
  }
}

const mapStateToProps = state => {
  const { data, error, fetching } = state.ExpenseByYearData;
  return {
    data,
    error,
    fetching,
    monthToDateDetailData: state.ExpenseMonthToDateData,
    yearToDateDetailData: state.ExpenseYearToDateData,
    lang: state.Language
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAPIExpenseByYear,
    fetchExpenseMonthToDateById,
    fetchExpenseYearToDateById,
    refreshExpenseMonthToDateData,
    refreshExpenseYearToDateData
  }
)(ExpenseByYearScreen);
