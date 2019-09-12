import React, { Component } from 'react'
import { View,SectionList,RefreshControl,StyleSheet,AlertIOS,ActivityIndicator,Text} from 'react-native'
import NotificationItem from './NotificationItem'
import { connect } from 'react-redux'
import I18n from '../../../localization'
import { withNavigation } from 'react-navigation';
import {Fonts} from '../../../themes'
import {
  fetchGetNumberNotificationRequest,
  fetchGetNotificationsRequest,
  fetchDeleteNotificationRequest,
  fetchPostNotificationsRequest
} from '../../../actions'
import NotifyConstant from '../Constant'
import EmptyPlaceholder from '../../empty-placeholder/EmptyPlaceholder';
import moment from 'moment'


const dateTime = moment(new Date()).format("MMM DD YYYY")
const INIT_DATA = [
  {title:I18n.t('recent'), data:[]},
  {title:I18n.t('latest'), data:[]},
]
class NotificationFlatList extends Component {
  state = {
    page:0,
    size:10,
    data:INIT_DATA,
    isOutOfData:false,
    isRefreshing:false,
  }
  async componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && error
    if (condition1 || condition2){
      this.handleRefresh();
    }
    if (nextProps.isChange){
        const data = await this.configNotification(nextProps.data)
        this.setState({data})
    }

  }

  getNotificationNewIdArr = () => {
    let {data} = this.props
    data = data.filter(item=>{
        return item.status === NotifyConstant.statusUnread
    }).map(item=>{
      return item.notificationId
    })
 
    return data
  };

  onPostNotification=(idArr)=>{
    this.props.fetchPostNotificationsRequest(idArr,()=>{
      //success
    }, error=>{
      AlertIOS.alert(I18n.t('error'), error.message);
    })
  }

  onPressItem=(item,index)=>{
    if (item.status === NotifyConstant.statusUnread){
      this.onPostNotification([item.notificationId])
    }
  }

  onDeleteItem = (item,index) => {
    this.props.fetchDeleteNotificationRequest(item.notificationId, () => {
    }, error =>{
      AlertIOS.alert(I18n.t('error'), error.message);
    })
  }


  handleFetchingData = ()=> {
    const { page, size } = this.state;
    this.props.fetchGetNotificationsRequest(page*size,size,this.props.lang,
      data => {

      },
      error =>{

        AlertIOS.alert(I18n.t('error'), error.message);
      },
      ()=>{
          this.setState({
          isOutOfData:true
        })
      })
   };
  handleRefresh = () => {
    this.setState(
      {
        page: 0,
        isOutOfData:false,
        isRefreshing:true
      },
      async () => {
        await this.handleFetchingData();
        await this.setState({isRefreshing:false})
      }
    );
  };


  renderRefreshControl=()=>{
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.handleRefresh}
      />
    )
  }

  renderItem=({item,index,section})=>{
    return (
        <NotificationItem
          onPressItem = {this.onPressItem}
          item = {item}
          onDeleteItem={this.onDeleteItem}
          index = {index}
        />
    )
  }

  renderSectionHeader = ({section}) => {
    return <Text style={[Fonts.style.h4SemiBold,styles.sectionTitle]}>{section.title}</Text>
  }

  renderFooter = () => {

    if (this.state.isOutOfData||this.state.isRefreshing||this.props.error||!this.props.fetching) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="small" />
      </View>
    );
  };


  handleLoadMore = () => {
    // Out of Notification
    if (this.state.isOutOfData||this.state.isRefreshing||this.props.fetching) return;

    setTimeout(()=>{
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.handleFetchingData();
        }
      );
    },1000)

  };

  componentDidMount() {
    this.handleRefresh();
  }

  configNotification = async (data)=>{
      let recent=[], latest=[]
      await data.forEach(element=>{
          if (moment(element.createdDate).format("MMM DD YYYY") === dateTime){
              recent.push(element)
          } else {
              latest.push(element)
          }
      })
      return await ([
        {title:I18n.t('recent'), data:recent},
        {title:I18n.t('latest'), data:latest},
      ])
  }

  render() {
    const {isConnectedInternet,error} = this.props;

    if (!isConnectedInternet && error){
      return <EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />;
    }

    return (
      <View style={[styles.container]}>
        <SectionList
          style={[styles.container]}
          sections={this.state.data}
          renderSectionHeader={ this.renderSectionHeader }
          renderItem={ this.renderItem}
          refreshControl = {this.renderRefreshControl()}
          ListFooterComponent={this.renderFooter}
          keyExtractor={ (item, index) => {

            return index.toString()
          } }
          stickySectionHeadersEnabled= {false}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
        /> 
      </View>
    )
  }

  componentDidUpdate(){
    if (this.props.error) return;
    let idNotifyArr = this.getNotificationNewIdArr()
    if (idNotifyArr.length <= 0) {
      return;
    }
    setTimeout(()=>{
      this.onPostNotification(idNotifyArr)
    },5000)
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  sectionList:{
    flex:1
  },
  sectionTitle:{marginLeft:16,marginTop:16}
})
const mapStateToProps = (state) => ({
    fetching:state.NotificationData.fetching,
    data:state.NotificationData.data,
    error:state.NotificationData.error,
    lang:state.Language,
    isChange:state.NotificationData.isChange,
    isConnectedInternet:state.InternetState.isConnectedInternet,
})
const mapDispatchToProps = {
  fetchGetNumberNotificationRequest,
  fetchGetNotificationsRequest,
  fetchDeleteNotificationRequest,
  fetchPostNotificationsRequest,
};
export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(NotificationFlatList))
