import {
  REGISTER_DEVICE,
  REGISTER_DEVICE_SUCCESS,
  REGISTER_DEVICE_FAILED
} from './ActionTypes';


export const registerDevice = (uuid, deviceToken) => ({
    type: REGISTER_DEVICE,
    payload: {uuid, deviceToken},
  });

export const registerDeviceSuccess = (uuid, deviceToken) => ({
  type: REGISTER_DEVICE_SUCCESS,
  payload: {uuid, deviceToken},
});

export const registerDeviceFailed = error => ({
  type: REGISTER_DEVICE_FAILED,
  payload: error
});
