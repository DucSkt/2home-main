import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED
} from '../ActionTypes';

export const changePassword = (oldPassword, newPassword, resolve, reject) => ({
    type: CHANGE_PASSWORD,
    payload: { oldPassword, newPassword },
    resolve,
    reject
  });

export const changePasswordSuccess = result => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: result
  });

export const changePasswordFailed = error => ({
    type: CHANGE_PASSWORD_FAILED,
    payload: error
  });
