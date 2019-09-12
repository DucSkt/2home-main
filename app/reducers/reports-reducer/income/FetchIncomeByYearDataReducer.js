import {
  RESET_STATE,
  FETCH_API_INCOME_BY_YEAR,
  FETCH_API_INCOME_BY_YEAR_SUCCESS,
  FETCH_API_INCOME_BY_YEAR_FAILED
} from '../../../actions/ActionTypes';

const INIT_STATE = {
  data: null,
  error: null,
  fetching: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_API_INCOME_BY_YEAR:
      return {
        data: null,
        error: null,
        fetching: true
      };
    case FETCH_API_INCOME_BY_YEAR_SUCCESS:
      return {
        data: action.payload,
        error: null,
        fetching: false
      };
    case FETCH_API_INCOME_BY_YEAR_FAILED:
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
