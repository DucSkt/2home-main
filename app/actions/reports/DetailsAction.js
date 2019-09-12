import {
  FETCH_API_PROPERTIES_REQUEST,
  FETCH_API_PROPERTIES_SUCCESS,
  FETCH_API_PROPERTIES_FAILED
} from '../ActionTypes';

export const fetchPropertiesRequest = (locale,resolve,reject) => ({
    type: FETCH_API_PROPERTIES_REQUEST,
    payload:locale,
    resolve,
    reject,
  });

export const fetchPropertiesSuccess = data => ({
    type: FETCH_API_PROPERTIES_SUCCESS,
    data
  });

export const fetchPropertiesFailed = error => ({
    type: FETCH_API_PROPERTIES_FAILED,
    error
  });
