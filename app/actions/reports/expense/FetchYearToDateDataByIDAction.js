import {
    FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID,
    FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID_FAILED,
    FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID_SUCCESS,
    REFRESH_EXPENSE_YEAR_TO_DATE_DATA
  } from '../../ActionTypes';
  
  export const fetchExpenseYearToDateById = (id, locale, resolve, reject) => ({
    type: FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID,
    id,
    locale,
    resolve,
    reject
  });
  
  export const fetchExpenseYearToDateByIdFailed = data => ({
    type: FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID_FAILED,
    payload: data
  });
  
  export const fetchExpenseYearToDateByIdSuccess = (id,data )=> ({
    type: FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID_SUCCESS,
    payload: data,
    id
  });
 
  export const refreshExpenseYearToDateData=()=>({
    type: REFRESH_EXPENSE_YEAR_TO_DATE_DATA
  });