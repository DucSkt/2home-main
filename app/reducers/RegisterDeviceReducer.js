import { REGISTER_DEVICE,
  REGISTER_DEVICE_SUCCESS,
  REGISTER_DEVICE_FAILED,
  RESET_STATE
 } from "../actions/ActionTypes";

const INITIAL_STATE = {
  uuid: '',
  deviceToken: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
      case REGISTER_DEVICE_SUCCESS:
          return action.payload;
      case RESET_STATE:
          return INIT_STATE;
      default:
          return state;
  }
}
