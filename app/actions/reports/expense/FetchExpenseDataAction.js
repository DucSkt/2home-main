import {
  FETCH_API_EXPENSE,
  FETCH_API_EXPENSE_SUCCESS,
  FETCH_API_EXPENSE_FAILED
} from '../../ActionTypes'

export const fetchAPIExpense = (locale, resolve, reject) => ({
  type: FETCH_API_EXPENSE,
  payload: locale,
  resolve,
  reject
});

export const fetchAPIExpenseSuccess = data => ({
  type: FETCH_API_EXPENSE_SUCCESS,
  payload: data
});

export const fetchAPIExpenseFailed = data => ({
  type: FETCH_API_EXPENSE_FAILED,
  payload: data
});
