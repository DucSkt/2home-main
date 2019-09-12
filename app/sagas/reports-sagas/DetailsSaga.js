import {FETCH_API_PROPERTIES_REQUEST}from "../../actions/ActionTypes";
import {takeEvery , takeLatest , put ,call} from "redux-saga/effects";
import {fetchPropertiesSuccess,fetchPropertiesFailed} from '../../actions/reports/DetailsAction'
import APIWorker from '../../services/APIWorker'

function* fetchApiProperty(action) {
    try {
        try {
            const result = yield call(APIWorker.getPropertiesByLocale,action.payload)
            
            if (result.success){
                yield put(fetchPropertiesSuccess(result.data))
                action.resolve(result.data)
            } else {
                yield put(fetchPropertiesFailed(result))
                action.reject(result)
            }
        } catch (error) {
            yield put(fetchPropertiesFailed(error))
            action.reject(error)
        }
    } catch (error) {
        yield put(fetchPropertiesFailed(error))
        action.reject(error)
    }
}

export function* watchFetchPropertiesRequest() {
    yield takeLatest(FETCH_API_PROPERTIES_REQUEST, fetchApiProperty);
}
