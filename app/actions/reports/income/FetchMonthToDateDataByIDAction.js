import {
  FETCH_API_INCOME_MONTH_TO_DATE_BY_ID,
  FETCH_API_INCOME_MONTH_TO_DATE_BY_ID_FAILED,
  FETCH_API_INCOME_MONTH_TO_DATE_BY_ID_SUCCESS,
  REFRESH_INCOME_MONTH_TO_DATE_DATA
} from '../../ActionTypes';

export const fetchIncomeMonthToDateById = (id, locale, resolve, reject) => ({
  type: FETCH_API_INCOME_MONTH_TO_DATE_BY_ID,
  id,
  locale,
  resolve,
  reject
});

export const fetchIncomeMonthToDateByIdFailed = data => ({
  type: FETCH_API_INCOME_MONTH_TO_DATE_BY_ID_FAILED,
  payload: data
});

export const fetchIncomeMonthToDateByIdSuccess = (id, data) => ({
  type: FETCH_API_INCOME_MONTH_TO_DATE_BY_ID_SUCCESS,
  payload: data,
  id
});

export const refreshIncomeMonthToDateData = () => ({
  type: REFRESH_INCOME_MONTH_TO_DATE_DATA
});
