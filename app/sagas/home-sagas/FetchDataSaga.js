import { takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchAPIDashboardSuccess,
  fetchAPIDashboardFailed
} from '../../actions';

import APIWorker from '../../services/APIWorker';
import { FETCH_API_DASHBOARD } from '../../actions/ActionTypes';

function* fetchAPI(action) {
  try {
    try {
      const result = yield call(APIWorker.getDashboard,action.payload);
      if (result.success) {
        yield put(fetchAPIDashboardSuccess(result.data));
        action.resolve(result.data);
      }
      else {
        yield put(fetchAPIDashboardFailed(result));
        action.reject(result);
      }
    } catch (error) {
      yield put(fetchAPIDashboardFailed(error));
      action.reject(error);
    }

  } catch (error) {
    yield put(fetchAPIDashboardFailed(error));
    action.reject(error);
  }
}

export function* watchFetchDashboardData() {
  yield takeLatest(FETCH_API_DASHBOARD, fetchAPI);
}
