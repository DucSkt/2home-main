import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles";
import ListRoomFlatList from './components/ListRoomFlatList';
import { withNavigation } from 'react-navigation';

class ListRoomScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
  });

  componentWillMount(){
    const { navigation } = this.props;
    const title = navigation.getParam('title', "");
    this.props.navigation.setParams({title})
  }
  
  render() {
    const { navigation } = this.props;
    const propertyId = navigation.getParam('propertyId', -1);
    return (
      <View style={styles.container}>
        <ListRoomFlatList propertyId ={propertyId}/>
      </View>
    );
  }

}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(ListRoomScreen));
