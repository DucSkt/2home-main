import {FETCH_API_LIST_ROOM_REQUEST, FETCH_API_LIST_ROOM_REQUEST_SUCCESS, FETCH_API_LIST_ROOM_REQUEST_FAILED} from "../ActionTypes";

export const fetchListRoomRequest = (propertyId,locale, resolve, reject) => {
    return {
        type:FETCH_API_LIST_ROOM_REQUEST,
        payload:{propertyId,locale},
        resolve,
        reject
    };
}

export const fetchListRoomSuccess = (data) => {
    return {
        type: FETCH_API_LIST_ROOM_REQUEST_SUCCESS,
        data
    };
}

export const fetchListRoomFailed = (error) => {
    return {
        type: FETCH_API_LIST_ROOM_REQUEST_FAILED,
        error
    }
}