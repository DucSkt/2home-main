import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  FlatList,
  Image,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../localization';
import Styles from './Styles';
import ExitButton from '../../../components/close-button';
import Buttons from '../../../components/text-button/TextButton';
import CheckLanguage from './CheckLanguage';
import { changeLanguage } from '../../../actions';
import Constants  from '../../../common/Constants';

class ChangeLanguageScreen extends Component {
  state = {
    currentIndex: this.props.lang === 'en' ? 0:1,
    languageData: [
      { language: I18n.t('en'), key: 0 },
      { language: I18n.t('vi'), key: 1 },
    ],
    refresh: true
  };

  exitPress = () => {
    this.props.navigation.goBack();
  };

  onItemPress = index => {

    this.setState({ currentIndex: index, refresh: !this.state.refresh });
  };

  renderItem = (item, index) => {

    return (
      <View>
        <View style={Styles.underlined} />
        <View style={Styles.language}>
          <Text style={Styles.itemlanguage}> {item.language} </Text>
          <CheckLanguage
            onItemPress={this.onItemPress}
            index={index}
            isChecked={this.state.currentIndex === index}
          />
        </View>
      </View>
    )
  }

  render() {

    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <ExitButton style={Styles.exitButton} onPress={this.exitPress} />
          <Text style={Styles.textHeader}>{I18n.t('language')}</Text>
        </View>
        <View style={Styles.body}>
          <View>
            <FlatList
              extraData={this.state.refresh}
              data={this.state.languageData}
              renderItem={({ item, index }) => {
                return this.renderItem(item, index)
              }}
              keyExtractor={item => item.key.toString()}
            />
          </View>
          <Buttons style={Styles.button} onPress={this.onSelectLanguagePress}>
            <Text style={Styles.textInButton}>{I18n.t('savechange')}</Text>
          </Buttons>
        </View>
      </View>
    );
  }


   onSelectLanguagePress = () => {
    let selectedLang = this.state.languageData.filter(item => {
      return item.key === this.state.currentIndex
    })[0];

    if (selectedLang !== null) {
      if (selectedLang.key === 0) {
        this.props.changeLanguage('en');
      }
      else {
        this.props.changeLanguage('vi');
      }

    }

    this.props.navigation.goBack();
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.Language,
  }
}

export default connect(mapStateToProps, {changeLanguage})(ChangeLanguageScreen);
