import {
CONNECT_CHANGE
} from "./ActionTypes";

export const changeConnectInternet = (connectedState) => {
  return {
    type: CONNECT_CHANGE,
    payload: connectedState
  }
};
