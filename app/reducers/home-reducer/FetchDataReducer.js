import {
  FETCH_API_DASHBOARD,
  FETCH_API_DASHBOARD_FAILED,
  FETCH_API_DASHBOARD_SUCCESS,
  RESET_STATE
} from '../../actions/ActionTypes';

const INIT_STATE = {
  data: null,
  error: null,
  fetching: false
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case FETCH_API_DASHBOARD:
      return {
        data: null,
        error: null,
        fetching: true
      };

    case FETCH_API_DASHBOARD_SUCCESS:
      return {
        data: action.payload,
        error: null,
        fetching: false
      };

    case FETCH_API_DASHBOARD_FAILED:
      return {
        data: null,
        error: action.payload,
        fetching: false
      };
    case RESET_STATE:
      return INIT_STATE
    default:
      return state;
  }
}
