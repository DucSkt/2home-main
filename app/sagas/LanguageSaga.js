import { CHANGE_LANGUAGE } from '../actions/ActionTypes';
import I18n from '../localization/I18n';
import { AsyncStorage } from 'react-native';
import Constants from '../common/Constants';

function* fetchLanguage(action) {
    const payload = action.payload;
    I18n.locale = payload;

    AsyncStorage.setItem(payload, Constants.Language);

}

export function* watchFetchLanguage() {
  yield takeLatest(CHANGE_LANGUAGE, fetchLanguage);
}
