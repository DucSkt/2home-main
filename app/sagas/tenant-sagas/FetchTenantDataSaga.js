import { takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchAPITenantSuccess,
  fetchAPITenantFailed
} from '../../actions';

import APIWorker from '../../services/APIWorker';
import { FETCH_API_TENANT} from '../../actions/ActionTypes';

function* fetchAPI(action) {
  
  try {
    try {
      const result = yield call(APIWorker.getTenant,action.payload);
      if (result.success) {
        yield put(fetchAPITenantSuccess(result.data));
        action.resolve(result.data);
      }
      else {
        yield put(fetchAPITenantFailed(result));
        action.reject(result);
      }
    } catch (error) {
      yield put(fetchAPITenantFailed(error));
      action.reject(error);
    }

  } catch (error) {
    yield put(fetchAPITenantFailed(error));
    action.reject(error);
  }
}

export function* watchFetchTenantRequest() {
  yield takeLatest(FETCH_API_TENANT, fetchAPI);
}
