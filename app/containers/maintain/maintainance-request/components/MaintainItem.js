import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Styles from './Style';
import I18n from '../../../../localization';
import {Colors} from '../../../../themes';
import TextWithSubcribe from '../../../../components/TitleWithSubscribe'
import moment from 'moment';
import Button from '../../../../components/text-button/TextButton'
import { currencyTranslate } from '../../../../common/currencyTranslate';
export default class MaintainItem extends Component {

  settingOneLine = (line=1)=> ({ellipsizeMode:"tail",numberOfLines:line})

  renderHeader = ()=>{
    const {propertyName,unitName} = this.props.data
    return (
      <View style={[Styles.header]} >          
        <Text 
          style={[Styles.nameInHeader]} 
           {...this.settingOneLine()}>
          {propertyName} - {unitName}
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
  onAccept = ()=>{
    this.props.onAccept(this.props.index,this.props.data)    
  }
  onReject =()=>{
    this.props.onReject(this.props.index,this.props.data)    
  }
  render2SubmitsButton=()=>{
    return (
      <View style={Styles.submitContainer} >
        <Button style={[Styles.submitButton, { borderColor: Colors.red }]} onPress={this.onReject} >
            <Text style={[Styles.submitText , {color: Colors.red } ]} >
              {I18n.t("reject")}
            </Text>
        </Button>

        <Button style={[Styles.submitButton, { borderColor: Colors.green }]} onPress={this.onAccept} >
          <Text style={[Styles.submitText , { color: Colors.green } ]} >
              {I18n.t("accept")}
            </Text>
          </Button> 
      </View>
    )
  }

  render() {
    return (
      <View style={Styles.container} >
          {this.renderHeader()}
          <View style={Styles.line} />
          {this.renderBody()}
          {this.render2SubmitsButton()}
      </View>
    )
  }
}

