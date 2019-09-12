import React, { Component } from 'react';
import { Text, ScrollView, RefreshControl, AlertIOS, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';
import { DialogComponent } from 'react-native-dialog-component';

import { CashFlowCard } from '../../../../components/HomeCards';
import { CardWithListItems } from '../../../../components/ReportCards';
import { Colors } from '../../../../themes';
import styles from './styles';
import I18n from '../../../../localization';
import {
  fetchAPIIncomeByYear,
  fetchIncomeMonthToDateById,
  fetchIncomeYearToDateById,
  refreshIncomeMonthToDateData,
  refreshIncomeYearToDateData
} from '../../../../actions';
import DetailDialog from './components/DetailDialog';
import { currencyTranslate } from '../../../../common/currencyTranslate';

class IncomeByYearScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.year} ${I18n.t('income')}`
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
    const { fetchAPIIncomeByYear, navigation } = this.props;
    const { year } = navigation.state.params;


    fetchAPIIncomeByYear(
      year,
      this.props.lang,
      data => {

      },
      error => {

        AlertIOS.alert('Error ', error.message)

      });

    refreshIncomeMonthToDateData();
    refreshIncomeYearToDateData();
  };

  // config display detail chart when click month or year to date item
  cashFlowChartConfig = data => {
    let convertData = Array.from(data);
    moment.locale(this.props.lang);
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
        return currencyTranslate(d.amount, 'en', 'USD');
      },
      data: convertData,
      xStandard: 'key',
      yStandard: 'amount',
      barColor: Colors.activeSubtitle,
      valueTextStyle: {
        fill: Colors.lightGray
      }
    };
  };

  // stack config for properties list item of month to date and year to date
  stackConfig = () => ({
    leftStackBackgroundColor: Colors.activeSubtitle
  });

  handleMonthToDateOnPressItem = id => {
    const { navigation, monthToDateDetailData } = this.props;

    this.props.fetchIncomeMonthToDateById(
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
      fetchIncomeYearToDateById,
      navigation,
      yearToDateDetailData
    } = this.props;

    fetchIncomeYearToDateById(
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
      // get title with name item click
      // const findResult = data.monthToDate.properties.filter(e => e.id === id);
      // if (findResult.length > 0)
      //   title = `${findResult[0].name}${I18n.t('\'sMonthIncome')}`;

      if (monthToDateDetailData.data) {
        const filterData = monthToDateDetailData.data.filter(e => e.id === id);
        if (filterData[0].data.period)
          title = `${filterData[0].data.period}${I18n.t('\'sIncome')}`;
        navigation.navigate({
          routeName: 'overlay',
          params: {
            content: () => this.renderDetailItemDialog(filterData, title)
          }
        });
      }
    } else {
      // const findResult = data.yearToDate.properties.filter(e => e.id === id);
      // if (findResult.length > 0)
      //   title = `${findResult[0].name}${I18n.t('\'sYearExpense')}`;
      title = '';
      if (yearToDateDetailData.data) {
        const filterData = yearToDateDetailData.data.filter(e => e.id === id);
        if (filterData[0].data.period)
          title = `${filterData[0].data.period}${I18n.t('\'sIncome')}`;
        navigation.navigate({
          routeName: 'overlay',
          params: {
            content: () => this.renderDetailItemDialog(filterData, title)
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

  renderDetailItemDialog = (data, title) => (
    <DetailDialog
      backScreen={this.backScreen}
      data={data[0]}
      title={title}
      lang={this.props.lang}
    />
  );

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
    );
  };

  renderSuccessFulScreen = data => {
    const cashFlowChartConfig = this.cashFlowChartConfig(data.cashFlow);
    const stackConfig = this.stackConfig();
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

        {isSameYear ? <CardWithListItems
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

        {isSameYear ? <CardWithListItems
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
        /> : null}

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

  render() {
    const { data } = this.props;
    if (data) return this.renderSuccessFulScreen(data);
    return this.renderWaitingScreen();
  }
}

const mapStateToProps = state => {
  const { data, error, fetching } = state.IncomeByYearData;
  return {
    data,
    error,
    fetching,
    monthToDateDetailData: state.IncomeMonthToDateData,
    yearToDateDetailData: state.IncomeYearToDateData,
    lang: state.Language
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAPIIncomeByYear,
    fetchIncomeMonthToDateById,
    fetchIncomeYearToDateById,
    refreshIncomeMonthToDateData,
    refreshIncomeYearToDateData
  }
)(IncomeByYearScreen);
