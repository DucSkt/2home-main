import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Styles from './Style';
import I18n from '../../../../localization';
import {Colors} from '../../../../themes';
import PropTypes from 'prop-types'
import TextWithSubcribe from '../../../../components/TitleWithSubscribe'
import moment from 'moment';
import { currencyTranslate } from '../../../../common/currencyTranslate';

export default class MaintainItem extends Component {
  settingOneLine = (line=1)=> ({ellipsizeMode:"tail",numberOfLines:line})
  
  checkTimeIsToday =(modifiedDate)=>{
    return moment(modifiedDate).isSame(Date.now(), 'date')
  }

  renderTimeSubmit = () => {
    if (!this.props.data.isRenderTime) return <View />
    const {modifiedDate} = this.props.data
    const time = this.checkTimeIsToday(modifiedDate)?I18n.t('today'):moment(modifiedDate).format("MMM DD YYYY")
    return (
        <View style={{ paddingLeft:16,paddingBottom:14,paddingRight:16}} >
          <Text style={Styles.textClientAccept}>{time}</Text>
        </View>
      )
  }
    
  renderHeader = ()=>{
    const {propertyName,unitName,status,modifiedDate} = this.props.data
    const headerBackground = status==="Accepted"?Colors.green:Colors.red // "Accepted" or "Rejected"
    return (
      <View style={[Styles.header,{backgroundColor:headerBackground}]} >          
        <Text 
          style={[Styles.nameInHeader]} 
           {...this.settingOneLine()}>
          {propertyName} - {unitName}
        </Text>  
        <Text 
          style={[Styles.dateModify]} >
          {moment(modifiedDate).format("HH:mmA")}
        </Text>  
      </View>
    )
  }
  renderBody=()=>{
    const {cost,problem,solution,submittedDate} = this.props.data
    return (
      <View style={Styles.body} >
        <TextWithSubcribe 
          title = {I18n.t('problem')}
          subcribe = {problem}
        />
        <View style ={Styles.solutionContainer}>
          <TextWithSubcribe 
            title = {I18n.t('solution')}
            subcribe = {solution}
            style = {{flex:4}}
          />
          <TextWithSubcribe 
            title = {I18n.t('cost')}
            subcribe = {currencyTranslate(cost, this.props.lang, I18n.t('currency'))}
            style ={{flex:1}}
          />
        </View>
        <TextWithSubcribe 
          title = {I18n.t('dateSubmited')}
          subcribe = {moment(submittedDate).format("MMMM, Do, YYYY")}
          style={{marginTop:16}}
        /> 
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderTimeSubmit()}
        <View style={Styles.container} >
            {this.renderHeader()}
            <View style={Styles.line} />
            {this.renderBody()}
        </View>        
      </View>

    )
  }
}

