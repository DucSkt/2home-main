import {
  FETCH_API_INCOME,
  FETCH_API_INCOME_SUCCESS,
  FETCH_API_INCOME_FAILED
} from '../ActionTypes';

export const fetchAPIIncome = (locale,resolve,reject) => ({
  type: FETCH_API_INCOME,
  payload: locale,
  resolve,
  reject
});

export const fetchAPIIncomeSuccess = data => ({
  type: FETCH_API_INCOME_SUCCESS,
  payload: data
});

export const fetchAPIIncomeFailed = data => ({
  type: FETCH_API_INCOME_FAILED,
  payload: data
});
