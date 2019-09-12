import {
    FETCH_API_POST_NOTIFICATIONS_REQUEST,
    FETCH_API_POST_NOTIFICATIONS_SUCCESS,
    FETCH_API_POST_NOTIFICATIONS_FAILED
  } from '../ActionTypes';
  
  export const fetchPostNotificationsRequest = (idArr,resolve,reject) => ({
      type: FETCH_API_POST_NOTIFICATIONS_REQUEST,
      resolve,
      reject,
      payload:idArr
    });
  
  export const fetchPostNotificationsSuccess = (idArr) => ({
      type: FETCH_API_POST_NOTIFICATIONS_SUCCESS,
      idArr
    });
  
  export const fetchPostNotificationsFailed = error => ({
      type: FETCH_API_POST_NOTIFICATIONS_FAILED,
      error
    });