import { 
    RESET_STATE,
    CHANGE_PASSWORD_SUCCESS, 
    CHANGE_PASSWORD_FAILED } from "../../actions/ActionTypes";

const INIT_STATE = "";
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_SUCCESS: 
            return [...state, action.payload];
        case CHANGE_PASSWORD_FAILED:
             return [...state, action.payload];
        case RESET_STATE:{
            return INIT_STATE
        }
        default:
            return state;
    }
}
