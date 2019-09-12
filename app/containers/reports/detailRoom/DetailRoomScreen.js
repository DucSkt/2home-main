import React, { Component } from 'react';
import { AlertIOS, View, ActivityIndicator } from 'react-native';
import {SafeAreaView} from 'react-navigation'
import { connect } from 'react-redux';
import SwiperAndInfoUnit from './components/swiperview-infounit/SwiperViewAndInfoUnit';
import InformationRoom from './components/information-room/InformationRoom';
import Styles from './Styles';
import {Colors}from '../../../themes'
import { fetchRoomDetailRequest } from '../../../actions/reports/RoomDetailAction';
import CollapsibleNavbar from './components/CollapsibleNavbar'
import EmptyPlaceholder from '../../empty-placeholder/EmptyPlaceholder';
class DetailRoomScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && error
    if (condition1 || condition2){
      this.handleRefresh();
    }
  }

  renderLoadingView = ()=>{
    return (
      <View style={Styles.loadingContainer} >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  renderContent = ()=>{
    const { data,fetching,isConnectedInternet } = this.props;
    if (!isConnectedInternet && !data){
      return (<EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />);
    }
    return (
      [
          <SwiperAndInfoUnit key={0}/>,
          <InformationRoom key={1}/>
      ]
    )
  }
  render() {

    const { navigation } = this.props;
    const title = navigation.getParam('title', '');
    const {fetching } = this.props;
    return (
      <SafeAreaView style={{flex:1,backgroundColor:Colors.silver}}>
        <CollapsibleNavbar
          loadingElement = {this.renderLoadingView()}
          isLoading = {fetching}
          headerName = {title}>
          {this.renderContent()}
        </CollapsibleNavbar>
      </SafeAreaView>

    );
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh=()=> {
    const { navigation } = this.props;
    const unitId = navigation.getParam('unitId', -1);
    if (unitId==-1) return;
    this.props.fetchRoomDetailRequest(
      unitId,
      this.props.lang,
      data => {
        this.setState({data})
      },
      error => {
        AlertIOS.alert('Error', error.message);
      }
    );
  }
}

const mapStateToProps = state => ({
  isConnectedInternet:state.InternetState.isConnectedInternet,
  error:state.RoomDetailReducer.error,
  data:state.RoomDetailReducer.data,
  fetching: state.RoomDetailReducer.fetching,
  lang:state.Language
});

const mapDispatchToProps = {
  fetchRoomDetailRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailRoomScreen);
