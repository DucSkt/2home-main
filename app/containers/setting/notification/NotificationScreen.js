import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  FlatList,
  Image
} from 'react-native';
import I18n from '../../../localization';
import Styles from './Styles';
import ExitButton from '../../../components/close-button';
import Buttons from '../../../components/text-button/TextButton';
import CheckNotification from './CheckNotification';

export default class NotificationScreen extends Component {
  state = { currentIndex: 0 };

  exitPress = () => {
    this.props.navigation.goBack();
  };

  onItemPress = index => {
    this.setState({ currentIndex: index });
  };

  renderItem = ({ item, index }) => (
    <View>
      <View style={Styles.underlined} />
      <View style={Styles.notification}>
        <Text style={Styles.itemnotification}> {item.notification} </Text>
        <CheckNotification onItemPress={this.onItemPress} index={index} />
      </View>
    </View>
  );

  render() {
    console.log('currentIndex', this.state.currentIndex);
    const data = [
      { notification: 'Email', key: '1' },
      { notification: 'Text message', key: '2' },
      { notification: 'Phone', key: '3' }
    ];

    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <ExitButton style={Styles.exitButton} onPress={this.exitPress} />
          <Text style={Styles.textHeader}>{I18n.t('notification')}</Text>
        </View>
        <View style={Styles.body}>
          <View>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={item => item.key.toString()}
            />
          </View>
          <Buttons style={Styles.button}>
            <Text style={Styles.textInButton}>{I18n.t('savechange')}</Text>
          </Buttons>
        </View>
      </View>
    );
  }
}
