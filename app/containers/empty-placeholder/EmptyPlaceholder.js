import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Images } from '../../themes';
import Buttons from '../../components/text-button/TextButton';
import Styles from './Styles';
import I18n from '../../localization';

export default class NoInternet extends Component {
  render() {
    return (
      <View style={Styles.container} >

        <View style={Styles.emptyView} >
        </View>

        <View style={Styles.body} >
          <View style={Styles.imageView} >
            <Image style={Styles.image} resizeMode="contain" source={Images.nowifi} />
          </View>
          <View style={Styles.placeholder} >    
            <Text style={Styles.textNoInternet} >{I18n.t('nointernetconnection')}</Text>
            <Text style={Styles.textCheckInternet} >{I18n.t('pleasecheckyourconnection')}</Text>
            <Buttons style={Styles.button} onPress={this.props.onPressPlaceholder} >   
              <Text style={Styles.textButton}>{I18n.t('reload')}</Text>
            </Buttons>
          </View>
        </View>

        <View style={Styles.emptyView} >
        </View>

      </View>
    )
  }
}