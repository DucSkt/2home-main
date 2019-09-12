import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
 
import HomeTabNavigator from "./HomeTabNavigator";
import ReportsTabNavigator from "./ReportTabNavigator";
import MaintainTabNavigator from "./MaintainTabNavigator";
import NotificationTabNavigator from "./NotificationTabNavigator";
import SettingTabNavigator from "./SettingTabNavigator";
const MainTabsNavigator = createBottomTabNavigator(
  {
    HomeTab: HomeTabNavigator,
    ReportsTab: ReportsTabNavigator,
    MaintainTab: MaintainTabNavigator,
    NotificationTab: NotificationTabNavigator,
    SettingTab: SettingTabNavigator,
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);
export default MainTabsNavigator;
