import { put, takeLatest, call } from 'redux-saga/effects';
import { CHANGE_PASSWORD } from '../../actions/ActionTypes';
import { changePasswordSuccess, changePasswordFailed } from '../../actions';
import UserAPI from '../../services/UserAPI';

function* fetchChangePassword(action) {
  try {
    const payload = action.payload;
    const { oldPassword, newPassword } = payload;
    try {
      const result = yield call(
        UserAPI.changePassword,
        oldPassword,
        newPassword
      );
      if (result.success) {
        yield put(changePasswordSuccess(result.data));
        action.resolve(result.data);
      } else{
        yield put(changePasswordFailed(result.message));
        action.reject(result.message);
      }
    } catch (error) {
      yield put(changePasswordFailed(error));
      action.reject(error);
    }
  } catch (error) {
    yield put(changePasswordFailed(error));
    action.reject(error);
  }
}

export function* watchFetchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD, fetchChangePassword);
}
