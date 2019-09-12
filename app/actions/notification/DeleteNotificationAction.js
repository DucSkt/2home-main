import {
    FETCH_API_DELETE_NOTIFICATIONS_FAILED,
    FETCH_API_DELETE_NOTIFICATIONS_SUCCESS,
    FETCH_API_DELETE_NOTIFICATIONS_REQUEST
  } from '../ActionTypes';
  
  export const fetchDeleteNotificationRequest = (id,resolve,reject) => ({
      type: FETCH_API_DELETE_NOTIFICATIONS_REQUEST,
      payload:id,
      resolve,
      reject,
    });
  
  export const fetchDeleteNotificationSuccess = (notificationId,data) => ({
      type: FETCH_API_DELETE_NOTIFICATIONS_SUCCESS,
      data,
      notificationId
    });
  
  export const fetchDeleteNotificationFailed = error => ({
      type: FETCH_API_DELETE_NOTIFICATIONS_FAILED,
      error
    });