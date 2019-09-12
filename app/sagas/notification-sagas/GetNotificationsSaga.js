import {
    FETCH_API_GET_NOTIFICATIONS_REQUEST,
    FETCH_API_GET_NOTIFICATIONS_OUT,
    FETCH_API_GET_NOTIFICATIONS_REFRESH
}from "../../actions/ActionTypes";
import {all , takeLatest , put ,call} from "redux-saga/effects";
import {
    fetchGetNotificationsRefresh,
    fetchGetNotificationsFailed,
    fetchGetNotificationsSuccess} from '../../actions'
import APIWorker from '../../services/APIWorker'

function* fetchApiGetNotifications(action) {
    try {
        try {
            let result = yield call(APIWorker.getNotificationsData,action.payload.from,action.payload.size,action.payload.locale)
            if (result.success){
                if (result.data.length === 0 ){
                    action.outOfData();
                    return;
                }
                if (result.data.length<action.payload.size){
                    action.outOfData();
                }
                yield put(fetchGetNotificationsSuccess(result.data,action.payload.from))
                // current page data. NOT ALL data
                action.resolve(result.data)
            } else {
                yield put(fetchGetNotificationsFailed(result))
                action.reject(result)
                action.outOfData();
            }
        } catch (error) {
            yield put(fetchGetNotificationsFailed(error))
            action.reject(error)
            action.outOfData();
        }
    } catch (error) {
        yield put(fetchGetNotificationsFailed(error))
        action.reject(error)
        action.outOfData();
    }
}

export function* watchFetchGetNotificationsRequest() {
    yield takeLatest(FETCH_API_GET_NOTIFICATIONS_REQUEST, fetchApiGetNotifications);
}
