import {
    RESET_STATE,
    FETCH_API_POST_NOTIFICATIONS_FAILED, 
    FETCH_API_POST_NOTIFICATIONS_REQUEST, 
    FETCH_API_POST_NOTIFICATIONS_SUCCESS} from "../../actions/ActionTypes";

const INIT_STATE = {
    success:false,
    error:null,
    fetching: false
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_API_POST_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                error:null,
                fetching: true,
            };
        case FETCH_API_POST_NOTIFICATIONS_SUCCESS:
            return {
                success:true,
                error:null,
                fetching: false
            };
        case FETCH_API_POST_NOTIFICATIONS_FAILED:
            return {
                success:false,
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