import React, { Component } from 'react'
import { View, FlatList, RefreshControl ,AlertIOS,Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles'
import I18n from '../../../localization'
import ItemMaintain from './components/MaintainItem';
import {fetchAPIMaintainRequest,removeItemMaintain,postItemMaintain} from '../../../actions/maintain/MaintainRequestAction';
import TitleTab from '../components/TitleTab';
import EmptyPlaceholder from '../../empty-placeholder/EmptyPlaceholder';
class MaintainRequest extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel:({ focused, tintColor }) => {
      return (
        <TitleTab 
          title = {I18n.t("request")}
          tintColor = {tintColor}
          focused ={focused}
        />
      )
    },
  });
  componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && error
    if (condition1 || condition2){
      this.handleRefresh();
    }
  }
  handleRefresh = async () => {
    const json = await this.props.fetchAPIMaintainRequest(this.props.lang,  data => {

    },  error => {
      AlertIOS.alert(I18n.t('error'), error.message);
    });
  }

  onReject =  (index , data) => {
     this.props.removeItemMaintain(data.requestId,  data => {

     },  error => {
       AlertIOS.alert("Reject", error.message);
     });
    }

  onAccept= (index , data) => {

    this.props.postItemMaintain(data.requestId,  data => {

    },  error => {
      AlertIOS.alert("Accept", error.message);

    });
   }

  renderRefresh=()=>{
    return (
      <RefreshControl
        refreshing={this.props.fetching}
        onRefresh={this.handleRefresh}
      />
    )
  }
  renderItem = ({ item, index }) => {
    return (
      <ItemMaintain
        data={item}
        index={index}
        lang = {this.props.lang}
        onAccept={this.onAccept}
        onReject={this.onReject}/>
    )
  }
  render() {
    const { data ,isConnectedInternet} = this.props;
    if (!isConnectedInternet && !data){
      return <EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.requestId.toString() }
          refreshControl={this.renderRefresh()}
        />
      </View>
    )
  }
  componentDidMount(){
     this.handleRefresh();
  }
}

const mapStateToProps = state => ({
  data: state.MaintainRequest.data,
  error: state.MaintainRequest.error,
  fetching: state.MaintainRequest.fetching,
  lang:state.Language,
  isConnectedInternet:state.InternetState.isConnectedInternet,
});

export default connect(mapStateToProps, {fetchAPIMaintainRequest,removeItemMaintain,postItemMaintain})(MaintainRequest)
