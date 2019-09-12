import {DECREASE_COUNTER, INCREASE_COUNTER, RESET_COUNTER} from "../actions/ActionTypes";

const INITIAL_STATE = {counter: 0};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREASE_COUNTER:
            return {
                ...state,
                counter: state.counter + action.payload.step
            };
        case DECREASE_COUNTER:
            return {
                ...state,
                counter: state.counter - action.payload.step
            };
        case RESET_COUNTER:
            return {
                ...state,
                counter: 0
            }
        default:
            return state;
    }
}