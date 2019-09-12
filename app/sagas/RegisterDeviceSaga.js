import { takeLatest, call, put } from 'redux-saga/effects';
import {
  registerDevice,
  registerDeviceSuccess,
  registerDeviceFailed
} from '../actions';

import APIWorker from '../services/APIWorker';
import { REGISTER_DEVICE } from '../actions/ActionTypes';

function* fetchAPI(action) {
  try {
    try {
      const { uuid,deviceToken } = action.payload;
    
      const result = yield call(APIWorker.registerDevice,uuid, deviceToken);
      if (result.success) {
        yield put(registerDeviceSuccess(result.data));
      }
      else {
        yield put(registerDeviceFailed(result));
      }
    } catch (error) {
      yield put(registerDeviceFailed(error));

    }

  } catch (error) {
    yield put(registerDeviceFailed(error));
  }
}

export function* watchRegisterDevice() {
  yield takeLatest(REGISTER_DEVICE, fetchAPI);
}
