import {FETCH_API_LIST_ROOM_REQUEST}from "../../actions/ActionTypes";
import {takeEvery , takeLatest , put ,call} from "redux-saga/effects";
import {fetchListRoomSuccess,fetchListRoomFailed} from '../../actions/reports/ListRoomAction'
import APIWorker from '../../services/APIWorker'

function* fetchApiListRoom(action) {
    try {
        try {
            const result = yield call(APIWorker.getPropertieById,action.payload.propertyId,action.payload.locale)
            
            if (result.success){
                yield put(fetchListRoomSuccess(result.data))
                action.resolve(result.data)
            } else {
                yield put(fetchListRoomFailed(result))
                action.reject(result)
            }
        } catch (error) {
            yield put(fetchListRoomFailed(error))
            action.reject(error)
        }
    } catch (error) {
        yield put(fetchListRoomFailed(error))
        action.reject(error)
    }
}

export function* watchFetchListRoomRequest() {
    yield takeLatest(FETCH_API_LIST_ROOM_REQUEST, fetchApiListRoom);
}
