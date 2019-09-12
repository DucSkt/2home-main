import {
  FETCH_API_DASHBOARD,
  FETCH_API_DASHBOARD_SUCCESS,
  FETCH_API_DASHBOARD_FAILED
} from '../ActionTypes';

export const fetchAPIDashboard = (locale, resolve, reject) => ({
    type: FETCH_API_DASHBOARD,
    payload: locale,
    resolve: resolve,
    reject: reject
  });

export const fetchAPIDashboardSuccess = data => ({
  type: FETCH_API_DASHBOARD_SUCCESS,
  payload: data
});

export const fetchAPIDashboardFailed = error => ({
  type: FETCH_API_DASHBOARD_FAILED,
  payload: error
});
