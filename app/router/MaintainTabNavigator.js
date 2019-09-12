import { createStackNavigator, createMaterialTopTabNavigator } from "react-navigation";
import React, { Component } from "react";
import I18n from "../localization";
import Request from '../containers/maintain/maintainance-request/MaintainanceRequest';
import Historys from '../containers/maintain/maintainance-history/MaintainanceHistory';
import {Colors,Fonts} from '../themes';
import {Text} from 'react-native'
import ImageSource from "../themes/Images";
import NormalTabIcon from "../components/tabIcon/NormalTabIcon";

const MaintainStack = createStackNavigator({
  Maintain: createMaterialTopTabNavigator({
    Request: {
      screen: Request,
    },
    History: {
      screen: Historys,
    }
  },{
    animationEnabled: true,
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: Fonts.size.small+1,
        fontFamily: Fonts.type.bold,
        fontWeight: '900',
        height: 16,
      },
      style: {
        backgroundColor: Colors.white,
        shadowOpacity: 0.2,
        marginBottom: 3,
        shadowOffset: { width: 0, height: 2 }
      },
      inactiveTintColor: Colors.black,
      activeTintColor: Colors.white,
      indicatorStyle: {
        backgroundColor: Colors.orange,
        height: 100,
      },
      upperCaseLabel:false
    }})
}, {
    navigationOptions: {
      headerTitle:()=>{
        return (
            <Text style = {Fonts.style.headerTitle}>
              {I18n.t("maintain")}
            </Text>
        )
      }

    },
});

const MaintainTabNavigator = {
  screen: MaintainStack,
  navigationOptions: {
    tabBarIcon: ({ focused }) => {
      return (
        <NormalTabIcon
          iconName={ImageSource.maintain}
          titleLabel={I18n.t("maintain")}
          focused={focused}
        />
      );
    }
  }
};

export default MaintainTabNavigator;

