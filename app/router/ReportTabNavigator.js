import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ReportsScreen from '../containers/reports/ReportsScreen';
import ImageSource from '../themes/Images';
import NormalTabIcon from '../components/tabIcon/NormalTabIcon';
import I18n from '../localization';
import TenantScreen from '../containers/reports/tenants/TenantScreen';
import PropertiesTabsScreen from './PropertiesTabsNavigator';
import ListRoomScreen from '../containers/reports/listRoom/ListRoomScreen';
import BackHeaderButton from '../components/BackHeaderButton';
import DetailRoom from '../containers/reports/detailRoom/DetailRoomScreen';
import IncomeByYearScreen from '../containers/reports/income/incomeByYear/IncomeByYearScreen';
import ExpenseByYearScreen from '../containers/reports/expense/expenseByYear/ExpenseByYearScreen';

const ReportsStack = createStackNavigator(
  {
    Reports: ReportsScreen,
    Properties: PropertiesTabsScreen,
    ListRoomScreen,
    Tenants: TenantScreen,
    DetailRoom,
    IncomeByYear: IncomeByYearScreen,
    ExpenseByYear: ExpenseByYearScreen
  },
  {
    navigationOptions: {
      headerBackImage: <BackHeaderButton />,
      headerBackTitle: null
    }
  }
);

const ReportsTabNavigator = {
  screen: ReportsStack,
  navigationOptions: {
    tabBarIcon: ({ focused }) => (
      <NormalTabIcon
        iconName={ImageSource.report}
        titleLabel={I18n.t('reports')}
        focused={focused}
      />
    )
  }
};

export default ReportsTabNavigator;
