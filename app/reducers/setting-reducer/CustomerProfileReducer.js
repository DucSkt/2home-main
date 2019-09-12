import {
  RESET_STATE,
  FETCH_API_CUSTOMER_PROFILE,
  FETCH_API_CUSTOMER_PROFILE_FAILED,
  FETCH_API_CUSTOMER_PROFILE_SUCCESS
} from '../../actions/ActionTypes';

const INIT_STATE = {
  data: null,
  error: null,
  fetching: false
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_API_CUSTOMER_PROFILE:
      console.log('reducer');
      return {
        data: null,
        error: null,
        fetching: true
      };
    case FETCH_API_CUSTOMER_PROFILE_SUCCESS:
      console.log('reducer');
      return {
        data: action.payload,
        error: null,
        fetching: false
      };

    case FETCH_API_CUSTOMER_PROFILE_FAILED:
      console.log('reducer');
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
