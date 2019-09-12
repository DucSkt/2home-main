import { combineReducers } from 'redux';
import MaintainRequestReducer from './maintain-reducer/MaintainRequestReducer';
import MaintainHistoryReducer from './maintain-reducer/MaintainHistoryReducer';
import DetailsReducer from './reports-reducer/DetailsReducer';
import UserReducer from './UserReducer';
import FetchDashboardReducer from './home-reducer/FetchDataReducer';
import FetchIncomeDataReducer from './reports-reducer/FetchIncomeDataReducer';

import FetchExpenseByYearDataReducer from './reports-reducer/expense/FetchExpenseByYearDataReducers';
import FetchMonthToDateDataByIDReducer from './reports-reducer/expense/FetchMonthToDateDataByIDReducer';
import FetchYearToDateDataByIDReducer from './reports-reducer/expense/FetchYearToDateDataByIDReducer';
import FetchIncomeByYearDataReducer from './reports-reducer/income/FetchIncomeByYearDataReducer';
import FetchIncomeMonthToDateDataByReducer from './reports-reducer/income/FetchMonthToDateDataByIDReducer';
import FetchIncomeYearToDateDataReducer from './reports-reducer/income/FetchYearToDateDataByIDReducer';
import FetchExpenseDataReducer from './reports-reducer/expense/FetchExpenseDataReducer';
import FetchTenantDataReducer from './tenant-reducer/FetchTenantDataReducer';
import RoomDetailReducer from './reports-reducer/RoomDetailReducer';
import ListRoomReducer from './reports-reducer/ListRoomReducer';
import GetNumberNotificationReducer from './notification-reducer/GetNumberNotificationReducer';
import NotificationData from './notification-reducer/GetNotificationsReducer';
import DeleteNotification from './notification-reducer/DeleteNotificationReducer';
import PostNotification from './notification-reducer/PostNotificationReducer';
import LanguageReducer from './LanguageReducer';
import InternetStateReducer from './InternetStateReducer';
import ChangePasswordReducer from './setting-reducer/ChangePasswordReducer';
import CustomerProfileReducer from './setting-reducer/CustomerProfileReducer';

export default combineReducers({
  User: UserReducer,
  MaintainRequest: MaintainRequestReducer,
  MaintainHistory: MaintainHistoryReducer,

  DashBoardData: FetchDashboardReducer,
  IncomeData: FetchIncomeDataReducer,
  IncomeByYearData: FetchIncomeByYearDataReducer,
  IncomeMonthToDateData: FetchIncomeMonthToDateDataByReducer,
  IncomeYearToDateData: FetchIncomeYearToDateDataReducer,
  ExpenseData: FetchExpenseDataReducer,
  ExpenseByYearData: FetchExpenseByYearDataReducer,
  ExpenseMonthToDateData: FetchMonthToDateDataByIDReducer,
  ExpenseYearToDateData: FetchYearToDateDataByIDReducer,
  TenantData: FetchTenantDataReducer,
  DetailsReducer,
  RoomDetailReducer,
  ListRoomReducer,
  NumberNotifcation: GetNumberNotificationReducer,
  NotificationData,
  DeleteNotification,
  PostNotification,
  Language: LanguageReducer,
  InternetState: InternetStateReducer,
  ChangePassword: ChangePasswordReducer,
  CustomerProfile: CustomerProfileReducer
});
