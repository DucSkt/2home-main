import {
  FETCH_API_CUSTOMER_PROFILE,
  FETCH_API_CUSTOMER_PROFILE_FAILED,
  FETCH_API_CUSTOMER_PROFILE_SUCCESS
} from '../ActionTypes';

export const fetchAPICustomerProfile = (locale, resolve, reject) => ({
  type: FETCH_API_CUSTOMER_PROFILE,
  payload: locale,
  resolve,
  reject
});

export const fetchAPICustomerProfileSuccess = data => ({
  type: FETCH_API_CUSTOMER_PROFILE_SUCCESS,
  payload: data
});

export const fetchAPICustomerProfileFailed = error => ({
  type: FETCH_API_CUSTOMER_PROFILE_FAILED,
  payload: error
});
