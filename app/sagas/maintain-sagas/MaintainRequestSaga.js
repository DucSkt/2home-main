import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchAPIMaintainRequestSuccess,
  fetchAPIMaintainRequestFailed,
  postItemMaintainSuccess,
  postItemMaintainFailed,
  removeItemMaintainSuccess,
  removeItemMaintainFailed
} from '../../actions';

import APIWorker from '../../services/APIWorker';
import {
  FETCH_API_MAINTAIN_REQUEST,
  POST_API_MAINTAIN,
  REMOVE_ITEM_MAINTAIN
} from '../../actions/ActionTypes';

    // FetAPI
function* fetchApi(action) {
  try {
    try {
      const result = yield call(APIWorker.getRequestsByLocale, action.payload);
      console.log("Get reuqest maintain list:",result)
      if (result.success) {
        yield put(fetchAPIMaintainRequestSuccess(result.data));
        action.resolve(result.data);
      }
      else {
        yield put(fetchAPIMaintainRequestFailed(result));
        action.reject(result);
      }
    } catch (error) {
      yield put(fetchAPIMaintainRequestFailed(error));
      action.reject(error);
    }
  
  } catch (error) {
    yield put(fetchAPIMaintainRequestFailed(error));
    action.reject(error);
  }
}
export function* watchFetchMaintainRequest() {
  yield takeLatest(FETCH_API_MAINTAIN_REQUEST, fetchApi);
}

    // PostApi
function* postApiMaintain(action) {
  try {
    try {
      const result = yield call(APIWorker.acceptRequestById, action.requestId);
      if (result.success) {
        yield put(postItemMaintainSuccess(action.requestId));
        action.resolve(result);
      }
      else {
        yield put(postItemMaintainFailed(result));
        action.reject(result);
      }
    } catch (error) {
      yield put(postItemMaintainFailed(error));
      action.reject(error);
    }
  } catch (error) {
    yield put(postItemMaintainFailed(error));
    action.reject(error);
  } 
}

export function* watchPostMaintainRequest() {
  yield takeEvery(POST_API_MAINTAIN, postApiMaintain);
}

    // RemoveApi
function* removeApiMaintain(action) {
  try {
    try {
      const result = yield call(APIWorker.rejectRequestById, action.requestId);
      if (result.success) {
        yield put(removeItemMaintainSuccess(action.requestId));
        action.resolve(result.data);
      }
      else {
        yield put(removeItemMaintainFailed(result));
        action.reject(result);
      }
    } catch (error) {
      yield put(removeItemMaintainFailed(error));
      action.reject(error);
    }
  
  } catch (error) {
    yield put(removeItemMaintainFailed(error));
    action.reject(error);
  }
}

export function* watchRemoveMaintainRequest() {
  yield takeEvery(REMOVE_ITEM_MAINTAIN, removeApiMaintain);
}
