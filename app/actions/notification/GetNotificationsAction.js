import {
  FETCH_API_GET_NOTIFICATIONS_REQUEST,
  FETCH_API_GET_NOTIFICATIONS_FAILED,
  FETCH_API_GET_NOTIFICATIONS_SUCCESS,
} from '../ActionTypes';

export const fetchGetNotificationsRequest = (from,size,locale,resolve,reject,outOfData) => ({
    type: FETCH_API_GET_NOTIFICATIONS_REQUEST,
    payload:{from,size,locale},
    resolve,
    reject,
    outOfData,
  });

export const fetchGetNotificationsSuccess = (data, page) => ({
    type: FETCH_API_GET_NOTIFICATIONS_SUCCESS,
    data,
    page,
  });
  
export const fetchGetNotificationsFailed = error => ({
    type: FETCH_API_GET_NOTIFICATIONS_FAILED,
    error
  });
