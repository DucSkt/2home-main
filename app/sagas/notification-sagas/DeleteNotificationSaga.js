import {FETCH_API_DELETE_NOTIFICATIONS_REQUEST}from "../../actions/ActionTypes";
import {takeLatest , put ,call} from "redux-saga/effects";
import {fetchDeleteNotificationFailed,fetchDeleteNotificationSuccess} from '../../actions'
import APIWorker from '../../services/APIWorker'

function* fetchApiDeleteNotification(action) {
    try {
        try {

            const result = yield call(APIWorker.deleteNotification,action.payload)
            
            if (result.success){
                yield put(fetchDeleteNotificationSuccess(action.payload,result.data))
                action.resolve()
            } else {
                yield put(fetchDeleteNotificationFailed(result))
                action.reject(result)
            }
        } catch (error) {
            yield put(fetchDeleteNotificationFailed(error))
            action.reject(error)
        }
    } catch (error) {
        yield put(fetchDeleteNotificationFailed(error))
        action.reject(error)
    }
}

export function* watchDeleteNotificationRequest() {
    yield takeLatest(FETCH_API_DELETE_NOTIFICATIONS_REQUEST, fetchApiDeleteNotification);
}
