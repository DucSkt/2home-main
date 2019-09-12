import { 
CONNECT_CHANGE } from "../actions/ActionTypes";

const INIT_STATE = {isConnectedInternet:true};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CONNECT_CHANGE:
            return {isConnectedInternet:action.payload};          
        default:
            return state;
    }
}
