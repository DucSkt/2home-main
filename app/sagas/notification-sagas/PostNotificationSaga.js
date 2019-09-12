import {FETCH_API_POST_NOTIFICATIONS_REQUEST}from "../../actions/ActionTypes";
import {takeLatest , put ,call, select} from "redux-saga/effects";
import {fetchPostNotificationsFailed,fetchPostNotificationsSuccess} from '../../actions'
import APIWorker from '../../services/APIWorker'

function* fetchApiPostNotifications(action) {
    try {
        try {

            const result = yield call(APIWorker.postNotification,action.payload)

            if (result.success){
                
                yield put(fetchPostNotificationsSuccess(action.payload))
                action.resolve()
            } else {
                yield put(fetchPostNotificationsFailed(result))
                action.reject(result)
            }
        } catch (error) {
            yield put(fetchPostNotificationsFailed(error))
            action.reject(error)
        }
    } catch (error) {
        yield put(fetchPostNotificationsFailed(error))
        action.reject(error)
    }
}

export function* watchPostNotificationsRequest() {
    yield takeLatest(FETCH_API_POST_NOTIFICATIONS_REQUEST, fetchApiPostNotifications);
}
