import {FETCH_API_MAINTAIN_HISTORY,
    FETCH_API_MAINTAIN_HISTORY_SUCCESS,
    FETCH_API_MAINTAIN_HISTORY_FAILED
} from "../ActionTypes";
 
export const fetchAPIMaintainHistory = (from , size , locale , resolve , reject, onOutOfData) => ({
    type: FETCH_API_MAINTAIN_HISTORY,
    from: from,
    size: size,
    locale: locale,
    resolve: resolve,
    reject: reject,
    onOutOfData,
  });
 
export const fetchAPIMaintainHistorySuccess = (from,data) => ({
    type: FETCH_API_MAINTAIN_HISTORY_SUCCESS,
    payload: data,
    from,
  });
  
export const fetchAPIMaintainHistoryFailed = error => ({
    type: FETCH_API_MAINTAIN_HISTORY_FAILED,
    payload: error
  });
 