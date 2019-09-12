import { takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchAPICustomerProfileSuccess,
  fetchAPICustomerProfileFailed
} from '../../actions';

import APIWorker from '../../services/APIWorker';
import { FETCH_API_CUSTOMER_PROFILE } from '../../actions/ActionTypes';

function* fetchAPI(action) {
  try {
    try {
      const result = yield call(APIWorker.getProfile, action.payload);
      console.log('user profile:', result);
      if (result.success) {
        yield put(fetchAPICustomerProfileSuccess(result.data));
        action.resolve(result.data);
      } else {
        yield put(fetchAPICustomerProfileFailed(result));
        action.reject(result);
      }
    } catch (error) {
      yield put(fetchAPICustomerProfileFailed(error));
      action.reject(error);
    }
  } catch (error) {
    yield put(fetchAPICustomerProfileFailed(error));
    action.reject(error);
  }
}

export function* watchFetchCustomerProfile() {
  yield takeLatest(FETCH_API_CUSTOMER_PROFILE, fetchAPI);
}
