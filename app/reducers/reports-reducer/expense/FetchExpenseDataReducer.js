import {
  RESET_STATE,
  FETCH_API_EXPENSE,
  FETCH_API_EXPENSE_FAILED,
  FETCH_API_EXPENSE_SUCCESS
} from '../../../actions/ActionTypes';

const INIT_STATE = {
  data: null,
  error: null,
  fetching: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_API_EXPENSE:
      return {
        data: null,
        error: null,
        fetching: true
      };
    case FETCH_API_EXPENSE_SUCCESS:
      return {
        data: action.payload,
        error: null,
        fetching: false
      };
    case FETCH_API_EXPENSE_FAILED:
      return {
        data: null,
        error: action.payload,
        fetching: false
      };
    case RESET_STATE:{
        return INIT_STATE
    }
    default:
      return state;
  }
};
