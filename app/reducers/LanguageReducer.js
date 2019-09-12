import { CHANGE_LANGUAGE } from "../actions/ActionTypes";

const INITIAL_STATE = "en";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return action.payload;
        default:
            return state;
    }
}
