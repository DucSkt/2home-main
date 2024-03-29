import {
    RESET_STATE,
    FETCH_API_LIST_ROOM_REQUEST, 
    FETCH_API_LIST_ROOM_REQUEST_SUCCESS, 
    FETCH_API_LIST_ROOM_REQUEST_FAILED} from "../../actions/ActionTypes";

const INIT_STATE = {
    data:null,
    error:null,
    fetching: false
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_API_LIST_ROOM_REQUEST:
            return {
                data:null,
                error:null,
                fetching: true,
            };
        case FETCH_API_LIST_ROOM_REQUEST_SUCCESS:
            return {
                data:action.data,
                error:null,
                fetching: false
            };
        case FETCH_API_LIST_ROOM_REQUEST_FAILED:
            return {
                data:null,
                error:action.error,
                fetching: false
            };
        case RESET_STATE:{
            return INIT_STATE
        }
        default:
            return state;
    }
}