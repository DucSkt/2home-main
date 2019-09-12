import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  FETCH_API_EXPENSE,
  FETCH_API_EXPENSE_BY_YEAR,
  FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID,
  FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID
} from '../../actions/ActionTypes';

import APIWorker from '../../services/APIWorker';
import {
  fetchAPIExpenseFailed,
  fetchAPIExpenseSuccess,
  fetchAPIExpenseByYearSuccess,
  fetchAPIExpenseByYearFailed,
  fetchExpenseMonthToDateByIdFailed,
  fetchExpenseMonthToDateByIdSuccess,
  fetchExpenseYearToDateByIdSuccess,
  fetchExpenseYearToDateByIdFailed
} from '../../actions';


// Fetch main expense data
function* fetchAPI(action) {
  try {
    try {
      const result = yield call(APIWorker.getExpense,action.payload);
      if (result.success) {
        yield put(fetchAPIExpenseSuccess(result.data));
        action.resolve(result.data);
      } else {
        yield put(fetchAPIExpenseFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchAPIExpenseFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchAPIExpenseFailed(err));
    action.reject(err);
  }
}

export function* watchFetchExpenseData() {
  yield takeLatest(FETCH_API_EXPENSE, fetchAPI);
}

/*
 Fetch detail year expense data
 */

function* fetchAPIByYear(action) {

  try {
    try {
      const result = yield call(APIWorker.getExpenseByYear, action.year,action.locale);
      if (result.success) {
        yield put(fetchAPIExpenseByYearSuccess(result.data));
        action.resolve(result.data);
      } else {
        yield put(fetchAPIExpenseByYearFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchAPIExpenseByYearFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchAPIExpenseByYearFailed(err));
    action.reject(err);
  }
}

export function* watchFetchExpenseByYearData() {
  yield takeLatest(FETCH_API_EXPENSE_BY_YEAR, fetchAPIByYear);
}

/*
 fetch detail month to date expense data by id

 */

 // get the last data from state
const getMonthToDateData = state => state.ExpenseMonthToDateData.data;

function* checkDataExpenseMonthToDateBeforeFetch(action) {
  const oldData = yield select(getMonthToDateData);
  if (oldData) {
    const resultDuplicate = oldData.filter(e => e.id === action.id);
     // Not duplicate id data => fetch new data with id
    if (resultDuplicate.length < 1) {
      yield call(fetchAPIMonthToDateByID, action);}
  } else {
    yield call(fetchAPIMonthToDateByID, action);
  }
}

function* fetchAPIMonthToDateByID(action) {
  
  try {
    try {
      const result = yield call(
        APIWorker.getMonthToDateExpenseByPropertyId,
        action.id,action.locale
      );
      if (result.success) {
        yield put(fetchExpenseMonthToDateByIdSuccess(action.id, result.data));
        action.resolve(action.id, result.data);
      } else {
        yield put(fetchExpenseMonthToDateByIdFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchExpenseMonthToDateByIdFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchExpenseMonthToDateByIdFailed(err));
    action.reject(err);
  }
}

export function* watchFetchExpenseMonthToDateByIDData() {
  yield takeLatest(
    FETCH_API_EXPENSE_MONTH_TO_DATE_BY_ID,
    checkDataExpenseMonthToDateBeforeFetch
  );
}

/*
 fetch detail year to date expense data by id
 */

const getYearToDateData = state => state.ExpenseYearToDateData.data;

function* checkDataExpenseYearToDateBeforeFetch(action) {
  const oldData = yield select(getYearToDateData);
  if (oldData) {
    const resultDuplicate = oldData.filter(e => e.id === action.id);
    // Not duplicate id data => fetch new data with id
    if (resultDuplicate.length < 1) {
      yield call(fetchAPIYearToDateByID, action);}
  } else {
    yield call(fetchAPIYearToDateByID, action);
  }
}

function* fetchAPIYearToDateByID(action) {

  try {
    try {
      const result = yield call(
        APIWorker.getYearToDateExpenseByPropertyId,
        action.id,action.locale
      );
      if (result.success) {
        yield put(fetchExpenseYearToDateByIdSuccess(action.id, result.data));
        action.resolve(action.id, result.data);
      } else {
        yield put(fetchExpenseYearToDateByIdFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchExpenseYearToDateByIdFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchExpenseYearToDateByIdFailed(err));
    action.reject(err);
  }
}

export function* watchFetchExpenseYearToDateByIDData() {
  yield takeLatest(
    FETCH_API_EXPENSE_YEAR_TO_DATE_BY_ID,
    checkDataExpenseYearToDateBeforeFetch
  );
}
