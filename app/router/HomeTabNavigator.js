import { createStackNavigator } from "react-navigation";
import HomeScreen from "../containers/home/HomeScreen";
import I18n from "../localization";
import React, { Component } from 'react'
import ImageSource from "../themes/Images";
import NormalTabIcon from "../components/tabIcon/NormalTabIcon";

const HomeStack = createStackNavigator({
  Home: HomeScreen
})
const HomeTabsNavigator = {
  screen: HomeStack,
  navigationOptions: {
    tabBarIcon: ({ focused }) => {
      return (
        <NormalTabIcon
          iconName={ImageSource.home}
          titleLabel={I18n.t("home")}
          focused={focused}
        />
      );
    }
  }
};

export default HomeTabsNavigator;
