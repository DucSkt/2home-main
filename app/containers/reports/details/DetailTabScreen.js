import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles";
import ImageSource from "../../../themes/Images";
import ResidenceFlatList from './components/ResidenceFlatList';
import I18n from "../../../localization";

class DetailTabScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: I18n.t('details')
  });

  render() {
    return (
        <View style={styles.container}>
          <ResidenceFlatList />
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
)(DetailTabScreen);
