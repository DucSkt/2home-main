import {
  fetchPropertiesFailed,
  fetchPropertiesSuccess,
  fetchPropertiesRequest
} from './reports/DetailsAction';
import {
  registerDevice,
  registerDeviceSuccess,
  registerDeviceFailed
} from './RegisterDeviceAction';

import {
  fetchAPIMaintainRequest,
  fetchAPIMaintainRequestSuccess,
  fetchAPIMaintainRequestFailed,
  postItemMaintain,
  postItemMaintainSuccess,
  postItemMaintainFailed,
  removeItemMaintain,
  removeItemMaintainSuccess,
  removeItemMaintainFailed
} from './maintain/MaintainRequestAction';
import {
  fetchAPIMaintainHistory,
  fetchAPIMaintainHistorySuccess,
  fetchAPIMaintainHistoryFailed
} from './maintain/MaintainHistoryAction';
import { login,logout,requireNewPassword } from './AuthenticationAction';
import {
  fetchAPIDashboard,
  fetchAPIDashboardSuccess,
  fetchAPIDashboardFailed
} from './home/FetchDataAction';
import {
  fetchAPIIncome,
  fetchAPIIncomeFailed,
  fetchAPIIncomeSuccess
} from './reports/FetchIncomeDataAction';
import {
  fetchAPIExpense,
  fetchAPIExpenseFailed,
  fetchAPIExpenseSuccess
} from './reports/expense/FetchExpenseDataAction';
import {
  fetchRoomDetailFailed,
  fetchRoomDetailRequest,
  fetchRoomDetailSuccess
} from './reports/RoomDetailAction';
import {
  fetchListRoomRequest,
  fetchListRoomSuccess,
  fetchListRoomFailed
} from './reports/ListRoomAction';
import {
  fetchGetNumberNotificationRequest,
  fetchGetNumberNotificationSuccess,
  fetchGetNumberNotificationFailed
} from './notification/GetNumberNotificationAction';
import {
  fetchGetNotificationsRequest,
  fetchGetNotificationsSuccess,
  fetchGetNotificationsFailed
} from './notification/GetNotificationsAction';
import {
  fetchDeleteNotificationFailed,
  fetchDeleteNotificationRequest,
  fetchDeleteNotificationSuccess
} from './notification/DeleteNotificationAction';
import {
  fetchPostNotificationsFailed,
  fetchPostNotificationsRequest,
  fetchPostNotificationsSuccess
} from './notification/PostNotificationAction';

import { changeLanguage } from './LanguageAction';
import {
  changePassword,
  changePasswordSuccess,
  changePasswordFailed
} from './setting/ChangePasswordAction';

import {
  changeConnectInternet,
} from './InternetAction';

import {
  fetchAPICustomerProfile,
  fetchAPICustomerProfileSuccess,
  fetchAPICustomerProfileFailed
} from './setting/CustomerProfileAction';

export * from './reports/expense/FetchExpenseByYearDataAction';
export * from './reports/expense/FetchMonthToDateDataByIDAction';
export * from './reports/expense/FetchYearToDateDataByIDAction';

export * from './reports/income/FetchIncomeByYearDataAction';
export * from './reports/income/FetchMonthToDateDataByIDAction';
export * from './reports/income/FetchYearToDateDataByIDAction';

export * from './tenant/FetchTenantDataAction';

export default {
  login,
  logout,
  requireNewPassword,
  // Home
  fetchAPIDashboard,
  fetchAPIDashboardFailed,
  fetchAPIDashboardSuccess,
  // Maintain-Request
  fetchAPIMaintainRequest,
  fetchAPIMaintainRequestSuccess,
  fetchAPIMaintainRequestFailed,
  postItemMaintain,
  postItemMaintainSuccess,
  postItemMaintainFailed,
  removeItemMaintain,
  removeItemMaintainSuccess,
  removeItemMaintainFailed,
  // Maintain-History
  fetchAPIMaintainHistory,
  fetchAPIMaintainHistorySuccess,
  fetchAPIMaintainHistoryFailed,

  fetchPropertiesRequest,
  fetchPropertiesFailed,
  fetchPropertiesSuccess,

  // Income
  fetchAPIIncome,
  fetchAPIIncomeFailed,
  fetchAPIIncomeSuccess,
  // Expense
  fetchAPIExpense,
  fetchAPIExpenseFailed,
  fetchAPIExpenseSuccess,
  // Room Detail
  fetchRoomDetailFailed,
  fetchRoomDetailRequest,
  fetchRoomDetailSuccess,

  // List Room
  fetchListRoomRequest,
  fetchListRoomSuccess,
  fetchListRoomFailed,

  // Get number Notification
  fetchGetNumberNotificationRequest,
  fetchGetNumberNotificationSuccess,
  fetchGetNumberNotificationFailed,

  // Get Notifications
  fetchGetNotificationsRequest,
  fetchGetNotificationsSuccess,
  fetchGetNotificationsFailed,

  // Delete Notification
  fetchDeleteNotificationFailed,
  fetchDeleteNotificationRequest,
  fetchDeleteNotificationSuccess,

  // Post Notification
  fetchPostNotificationsFailed,
  fetchPostNotificationsRequest,
  fetchPostNotificationsSuccess,

  // Language
  changeLanguage,

  // Check Internet
  changeConnectInternet,

  // Setting
  changePassword,
  changePasswordSuccess,
  changePasswordFailed,

  registerDevice,
  registerDeviceSuccess,
  registerDeviceFailed,
};

export {
  login,
  logout,
  requireNewPassword,
  // Home
  fetchAPIDashboard,
  fetchAPIDashboardFailed,
  fetchAPIDashboardSuccess,
  // Income
  fetchAPIIncome,
  fetchAPIIncomeFailed,
  fetchAPIIncomeSuccess,
  // Expense
  fetchAPIExpense,
  fetchAPIExpenseFailed,
  fetchAPIExpenseSuccess,
  // Maintain-Request
  fetchAPIMaintainRequest,
  fetchAPIMaintainRequestSuccess,
  fetchAPIMaintainRequestFailed,
  postItemMaintain,
  postItemMaintainSuccess,
  postItemMaintainFailed,
  removeItemMaintain,
  removeItemMaintainSuccess,
  removeItemMaintainFailed,
  // Maintain-History
  fetchAPIMaintainHistory,
  fetchAPIMaintainHistorySuccess,
  fetchAPIMaintainHistoryFailed,
  fetchPropertiesRequest,
  fetchPropertiesFailed,
  fetchPropertiesSuccess,
  // Room Detail
  fetchRoomDetailFailed,
  fetchRoomDetailRequest,
  fetchRoomDetailSuccess,
  // List Room
  fetchListRoomRequest,
  fetchListRoomSuccess,
  fetchListRoomFailed,
  // Get number Notification
  fetchGetNumberNotificationRequest,
  fetchGetNumberNotificationSuccess,
  fetchGetNumberNotificationFailed,
  // Get Notifications
  fetchGetNotificationsRequest,
  fetchGetNotificationsSuccess,
  fetchGetNotificationsFailed,
  // Delete Notification
  fetchDeleteNotificationFailed,
  fetchDeleteNotificationRequest,
  fetchDeleteNotificationSuccess,
  // Post Notification
  fetchPostNotificationsFailed,
  fetchPostNotificationsRequest,
  fetchPostNotificationsSuccess,
  // Language
  changeLanguage,
  // Check - Internet
  changeConnectInternet,
  // Setting
  changePassword,
  changePasswordSuccess,
  changePasswordFailed,
  // user profile
  fetchAPICustomerProfile,
  fetchAPICustomerProfileSuccess,
  fetchAPICustomerProfileFailed,

  registerDevice,
  registerDeviceSuccess,
  registerDeviceFailed
};
