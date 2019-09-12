import { CHANGE_LANGUAGE } from './ActionTypes';
import { AsyncStorage } from 'react-native';
import Constants from '../common/Constants';
import I18n from '../localization/I18n';


export const changeLanguage = (lang) => {

  I18n.locale = lang;
  AsyncStorage.setItem(Constants.Language,lang);

  return {
    type: CHANGE_LANGUAGE,
    payload: lang
  };
}
