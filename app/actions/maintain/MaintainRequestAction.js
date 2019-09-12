import {FETCH_API_MAINTAIN_REQUEST,
    FETCH_API_MAINTAIN_REQUEST_FAILED,
    FETCH_API_MAINTAIN_REQUEST_SUCCESS,
    POST_API_MAINTAIN,
    POST_API_MAINTAIN_SUCCESS,
    POST_API_MAINTAIN_FAILED,
    REMOVE_ITEM_MAINTAIN,
    REMOVE_ITEM_MAINTAIN_SUCCESS,
    REMOVE_ITEM_MAINTAIN_FAILED
} from "../ActionTypes";

 // Fetch Data
export const fetchAPIMaintainRequest = (locale, resolve, reject) => ({
    type: FETCH_API_MAINTAIN_REQUEST,
    payload: locale,
    resolve: resolve,
    reject: reject
  });

export const fetchAPIMaintainRequestSuccess = data => ({
  type: FETCH_API_MAINTAIN_REQUEST_SUCCESS,
  payload: data
});

export const fetchAPIMaintainRequestFailed = error => ({
  type: FETCH_API_MAINTAIN_REQUEST_FAILED,
  payload: error
});
 
//  Post
export const postItemMaintain = (requestId, resolve, reject) => ({
    type: POST_API_MAINTAIN,        
    requestId: requestId,
    resolve: resolve,
    reject: reject
  });
 
export const postItemMaintainSuccess = data => ({
    type: POST_API_MAINTAIN_SUCCESS,
    payload: data
  });

export const postItemMaintainFailed = error => ({
    type: POST_API_MAINTAIN_FAILED,
    payload: error
  });
  
// Delete
export const removeItemMaintain = (requestId, resolve, reject)  => ({
    type: REMOVE_ITEM_MAINTAIN,
    requestId: requestId,
    resolve: resolve,
    reject: reject
  });

export const removeItemMaintainSuccess = data => ({
    type: REMOVE_ITEM_MAINTAIN_SUCCESS,
    payload: data
  });

export const removeItemMaintainFailed = error => ({
    type: REMOVE_ITEM_MAINTAIN_FAILED,
    payload: error
  });
 