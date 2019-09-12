import {
  FETCH_API_INCOME_YEAR_TO_DATE_BY_ID,
  FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_FAILED,
  FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_SUCCESS,
  REFRESH_INCOME_YEAR_TO_DATE_DATA
} from '../../ActionTypes';

export const fetchIncomeYearToDateById = (id, locale, resolve, reject) => ({
  type: FETCH_API_INCOME_YEAR_TO_DATE_BY_ID,
  id,
  locale,
  resolve,
  reject
});

export const fetchIncomeYearToDateByIdFailed = data => ({
  type: FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_FAILED,
  payload: data
});

export const fetchIncomeYearToDateByIdSuccess = (id, data) => ({
  type: FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_SUCCESS,
  payload: data,
  id
});

export const refreshIncomeYearToDateData = () => ({
  type: REFRESH_INCOME_YEAR_TO_DATE_DATA
});
