import { FETCH_API_TENANT, FETCH_API_TENANT_SUCCESS,FETCH_API_TENANT_FAILED } from '../ActionTypes';

export const fetchAPITenant = (locale, resolve, reject) => ({
  type: FETCH_API_TENANT,
  payload: locale,
  resolve,
  reject
});

export const fetchAPITenantSuccess = data => ({
  type: FETCH_API_TENANT_SUCCESS,
  payload: data
});

export const fetchAPITenantFailed = data => ({
  type: FETCH_API_TENANT_FAILED,
  payload: data
});
