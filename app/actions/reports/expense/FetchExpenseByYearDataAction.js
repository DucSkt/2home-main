import {
  FETCH_API_EXPENSE_BY_YEAR,
  FETCH_API_EXPENSE_BY_YEAR_SUCCESS,
  FETCH_API_EXPENSE_BY_YEAR_FAILED
} from '../../ActionTypes';

export const fetchAPIExpenseByYear = (year, locale, resolve, reject) => ({
  type: FETCH_API_EXPENSE_BY_YEAR,
  year,
  locale,
  resolve,
  reject
});

export const fetchAPIExpenseByYearSuccess = data => ({
  type: FETCH_API_EXPENSE_BY_YEAR_SUCCESS,
  payload: data
});

export const fetchAPIExpenseByYearFailed = data => ({
  type: FETCH_API_EXPENSE_BY_YEAR_FAILED,
  payload: data
});
