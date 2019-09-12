import {
    FETCH_API_ROOM_DETAIL,
    FETCH_API_ROOM_DETAIL_FAILED,
    FETCH_API_ROOM_DETAIL_SUCCESS
  } from '../ActionTypes';
  
  export const fetchRoomDetailRequest = (roomID,locale,resolve,reject) => ({
      type: FETCH_API_ROOM_DETAIL,
      payload:{roomID,locale},
      resolve,
      reject,
    });
  
  export const fetchRoomDetailSuccess = data => ({
      type: FETCH_API_ROOM_DETAIL_SUCCESS,
      data
    });
  
  export const fetchRoomDetailFailed = error => ({
      type: FETCH_API_ROOM_DETAIL_FAILED,
      error
    });
  