import {
  RESET_STATE,
  FETCH_API_TENANT,
  FETCH_API_TENANT_SUCCESS,
  FETCH_API_TENANT_FAILED
} from '../../actions/ActionTypes';

const INIT_STATE = {
  data: null,
  error: null,
  fetching: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_API_TENANT:
      return {
        data: null,
        error: null,
        fetching: true
      };
    case FETCH_API_TENANT_SUCCESS:
      return {
        data: action.payload,
        error: null,
        fetching: false
      };
    case FETCH_API_TENANT_FAILED:
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
