import {
    FETCH_API_GET_NUMBER_NOTIFICATION_REQUEST, 
    FETCH_API_GET_NUMBER_NOTIFICATION_SUCCESS, 
    FETCH_API_GET_NOTIFICATIONS_REFRESH,
    RESET_STATE,
    FETCH_API_POST_NOTIFICATIONS_SUCCESS,
    FETCH_API_GET_NUMBER_NOTIFICATION_FAILED} from "../../actions/ActionTypes";

const INIT_STATE = {
    data:null,
    error:null,
    fetching: false
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_API_GET_NUMBER_NOTIFICATION_REQUEST:
            return {
                data:null,
                error:null,
                fetching: true,
            };
        case FETCH_API_GET_NUMBER_NOTIFICATION_SUCCESS:
            return {
                data:action.data,
                error:null,
                fetching: false
            };
        case FETCH_API_POST_NOTIFICATIONS_SUCCESS:{
            return {
                ...state,
                data:0
            }
        }
        case FETCH_API_GET_NUMBER_NOTIFICATION_FAILED:
            return {
                data:null,
                error:action.error,
                fetching: false
            };
        case FETCH_API_GET_NOTIFICATIONS_REFRESH:{
            if (state.data===0){
                return {
                    ...state,
                    data:0
                };
            }
            return state;
        }
        case RESET_STATE:{
            return INIT_STATE
        }
        default:
            return state;
    }
}