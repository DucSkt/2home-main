import {FETCH_API_ROOM_DETAIL}from "../../actions/ActionTypes";
import {takeEvery , takeLatest , put ,call} from "redux-saga/effects";
import {fetchRoomDetailFailed,fetchRoomDetailSuccess} from '../../actions/reports/RoomDetailAction'
import APIWorker from '../../services/APIWorker'
import _ from 'lodash'

function* fetchApiRoomDetail(action) {
    try {
        try {
            const result = yield call(APIWorker.getFacilitiesByPropertyId,action.payload.roomID,action.payload.locale)
            if (result.success){
                yield put(fetchRoomDetailSuccess(result.data))
                action.resolve(result.data)
            } else {
                yield put(fetchRoomDetailFailed(result))
                action.reject(result)
            }
        } catch (error) {
            yield put(fetchRoomDetailFailed(error))
            action.reject(error)
        }
    } catch (error) {
        yield put(fetchRoomDetailFailed(error))
        action.reject(error)
    }
}

export function* watchFetchRoomDetailRequest() {
    yield takeLatest(FETCH_API_ROOM_DETAIL, fetchApiRoomDetail);
}
