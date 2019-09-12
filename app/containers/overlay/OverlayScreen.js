import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import styles from './styles';

export default class OverlayScreen extends Component {
    render() {
        const content = this.props.navigation.getParam('content');
        return (
            <View  style={styles.container}>
              {content()}
            </View>
        );
    }
}
