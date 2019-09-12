import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import SettingScreen from '../containers/setting/SettingScreen';
import I18n from '../localization';
import ImageSource from '../themes/Images';
import NormalTabIcon from '../components/tabIcon/NormalTabIcon';
import CustomerProfile from '../containers/setting/customer-profile/CustomerProfileScreen';
import ChangePassword from '../containers/setting/change-password/ChangePasswordScreen';
import ChangeLanguageScreen from '../containers/setting/change-language/ChangeLanguageScreen';
import NotificationScreen from '../containers/setting/notification/NotificationScreen';

const NavigationConfig = () => ({
    transitionSpec: {
      duration: 300
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      if (scene.route.routeName !== 'SettingScreen') {
        const thisSceneIndex = scene.index;
        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [thisSceneIndex, thisSceneIndex + 1],
          outputRange: [0, -height]
        });
        const slideInFromBottom = { transform: [{ translateY }] };
        return slideInFromBottom;
      }
    }
  });

const tabbarVisible = navigation => {
  const { routes } = navigation.state;
  let showTabbar = false;
  routes.forEach(route => {
    if (route.routeName == 'SettingScreen') showTabbar = true;
    else showTabbar = false;
  });
  return showTabbar;
};

const SettingStack = createStackNavigator(
  {
    SettingScreen: { screen: SettingScreen },
    CustomerProfile: {
      screen: CustomerProfile,
      navigationOptions: { header: null }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: { header: null }
    },
    ChangeLanguage: {
      screen: ChangeLanguageScreen,
      navigationOptions: { header: null }
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: { header: null }
    }
  },
  {
    headerMode: 'screen',
    transitionConfig: NavigationConfig
  }
);

const SettingTabsNavigator = {
  screen: SettingStack,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => (
        <NormalTabIcon
          iconName={ImageSource.setting}
          titleLabel={I18n.t('setting')}
          focused={focused}
        />
      ),
    tabBarVisible: tabbarVisible(navigation)
  })
};
export default SettingTabsNavigator;
