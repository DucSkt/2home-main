import React, { Component } from 'react';
import { View, FlatList, RefreshControl ,AlertIOS,ActivityIndicator ,Text} from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles';
import I18n from '../../../localization'
import ItemMaintain from './components/MaintainItem';
import { fetchAPIMaintainHistory } from '../../../actions/maintain/MaintainHistoryAction';
import EmptyPlaceholder from '../../empty-placeholder/EmptyPlaceholder';
import TitleTab from '../components/TitleTab';

class MaintainHistory extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel:({ focused, tintColor }) => {
      return (
        <TitleTab 
          title = {I18n.t("history")}
          tintColor = {tintColor}
          focused ={focused}
        />
      )
    },
  });
  state = {
    page:0,
    size:10,
    isOutOfData:false,
    isRefreshing:false,
  };
  componentWillReceiveProps(nextProps) {
    const {isConnectedInternet,error,lang} = this.props;
    const condition1 = nextProps.lang !== lang
    const condition2 = nextProps.isConnectedInternet && !isConnectedInternet && error
    if (condition1 || condition2){
      this.handleRefresh();
    }
  }
  handleLoadMore = () => {
    // Out of Notification
    if (this.state.isOutOfData||this.state.isRefreshing||this.props.fetching) return;

    setTimeout(()=>{
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.fetchingDataFromServer();
        }
      );
    },700)

  };

  fetchingDataFromServer = async ()=>{
    const {page,size} = this.state
    const json = await this.props.fetchAPIMaintainHistory(page*size , size, this.props.lang , data => {

    },  error => {
      AlertIOS.alert(I18n.t('error'), error.message);

    }, ()=>{
      this.setState({
        isOutOfData:true
      })
    });
  }

  renderItem = ({ item, index }) => {
    return (
      <ItemMaintain
        data={item}
        index={index}
        lang = {this.props.lang}
      />
    )
  }

  renderRefresh=()=>{
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.handleRefresh}
      />
    )
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 0,
        isOutOfData:false,
        isRefreshing:true
      },
      async () => {
        await this.fetchingDataFromServer();
        await this.setState({isRefreshing:false})
      }
    );
  };

  renderFooter = () => {
    if (this.state.isOutOfData||this.state.isRefreshing||this.props.error||!this.props.fetching) return null;
    return (
      <View
        style={{
          paddingVertical: 8,
        }}
      >
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  render() {
    const { data ,isConnectedInternet,error} = this.props;
    if (!isConnectedInternet && error){
      return <EmptyPlaceholder onPressPlaceholder={this.handleRefresh} />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          style ={{marginTop:8}}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString() }
          refreshControl={this.renderRefresh()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
  componentDidMount(){
    this.handleRefresh();
  }
}

const mapStateToProps = state => ({
  data: state.MaintainHistory.data,
  error: state.MaintainHistory.error,
  fetching: state.MaintainHistory.fetching,
  lang:state.Language,
  isConnectedInternet:state.InternetState.isConnectedInternet,
});

export default MaintainHistory = connect(mapStateToProps,{ fetchAPIMaintainHistory })(MaintainHistory);
