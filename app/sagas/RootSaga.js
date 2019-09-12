import { all, takeLatest } from 'redux-saga/effects';
import {
  watchFetchMaintainRequest,
  watchPostMaintainRequest,
  watchRemoveMaintainRequest
} from './maintain-sagas/MaintainRequestSaga';
import { watchFetchMaintainHistory } from './maintain-sagas/MaintainHistorySaga';
import { 
  watchAuthentication,
  watchLogoutAuthentication,
  watchRequireNewPassFirstTime,
  watchRefreshToken } from './AuthenticationSaga';
import { watchFetchPropertiesRequest } from './reports-sagas/DetailsSaga';
import { watchFetchDashboardData } from './home-sagas/FetchDataSaga';
import { USER_LOGIN } from '../actions/ActionTypes';
import watchFetchIncomeData, {
  watchFetchIncomeByYearRequest,
  watchFetchIncomeMonthToDateByIDData,
  watchFetchIncomeYearToDateByIDData
} from './reports-sagas/FetchIncomeDataSaga';

import {
  watchFetchExpenseData,
  watchFetchExpenseByYearData,
  watchFetchExpenseMonthToDateByIDData,
  watchFetchExpenseYearToDateByIDData
} from './reports-sagas/FetchExpenseDataSaga';
import { watchFetchTenantRequest } from './tenant-sagas/FetchTenantDataSaga';
import { watchFetchRoomDetailRequest } from './reports-sagas/RoomDetailSaga';
import { watchFetchListRoomRequest } from './reports-sagas/ListRoomSaga';
import { watchFetchGetNumberNotificationRequest } from './notification-sagas/GetNumberNotificationSaga';
import { watchFetchGetNotificationsRequest } from './notification-sagas/GetNotificationsSaga';
import { watchDeleteNotificationRequest } from './notification-sagas/DeleteNotificationSaga';
import { watchPostNotificationsRequest } from './notification-sagas/PostNotificationSaga';
// import {watchFetchLanguage} from './LanguageSaga';
import { watchChangeInternet } from './ChangeInternetSaga';

import { watchFetchChangePassword } from './setting-sagas/ChangePasswordSaga';

import { watchFetchCustomerProfile } from './setting-sagas/CustomerProfileSaga';
import { watchRegisterDevice } from './RegisterDeviceSaga';

export default function* rootSaga() {
  yield all([
    // Maintain
    watchFetchMaintainRequest(),
    watchPostMaintainRequest(),
    watchRemoveMaintainRequest(),
    watchFetchMaintainHistory(),

    // Reports
    watchFetchPropertiesRequest(),

    // Tenant
    watchFetchTenantRequest(),

    // List Room
    watchFetchListRoomRequest(),

    // Home
    watchFetchDashboardData(),

    // Income
    watchFetchIncomeData(),
    watchFetchIncomeByYearRequest(),
    watchFetchIncomeMonthToDateByIDData(),
    watchFetchIncomeYearToDateByIDData(),

    // Expense
    watchFetchExpenseData(),
    watchFetchExpenseByYearData(),
    watchFetchExpenseMonthToDateByIDData(),
    watchFetchExpenseYearToDateByIDData(),

    // Room Detail
    watchFetchRoomDetailRequest(),

    // Get number notification
    watchFetchGetNumberNotificationRequest(),

    // Get notification data
    watchFetchGetNotificationsRequest(),

    // Delete notification
    watchDeleteNotificationRequest(),

    // Post Notification
    watchPostNotificationsRequest(),
    // watchFetchLanguage(),

    // Check Internet
    watchChangeInternet(),

    // Setting ChangePassword
    watchFetchChangePassword(),

    // Customer profile
    watchFetchCustomerProfile(),

    yield takeLatest(USER_LOGIN, watchAuthentication),
    watchLogoutAuthentication(),
    watchRequireNewPassFirstTime(),

    watchRegisterDevice(),
    watchRefreshToken(),
  ]);
}
