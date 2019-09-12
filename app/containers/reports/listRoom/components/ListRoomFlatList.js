import React, { Component } from 'react'
import { View ,RefreshControl,FlatList,AlertIOS} from 'react-native'
import PropTypes from 'prop-types'
import {flatListStyles} from './Styles'
import RoomItem from './RoomItem'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
import OccupancyCard from "./OccupancyCard";
import { fetchListRoomRequest } from '../../../../actions/reports/ListRoomAction';
import I18n from '../../../../localization'
import EmptyPlaceholder from '../../../empty-placeholder/EmptyPlaceholder';
class ListRoomFlatList extends Component {
  static propTypes = {
    propertyId : PropTypes.number,
  };

  onPressItem=(item,index)=>{
    this.props.navigation.navigate("DetailRoom",{unitId:item.unitId,title:item.title})
  }

  handleRefresh =() =>{
    const propertyId = this.props.propertyId
    this.props.fetchListRoomRequest(propertyId,this.props.lang, dataSuccess =>{

    }, error =>{
      AlertIOS.alert(I18n.t('error'), error.message);
    });
  };

  renderHeader = () => {
    if (this.props.occupancyInfo != null){
      const {occupied,total,vacant} = this.props.occupancyInfo
      return (
        <OccupancyCard
          leftValue={occupied}
          rightValue={vacant}
        />
      );
    }
    return null
  };

  componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && error
    if (condition1 || condition2){
      this.handleRefresh();
    }
  }

  renderRefreshControl(){
    return (
      <RefreshControl
        refreshing={this.props.fetching}
        onRefresh={this.handleRefresh}
      />
    )
  }

  renderItem=({item,index})=>{
    return (
      <RoomItem
        onPressItem = {this.onPressItem}
        item = {item}
        index = {index}
        lang = {this.props.lang}
      />
    )
  }

  componentDidMount() {
    this.handleRefresh();
  }

  render() {
    const { data,isConnectedInternet } = this.props;
    if (!isConnectedInternet && data.length===0){
      return <EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />;
    }
    return (
      <View style={[flatListStyles.container]}>
        <FlatList
          style ={flatListStyles.flatList}
          data={data}
          ListHeaderComponent ={this.renderHeader}
          renderItem={this.renderItem}
          keyExtractor={item => item.unitId.toString()}
          refreshControl = {this.renderRefreshControl()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  data:state.ListRoomReducer.data!=null?state.ListRoomReducer.data.units:[],
  fetching:state.ListRoomReducer.fetching,
  error:state.ListRoomReducer.error,
  occupancyInfo:state.ListRoomReducer.data!=null?state.ListRoomReducer.data.occupancy:null,
  lang:state.Language,
  isConnectedInternet:state.InternetState.isConnectedInternet,
})

const mapDispatchToProps = {
  fetchListRoomRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ListRoomFlatList))
