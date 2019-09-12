import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Styles from './styles';
export default class ButtonLogin extends Component {
    render() {
        return (
            <TouchableOpacity 
             style={[Styles.ButtonLogin,this.props.style]}
             onPress={this.props.onPress}
            >
                {this.props.children}
            </TouchableOpacity>
        )
    }
}