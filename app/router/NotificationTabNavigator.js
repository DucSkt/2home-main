
import { createStackNavigator } from "react-navigation";
import NotificationScreen from "../containers/notification/NotificationScreen";
import I18n from "../localization";
import React, { Component } from "react";
import ImageSource from "../themes/Images";
import NotificationTabIcon from "../components/tabIcon/NotificationTabIcon";

 const NotificationStack = createStackNavigator({
  Notification: NotificationScreen
})
const NotificationTabsNavigator = {
  screen: NotificationStack,
  navigationOptions: {
    tabBarIcon: ({ focused }) => {
      return (
        <NotificationTabIcon
          iconName={ImageSource.notification}
          titleLabel={I18n.t("notification")}
          focused={focused}
        />
      );
    }
  }
};
 export default NotificationTabsNavigator;