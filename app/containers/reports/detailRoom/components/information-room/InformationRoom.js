import React, { Component } from 'react';
import { Text, View, Image, FlatList,TouchableOpacity,AlertIOS ,ScrollView} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import {Images, Fonts} from '../../../../../themes';
import AmenitiesInfo from './information-item/AmenitiesInfo';
import TitleItem from './information-item/TitleItem'
import Styles from './Styles';
import {
  Famillies,
  Entertainment,
  Facilities
} from '../../../../../common/AmenitiesConst';
import I18n from '../../../../../localization';
import moment from 'moment';

class InformationRoom extends Component {

  listToTree(list) {
    var map = {};
    var node;
    var roots = [];
    for (let [index, value] of list.entries()) {
      map[value.estateFeatureId] = index; //initialize mapper
      list[index].children = [] //initialize children
    }

    for (let [index, value] of list.entries()) {
      node = value;
      if (node.featureCategoryId !== 0) {
        list[map[node.featureCategoryId]].children.push(node);
      }
      else {
        roots.push(node);
      }
    }

    return roots;
  }

  renderAmenities = () => {
    const data = this.props.data
    if (!data) return <View />
    let tree = this.listToTree(data['features'].slice());
    console.log(tree);
    return tree.map((element,index) => (
        <View style={Styles.viewAllService} key ={index}>
            <Text style={Styles.textService}>{element.description}</Text>
            <AmenitiesInfo
              featureChildren = {element.children}
            />
        </View>
      ));
  };

  renderRightComponent = (title)=>{

    return (<Text style = {Styles.textRight}>{title}</Text>)
  }

  onPressTenantDetail = ()=>{
    AlertIOS.alert("On Detail User")
  }
  
  renderRentalStatus = () => {
    const {rentalStatus} = this.props.data
    if (!rentalStatus) return <View/>
    const rentalStartDate = moment(rentalStatus.rentalStartDate).format("MMMM Do YYYY")
    const rentalEndDate = moment(rentalStatus.rentalEndDate).format("MMMM Do YYYY")
    const totalMonthBehind = `${rentalStatus.totalMonthBehind} ${I18n.t('months')}`
    return (
      <View style={Styles.viewRentalStatus}>
          <Text style={Styles.textRentalStatus}>{I18n.t("rentalStatus")}</Text>
          <TitleItem
            hasDividerBottom ={true}
            hasDividerTop = {false}
            title={I18n.t("tenantName")}
            leftContainerStyle = {{flex:3}}   
            rightContainerStyle ={{flex:4}}     
            rightComponent = {this.renderRightComponent(rentalStatus.tenantName||"")}
          />
          <TitleItem
            hasDividerBottom ={true}
            hasDividerTop = {false}
            title={I18n.t("tenantPhone")}
            leftContainerStyle = {{flex:4}}   
            rightContainerStyle ={{flex:3}}     
            rightComponent={this.renderRightComponent(rentalStatus.tenantPhone||"")}
          />
          <TitleItem
            hasDividerBottom ={true}
            hasDividerTop = {false}
            title={I18n.t('rentalEmail')}
            leftContainerStyle = {{flex:3}}   
            rightContainerStyle ={{flex:4}}     
            rightComponent={this.renderRightComponent(rentalStatus.tenantEmail||"")}
          />
          <TitleItem
            hasDividerBottom ={true}
            hasDividerTop = {false}
            leftContainerStyle = {{flex:3}}   
            rightContainerStyle ={{flex:4}}     
            title={I18n.t("paymentDate")}
            rightComponent={this.renderRightComponent(rentalStatus.paymentDate)}
          />
          <TitleItem
            hasDividerBottom ={true}
            hasDividerTop = {false}
            title={I18n.t('rentalStartDate')}
            leftContainerStyle = {{flex:3}}   
            rightContainerStyle ={{flex:4}}     
            rightComponent={this.renderRightComponent(rentalStartDate)}
          />
          <TitleItem
            hasDividerBottom ={true}
            hasDividerTop = {false}
            title={I18n.t('rentalEndDate')}
            leftContainerStyle = {{flex:3}}   
            rightContainerStyle ={{flex:4}}     
            rightComponent={this.renderRightComponent(rentalEndDate)}
          />
          <TitleItem
            hasDividerBottom ={true}
            hasDividerTop = {false}
            title={I18n.t('totalMonthBehind')}
            leftContainerStyle = {{flex:3}}   
            rightContainerStyle ={{flex:4}}      
            rightComponent={this.renderRightComponent(totalMonthBehind)}
          />
      </View>
    );
  }

  renderInformation = () => {
    const { bathRooms, bedRooms, squareMeters } = this.props.data;
    return (
      <ScrollView 
      horizontal = {true}
      contentContainerStyle={{flex:1,justifyContent:'center'}}
      showsHorizontalScrollIndicator={false} >
        <View style={Styles.parameterContainer}>
          <View style={Styles.parameterRow}>
            <Image style={[Styles.iconNextText]} source={Images.size} />
            <Text style={Styles.textNextIcon}>
              {squareMeters}
              m2
            </Text>
          </View>
          <View style={Styles.parameterRow}>
            <Image style={Styles.iconNextText} source={Images.bathroom} />
            <Text style={Styles.textNextIcon}>
              {bathRooms} {I18n.t('baths')}
            </Text>
          </View>
          <View style={Styles.parameterRow}>
            <Image style={Styles.iconNextText} source={Images.bedroom} />
            <Text style={Styles.textNextIcon}>
              {bedRooms} {I18n.t('beds')}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  render() {
    if (!this.props.data) return <View />;
    return (
      <View style={Styles.container}>
        <View style={{marginLeft:16,marginRight:16 }}>
          <View style={Styles.underlined}></View>
          <Text style={[Styles.textinformation,Fonts.style.featureTitle]}>{I18n.t('information')}</Text>
        </View>
        {this.renderInformation()}
        <View style={{marginLeft:16,marginRight:16 }}>
          <Text style={[Styles.textAmenities,Fonts.style.featureTitle]}>{I18n.t('amennities')}</Text>
        </View>
        {this.renderAmenities()}
        {this.renderRentalStatus()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.RoomDetailReducer.data
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InformationRoom);
