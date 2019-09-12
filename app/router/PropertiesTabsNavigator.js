import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import HomeScreen from "../containers/home/HomeScreen";
import I18n from "../localization";
import React, { Component } from "react";
import ImageSource from "../themes/Images";
import NormalTabIcon from "../components/tabIcon/NormalTabIcon";
import { Fonts, Colors } from "../themes";
import {Text} from 'react-native'
import DetailTabScreen from "../containers/reports/details/DetailTabScreen";
import IncomeScreen from "../containers/reports/income/IncomeScreen";
import ExpenseScreen from "../containers/reports/expense/ExpenseScreen";

const PropertiesTabs =  createMaterialTopTabNavigator(
      {
        DetailsTab: {
          screen: DetailTabScreen
        },
        IcomeTab: {
          screen: IncomeScreen
        },
        ExpenseTab: {
          screen: ExpenseScreen
        }
      },
      {
        lazy: true,
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
          labelStyle: {
            fontSize: Fonts.size.small,
            fontFamily: Fonts.type.bold,
            height: 15
          },
          upperCaseLabel: false,
          style: {
            backgroundColor: Colors.white,
            shadowOpacity: 0.2,
            marginBottom: 3,
            shadowOffset: { width: 0, height: 2 }
          },
          inactiveTintColor: Colors.black,
          activeTintColor: Colors.black,
          indicatorStyle: {
            backgroundColor: Colors.orange
          }
        }
      }
    )

    const PropertiesTabNavigator = {
        screen: PropertiesTabs,
        navigationOptions: {
             headerTitle:()=>{
        return (
            <Text style = {Fonts.style.headerTitle}>
              {I18n.t("properties")}
            </Text>
        )
      }
        },
       
      };

export default PropertiesTabNavigator;
