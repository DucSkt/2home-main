import { takeLatest , put } from 'redux-saga/effects';
import { CONNECT_CHANGE } from '../actions/ActionTypes';

function* changeInternet(action) {
  
}
export function* watchChangeInternet() {
  yield takeLatest(CONNECT_CHANGE, changeInternet);
}