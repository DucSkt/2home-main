import React, { Component } from 'react'
import { View,FlatList,RefreshControl,AlertIOS, ScrollView} from 'react-native'
import {flatListStyles} from './Styles'
import ResidenceItem from './ResidenceItem'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
import {fetchPropertiesRequest} from '../../../../actions/reports/DetailsAction'
import I18n from "../../../../localization";
import EmptyPlaceholder from '../../../empty-placeholder/EmptyPlaceholder';
class ResidenceFlatList extends Component {

  onPressItem=(item,index)=>{
    this.props.navigation.navigate("ListRoomScreen",{propertyId:item.propertyId, title:item.title})
  }

  componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && error
    if (condition1 || condition2){
      this.handleRefresh();
    }
  }

  handleRefresh =()=>{
    this.props.fetchPropertiesRequest(this.props.lang,data =>{

    }, error =>{
      AlertIOS.alert(I18n.t("error"), error.message);
    });
  };

  renderRefreshControl=()=>{
    return (
      <RefreshControl
        refreshing={this.props.fetching}
        onRefresh={this.handleRefresh}
      />
    )
  }

  renderItem=({item,index})=>{
    return (
        <ResidenceItem
          onPressItem = {this.onPressItem}
          item = {item}
          index = {index}
        />
    )
  }


  componentDidMount() {
    this.handleRefresh();
  }

  renderSuccessScreen =()=>{

    return (
      <View style={[flatListStyles.container]}>
        <FlatList
          style ={flatListStyles.flatList}
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.propertyId.toString()}
          refreshControl = {this.renderRefreshControl()}
        />
      </View>
    )
  }
  render() {
    if (!this.props.isConnectedInternet && this.props.data.length===0){
      return <EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />;
    }
    return this.renderSuccessScreen()
  }
}

const mapStateToProps = (state) => ({
    fetching:state.DetailsReducer.fetching,
    data:state.DetailsReducer.data!=null?state.DetailsReducer.data:[],
    error:state.DetailsReducer.error,
    lang:state.Language,
    isConnectedInternet:state.InternetState.isConnectedInternet,
})

const mapDispatchToProps = {
  fetchPropertiesRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ResidenceFlatList))
