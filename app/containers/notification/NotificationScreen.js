import React, { Component } from "react";
import { View, Text ,ScrollView, RefreshControl,AlertIOS} from "react-native";
import { connect } from "react-redux";
import styles from "./Styles";
import I18n from "../../localization";
import { Fonts } from "../../themes";
import NotificationFlatlist from './components/NotificationSectionList'


class NotificationScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle:()=>{
       return (
           <Text style = {Fonts.style.headerTitle}>
             {I18n.t("notification")}
           </Text>
       )
     },
  });

  render() {

    return (
        <View style={styles.container}>
          <NotificationFlatlist />
        </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen);
