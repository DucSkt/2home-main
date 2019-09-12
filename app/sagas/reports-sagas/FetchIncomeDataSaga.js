import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  fetchAPIIncomeFailed,
  fetchAPIIncomeSuccess,
  fetchAPIIncomeByYearSuccess,
  fetchAPIIncomeByYearFailed,
  fetchIncomeMonthToDateByIdFailed,
  fetchIncomeMonthToDateByIdSuccess,
  fetchIncomeYearToDateByIdSuccess,
  fetchIncomeYearToDateByIdFailed
} from '../../actions';

import {
  FETCH_API_INCOME,
  FETCH_API_INCOME_BY_YEAR,
  FETCH_API_INCOME_MONTH_TO_DATE_BY_ID,
  FETCH_API_INCOME_YEAR_TO_DATE_BY_ID
} from '../../actions/ActionTypes';

import APIWorker from '../../services/APIWorker';

/**
 *
 * fetch income screen request
 */
function* fetchAPI(action) {
  try {
    try {
      const result = yield call(APIWorker.getIncome,action.payload);
      if (result.success) {
        yield put(fetchAPIIncomeSuccess(result.data));
        action.resolve(result.data);
      } else {
        yield put(fetchAPIIncomeFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchAPIIncomeFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchAPIIncomeFailed(err));
    action.reject(err);
  }
}

export default function* watchFetchIncomeData() {
  yield takeLatest(FETCH_API_INCOME, fetchAPI);
}

/**
 *fetch income by year request
 *
 * @param {*} action
 */
function* fetchIncomeByYear(action) {
  try {
    try {
      const result = yield call(APIWorker.getIncomeByYear, action.year, action.locale);
      if (result.success) {
        yield put(fetchAPIIncomeByYearSuccess(result.data));
        action.resolve(result.data);
      } else {
        yield put(fetchAPIIncomeByYearFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchAPIIncomeByYearFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchAPIIncomeByYearFailed(err));
    action.reject(err);
  }
}

export function* watchFetchIncomeByYearRequest() {
  yield takeLatest(FETCH_API_INCOME_BY_YEAR, fetchIncomeByYear);
}

/*
 fetch detail month to date income data by id

 */

// get the last data from state
const getMonthToDateData = state => state.IncomeMonthToDateData.data;

function* checkDataIncomeMonthToDateBeforeFetch(action) {
  const oldData = yield select(getMonthToDateData);

  if (oldData) {
    const resultDuplicate = oldData.filter(e => e.id === action.id);
    // Not duplicate id data => fetch new data with id
    if (resultDuplicate.length < 1) {
      yield call(fetchAPIMonthToDateByID, action);
    }
  } else {
    yield call(fetchAPIMonthToDateByID, action);
  }
}

function* fetchAPIMonthToDateByID(action) {
  try {
    try {
      const result = yield call(
        APIWorker.getMonthToDateIncomeByPropertyId,
        action.id, action.locale
      );

      if (result.success) {
        yield put(fetchIncomeMonthToDateByIdSuccess(action.id, result.data));
        action.resolve(action.id, result.data);
      } else {
        yield put(fetchIncomeMonthToDateByIdFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchIncomeMonthToDateByIdFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchIncomeMonthToDateByIdFailed(err));
    action.reject(err);
  }
}

export function* watchFetchIncomeMonthToDateByIDData() {
  yield takeLatest(
    FETCH_API_INCOME_MONTH_TO_DATE_BY_ID,
    checkDataIncomeMonthToDateBeforeFetch
  );
}

/*
 fetch detail year to date expense data by id
 */

const getYearToDateData = state => state.IncomeYearToDateData.data;

function* checkDataIncomeYearToDateBeforeFetch(action) {
  const oldData = yield select(getYearToDateData);
  if (oldData) {
    const resultDuplicate = oldData.filter(e => e.id === action.id);
    // Not duplicate id data => fetch new data with id
    if (resultDuplicate.length < 1) {
      yield call(fetchAPIYearToDateByID, action);
    }
  } else {
    yield call(fetchAPIYearToDateByID, action);
  }
}

function* fetchAPIYearToDateByID(action) {
  try {
    try {
      const result = yield call(
        APIWorker.getYearToDateIncomeByPropertyId,
        action.id, action.locale
      );
      if (result.success) {
        yield put(fetchIncomeYearToDateByIdSuccess(action.id, result.data));
        action.resolve(action.id, result.data);
      } else {
        yield put(fetchIncomeYearToDateByIdFailed(result));
        action.reject(result);
      }
    } catch (err) {
      yield put(fetchIncomeYearToDateByIdFailed(err));
      action.reject(err);
    }
  } catch (err) {
    yield put(fetchIncomeYearToDateByIdFailed(err));
    action.reject(err);
  }
}

export function* watchFetchIncomeYearToDateByIDData() {
  yield takeLatest(
    FETCH_API_INCOME_YEAR_TO_DATE_BY_ID,
    checkDataIncomeYearToDateBeforeFetch
  );
}
