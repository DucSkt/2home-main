import {
  FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID,
  FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID_FAILED,
  FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID_SUCCESS,
  REFRESH_EXPENSE_MONTH_TO_DATE_DATA
} from '../../ActionTypes';

export const fetchExpenseMonthToDateById = (id, locale, resolve, reject) => ({
  type: FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID,
  id,
  locale,
  resolve,
  reject
});

export const fetchExpenseMonthToDateByIdFailed = data => ({
  type: FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID_FAILED,
  payload: data
});

export const fetchExpenseMonthToDateByIdSuccess = (id,data )=> ({
  type: FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID_SUCCESS,
  payload: data,
  id
});

export const refreshExpenseMonthToDateData=()=>({
  type: REFRESH_EXPENSE_MONTH_TO_DATE_DATA
});