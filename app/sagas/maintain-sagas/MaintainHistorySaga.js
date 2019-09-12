import {
  fetchAPIMaintainHistorySuccess,
  fetchAPIMaintainHistoryFailed
}from "../../actions";
import {takeEvery , takeLatest , put ,call} from "redux-saga/effects";
import APIWorker from '../../services/APIWorker';
import {
  FETCH_API_MAINTAIN_HISTORY
} from '../../actions/ActionTypes';
function* fetchApi(action) {
  try {
    try {
      const result = yield call(APIWorker.getHistorysByLocale, action.from , action.size , action.locale);
      console.log("get history reuquest: ",result)
      if (result.success) {
        if (result.data.length<action.size){
          action.onOutOfData();
        }
        yield put(fetchAPIMaintainHistorySuccess(action.from,result.data));
        action.resolve(result.data);
      }
      else {
        yield put(fetchAPIMaintainHistoryFailed(result));
        action.reject(result);
        action.onOutOfData();
      }
    } catch (error) {
      yield put(fetchAPIMaintainHistoryFailed(error));
      action.reject(error);
      action.onOutOfData();
    }
  
  } catch (error) {
    yield put(fetchAPIMaintainHistoryFailed(error));
    action.reject(error);
    action.onOutOfData();
  }
}

export function* watchFetchMaintainHistory() {
    yield takeLatest(FETCH_API_MAINTAIN_HISTORY, fetchApi);
}


  