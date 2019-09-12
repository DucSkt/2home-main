import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Spinner from 'react-native-spinkit';
import { Colors } from '../../themes';

import styles from './styles';

export default class OverlayScreen extends Component {
    render() {
        const content = this.props.navigation.getParam('content');
        return (
            <View  style={styles.container}>
              <Spinner isVisible={true} size={50} type={'Arc'} color={Colors.orange}/>
            </View>
        );
    }
}
