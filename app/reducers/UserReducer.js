import {
  RESET_STATE,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUIRE_NEW_PASS,
  RESET_AUTHENTICATION,
  USER_LOGOUT_FAILED,
  REFRESH_TOKEN_SUCCESS
} from '../actions/ActionTypes';

const INIT_STATE = {
  isFetching: false,
  authorization: null,
  hasError: null,
  message: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUIRE_NEW_PASS:{
      return {
        ...state,
        isFetching: true,
        authorization: null,
        hasError: null,
        message: ''
      };
    }
    case USER_LOGIN:
      return {
        ...state,
        isFetching: true,
        authorization: null,
        hasError: null,
        message: ''
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        authorization: action.payload,
        hasError: false,
        message: ''
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        authorization: null,
        hasError: true,
        message: action.payload
      };
    // call when user log out success
    case RESET_AUTHENTICATION:
      console.log("RESET_AUTHENTICATION: success")
      return INIT_STATE;
    case USER_LOGOUT_FAILED:{
      // RESET STATE in case log out failed
      // console.log("USER_LOGOUT_FAILED")
      return INIT_STATE;
    }
    case REFRESH_TOKEN_SUCCESS:{
      console.log("REFRESH_TOKEN_SUCCESS: ",action.payload)
      return {
        isFetching: false,
        authorization: action.payload,
        hasError: false,
        message: ''
      }
    }
    case RESET_STATE:{
      return INIT_STATE
    }
    default:
      return state;
  }
};
