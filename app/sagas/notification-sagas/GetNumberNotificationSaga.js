import {FETCH_API_GET_NUMBER_NOTIFICATION_REQUEST}from "../../actions/ActionTypes";
import {takeEvery , takeLatest , put ,call} from "redux-saga/effects";
import {fetchGetNumberNotificationSuccess,fetchGetNumberNotificationFailed} from '../../actions'
import APIWorker from '../../services/APIWorker'

function* fetchApiGetNumberNotification(action) {
    try {
        try {
            const result = yield call(APIWorker.getNumberNotification)
            
            if (result.success){
                yield put(fetchGetNumberNotificationSuccess(result.data))
                action.resolve(result.data)
            } else {
                yield put(fetchGetNumberNotificationFailed(result))
                action.reject(result)
            }
        } catch (error) {
            yield put(fetchGetNumberNotificationFailed(error))
            action.reject(error)
        }
    } catch (error) {
        yield put(fetchGetNumberNotificationFailed(error))
        action.reject(error)
    }
}

export function* watchFetchGetNumberNotificationRequest() {
    yield takeLatest(FETCH_API_GET_NUMBER_NOTIFICATION_REQUEST, fetchApiGetNumberNotification);
}
