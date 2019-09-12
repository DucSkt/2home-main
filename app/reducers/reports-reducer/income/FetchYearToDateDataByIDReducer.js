import {
  RESET_STATE,
  FETCH_API_INCOME_YEAR_TO_DATE_BY_ID,
  FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_SUCCESS,
  FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_FAILED,
  REFRESH_INCOME_YEAR_TO_DATE_DATA
} from '../../../actions/ActionTypes';

const INIT_STATE = {
  data: null,
  error: null,
  fetching: false
};

const createSuccessState = (action, state) => {
  const result = [];

  if (state.data) {
    result.push(...state.data);
    result.push({ id: action.id, data: action.payload });
  } else {
    result.push({ id: action.id, data: action.payload });
  }
  return {
    data: result,
    error: null,
    fetching: false
  };
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_API_INCOME_YEAR_TO_DATE_BY_ID:
      return {
        data: state.data,
        error: null,
        fetching: true
      };
    case FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_SUCCESS:
      return createSuccessState(action, state);
    case FETCH_API_INCOME_YEAR_TO_DATE_BY_ID_FAILED:
      return {
        data: null,
        error: action.payload,
        fetching: false
      };
    case REFRESH_INCOME_YEAR_TO_DATE_DATA:
      return INIT_STATE;
    case RESET_STATE:{
        return INIT_STATE
    }    
    default:
      return state;
  }
};
