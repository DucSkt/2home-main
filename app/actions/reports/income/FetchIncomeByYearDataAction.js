import {
  FETCH_API_INCOME_BY_YEAR,
  FETCH_API_INCOME_BY_YEAR_SUCCESS,
  FETCH_API_INCOME_BY_YEAR_FAILED
} from '../../ActionTypes';

export const fetchAPIIncomeByYear = (year, locale, resolve, reject) => ({
  type: FETCH_API_INCOME_BY_YEAR,
  year,
  locale,
  resolve,
  reject
});

export const fetchAPIIncomeByYearSuccess = data => ({
  type: FETCH_API_INCOME_BY_YEAR_SUCCESS,
  payload: data
});

export const fetchAPIIncomeByYearFailed = data => ({
  type: FETCH_API_INCOME_BY_YEAR_FAILED,
  payload: data
});