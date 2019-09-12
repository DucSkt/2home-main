import { USER_LOGIN ,USER_LOGOUT,USER_LOGIN_REQUIRE_NEW_PASS, REFRESH_TOKEN,REFRESH_TOKEN_SUCCESS} from './ActionTypes';

export const login = (username, password, onRequireNewPass) => {
  return {
    type: USER_LOGIN,
    payload: {username,password},
    onRequireNewPass
  };
}
export const requireNewPassword = (newPassword,cognitoUser,userAttr,onLoginSuccess,onLoginError) => {
  return {
    type: USER_LOGIN_REQUIRE_NEW_PASS,
    payload: {newPassword,cognitoUser,userAttr},
    onLoginSuccess,
    onLoginError
  };
}
export const logout = (onSuccess,onError)=>{
  return{
    type:USER_LOGOUT,
    onSuccess,
    onError,
  }
}

export const refreshToken = (onSuccess,onError)=>{
  return{
    type:REFRESH_TOKEN,
    callback:{
      onSuccess,
      onError,
    }
  }
}

export const refreshTokenSuccess = (newToken)=>{
  return{
    type:REFRESH_TOKEN_SUCCESS,
    payload:newToken
  }
}