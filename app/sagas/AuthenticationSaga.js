import {put,takeLatest, call} from 'redux-saga/effects';
import {
  USER_LOGOUT,
  RESET_STATE,
  REFRESH_TOKEN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_FAILED,
  USER_LOGIN_REQUIRE_NEW_PASS
} from '../actions/ActionTypes';
import UserAPI from '../services/UserAPI';
import { refreshTokenSuccess } from '../actions/AuthenticationAction';

export function* watchAuthentication(action) {
  try {
    const payload = action.payload;
    const {username,password} = payload;
    try {
      const result = yield call (UserAPI.login, username, password);

      switch(result.state){
       default:{
          // error
          yield put({ type:USER_LOGIN_FAILED, payload: result });
          break;
        }
        case 1:{
          // login success
          yield put({ type:USER_LOGIN_SUCCESS, payload: result.idToken });
          break;
        }
        case 2:{
          // require new password in first time login
          action.onRequireNewPass(result.cognitoUser,result.userAttr);
          break;
        }
      }

    } catch (error) {
      yield put({ type:USER_LOGIN_FAILED, payload: error.message });
    }
  } catch (error) {
    yield put({ type:USER_LOGIN_FAILED, payload: error.message });
  }
}
export function* requireNewPasswordFirstTime(action) {
  try {
    const payload = action.payload;
    const {newPassword,cognitoUser,userAttr} = payload;
    try {
      const result = yield call (UserAPI.changePasswordFirstTime, newPassword, cognitoUser, userAttr);
      if (result.state){
          // login success
          yield put({ type:USER_LOGIN_SUCCESS, payload: result.idToken });
          action.onLoginSuccess(result.idToken)
      } else {
          // error
          yield put({ type:USER_LOGIN_FAILED, payload: result });
          action.onLoginError(result)
      }

    } catch (error) {
      yield put({ type:USER_LOGIN_FAILED, payload: error.message });
      action.onLoginError(error.message)
    }
  } catch (error) {
    yield put({ type:USER_LOGIN_FAILED, payload: error.message });
    action.onLoginError(error.message)
  }
}

export function* watchRequireNewPassFirstTime() {
  yield takeLatest(USER_LOGIN_REQUIRE_NEW_PASS, requireNewPasswordFirstTime);
}

function* logoutAuthentication(action){
  try {
    try {
      const result = yield call (UserAPI.logout);
      console.log("logoutAuthentication: ",result)
      if (result.success){
        yield put({ type:RESET_STATE }) // clear all state in app (user info ,...)
        action.onSuccess();
      } else {
        // yield put({ type:USER_LOGOUT_FAILED, payload: result });
        yield put({ type:RESET_STATE }) // clear all state in app (user info ,...)
        action.onError(result);
      }
    } catch (error) {
      // yield put({ type:USER_LOGOUT_FAILED, payload: error.message });
      yield put({ type:RESET_STATE }) // clear all state in app (user info ,...)
      action.onError(error.message);
    }
  } catch (error) {
    // yield put({ type:USER_LOGOUT_FAILED, payload: error.message });
    yield put({ type:RESET_STATE }) // clear all state in app (user info ,...)
    action.onError(error.message);
  }
}

export function* watchLogoutAuthentication() {
  yield takeLatest(USER_LOGOUT, logoutAuthentication);
}

function* refreshToken(action){
  try {
    try {
      const result = yield call (UserAPI.refreshToken);

      if (result.success){
        yield put(refreshTokenSuccess(result.idToken))
        action.callback.onSuccess(result.idToken);
      } else {
        action.callback.onError(result);
      }
    } catch (error) {
      action.callback.onError(error);
    }
  } catch (error) {
    action.callback.onError(error);
  }
}

export function* watchRefreshToken() {
  yield takeLatest(REFRESH_TOKEN, refreshToken);
}
