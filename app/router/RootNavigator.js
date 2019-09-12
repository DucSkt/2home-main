import { createSwitchNavigator } from 'react-navigation';

import LoginNavigator from './LoginNavigator';
import MainTabsNavigator from './MainTabsNavigator';
import AppLoading from '../containers/app-loading/AppLoading';


export default createSwitchNavigator(
  {
    AppLoading,
    LoginNavigator,
    MainTabsNavigator,
  },
  {
    initialRouteName: 'AppLoading'
  }
);
