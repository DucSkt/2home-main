import {
  FETCH_API_GET_NUMBER_NOTIFICATION_REQUEST,
  FETCH_API_GET_NUMBER_NOTIFICATION_SUCCESS,
  FETCH_API_GET_NUMBER_NOTIFICATION_FAILED
} from '../ActionTypes';

export const fetchGetNumberNotificationRequest = (resolve,reject) => ({
    type: FETCH_API_GET_NUMBER_NOTIFICATION_REQUEST,
    resolve,
    reject,
  });

export const fetchGetNumberNotificationSuccess = data => ({
    type: FETCH_API_GET_NUMBER_NOTIFICATION_SUCCESS,
    data
  });

export const fetchGetNumberNotificationFailed = error => ({
    type: FETCH_API_GET_NUMBER_NOTIFICATION_FAILED,
    error
  });
